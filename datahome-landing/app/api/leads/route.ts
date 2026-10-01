export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

const MAX_REQUESTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[0-9+().\s-]*$/;
const SOURCE = /^[a-z0-9_-]{1,80}$/i;

type Submission = { name: string; email: string; phone: string; message: string; source: string; locale: string; pageUrl: string; };

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] as string);
}

function stringField(value: unknown, max: number) {
  return typeof value === 'string' && value.length <= max ? value.trim() : null;
}

function validateSubmission(body: unknown): { value: Submission } | { error: string } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'Invalid submission.' };
  const input = body as Record<string, unknown>;
  const name = stringField(input.name, 120);
  const email = stringField(input.email, 254);
  const phone = stringField(input.phone ?? '', 40);
  const message = stringField(input.message ?? '', 5000);
  const source = stringField(input.source, 80);
  const locale = stringField(input.locale ?? '', 12);
  const company = stringField(input.company ?? '', 120);
  const metadata = input.metadata;
  const pageUrl = metadata && typeof metadata === 'object' && !Array.isArray(metadata) ? stringField((metadata as Record<string, unknown>).page_url ?? '', 2048) : null;

  if (company === null || name === null || email === null || phone === null || message === null || source === null || locale === null || pageUrl === null) return { error: 'Invalid submission.' };
  if (company) return { error: 'honeypot' };
  if (name.length < 2 || !EMAIL.test(email) || !PHONE.test(phone) || !SOURCE.test(source)) return { error: 'Invalid submission.' };
  if (locale && !/^[a-z-]{2,12}$/i.test(locale)) return { error: 'Invalid submission.' };
  if (pageUrl) {
    try { const url = new URL(pageUrl); if (url.protocol !== 'http:' && url.protocol !== 'https:') return { error: 'Invalid submission.' }; }
    catch { return { error: 'Invalid submission.' }; }
  }
  return { value: { name, email, phone, message, source, locale, pageUrl } };
}

function getClientKey(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(key: string) {
  const now = Date.now();
  if (rateLimits.size > 1000) for (const [entryKey, entry] of rateLimits) if (entry.resetAt <= now) rateLimits.delete(entryKey);
  const current = rateLimits.get(key);
  if (!current || current.resetAt <= now) { rateLimits.set(key, { count: 1, resetAt: now + WINDOW_MS }); return false; }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

function buildHtml(data: Submission) {
  const row = (label: string, value: string) => value ? `<tr><td style="padding:12px 16px;color:#64748b;border-bottom:1px solid #e2e8f0;">${label}</td><td style="padding:12px 16px;text-align:right;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(value).replace(/\n/g, '<br/>')}</td></tr>` : '';
  return `<!doctype html><html lang="en"><body style="margin:0;padding:32px;background:#f1f5f9;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden"><tr><td style="padding:28px 34px;background:#0d1723;color:#fff"><strong style="font-size:20px">DATAhome</strong><br/><span style="color:#b7c5d2;font-size:13px">New contact request</span></td></tr><tr><td style="padding:28px 34px"><table width="100%" cellpadding="0" cellspacing="0">${row('Name', data.name)}${row('Email', data.email)}${row('Phone', data.phone)}${row('Message', data.message)}</table><p style="margin:22px 0 0;color:#64748b;font-size:12px">Source: ${escapeHtml(data.source)}${data.locale ? ` · Locale: ${escapeHtml(data.locale)}` : ''}${data.pageUrl ? `<br/>Page: ${escapeHtml(data.pageUrl)}` : ''}</p></td></tr></table></td></tr></table></body></html>`;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ success: false, error: 'Invalid submission.' }, { status: 400 }); }
  const validation = validateSubmission(body);
  if ('error' in validation) {
    if (validation.error === 'honeypot') return NextResponse.json({ success: true });
    return NextResponse.json({ success: false, error: validation.error }, { status: 422 });
  }
  if (isRateLimited(getClientKey(request))) return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 });

  const resendKey = process.env.RESEND_KEY || process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const recipients = process.env.CONTACT_EMAIL?.split(',').map(value => value.trim()).filter(Boolean) ?? [];
  if (!resendKey || !fromEmail || !recipients.length) {
    console.error('[leads] Missing Resend, sender, or recipient configuration.');
    return NextResponse.json({ success: false, error: 'The contact service is currently unavailable.' }, { status: 503 });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: fromEmail, to: recipients, reply_to: validation.value.email, subject: `DATAhome contact — ${validation.value.name}`, html: buildHtml(validation.value) }),
    });
    if (!response.ok) { console.error('[leads] Resend request failed:', response.status); return NextResponse.json({ success: false, error: 'The contact service is currently unavailable.' }, { status: 502 }); }
  } catch (error) {
    console.error('[leads] Resend request failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ success: false, error: 'The contact service is currently unavailable.' }, { status: 502 });
  }
  return NextResponse.json({ success: true });
}

export async function GET() { return NextResponse.json({ success: false, error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } }); }
