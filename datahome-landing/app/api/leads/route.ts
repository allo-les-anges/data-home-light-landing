export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"

const RESEND_KEY = process.env.RESEND_KEY || process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@data-home.app"
const RECIPIENTS = ["gillian@amaru-homes.com", "gaetan@amaru-homes.com"]

function validateBody(body: unknown): string | null {
  if (!body || typeof body !== "object") return "Body JSON invalide."
  const { name, email } = body as Record<string, unknown>
  if (!name || typeof name !== "string" || name.trim().length < 2)
    return "Le champ 'name' est requis (min 2 caractères)."
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Le champ 'email' doit être une adresse valide."
  return null
}

function buildHtml(data: {
  name: string
  email: string
  phone?: string
  message?: string
  source?: string
  page_url?: string
  timestamp: string
}): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,.10);">
  <tr>
    <td style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:32px 48px;">
      <div style="font-size:22px;font-weight:800;color:#fff;letter-spacing:1px;">DATA-HOME</div>
      <div style="margin-top:6px;color:#cbd5e1;font-size:13px;">Nouveau lead — data-home.app</div>
    </td>
  </tr>
  <tr>
    <td style="padding:36px 48px;">
      <p style="margin:0 0 24px;font-size:16px;font-weight:700;color:#0f172a;">Un nouveau contact vient d'envoyer une demande.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:24px;">
        <tr>
          <td style="padding:14px 20px;font-size:13px;color:#64748b;border-bottom:1px solid #e2e8f0;">Nom</td>
          <td style="padding:14px 20px;text-align:right;font-size:13px;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding:14px 20px;font-size:13px;color:#64748b;border-bottom:1px solid #e2e8f0;">Email</td>
          <td style="padding:14px 20px;text-align:right;font-size:13px;font-weight:700;color:#2563eb;border-bottom:1px solid #e2e8f0;">${data.email}</td>
        </tr>
        ${data.phone ? `<tr>
          <td style="padding:14px 20px;font-size:13px;color:#64748b;border-bottom:1px solid #e2e8f0;">Téléphone</td>
          <td style="padding:14px 20px;text-align:right;font-size:13px;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;">${data.phone}</td>
        </tr>` : ""}
        ${data.message ? `<tr>
          <td style="padding:14px 20px;font-size:13px;color:#64748b;">Message</td>
          <td style="padding:14px 20px;text-align:right;font-size:13px;color:#0f172a;">${data.message}</td>
        </tr>` : ""}
      </table>
      <p style="margin:0;font-size:12px;color:#94a3b8;">
        Reçu le ${new Date(data.timestamp).toLocaleString("fr-FR")}
        ${data.page_url ? ` · <a href="${data.page_url}" style="color:#2563eb;">${data.page_url}</a>` : ""}
      </p>
    </td>
  </tr>
  <tr>
    <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:18px 48px;text-align:center;">
      <p style="margin:0;font-size:11px;color:#94a3b8;">© Data-Home · Ne pas répondre à cet e-mail.</p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: "Body JSON invalide." }, { status: 400 })
  }

  const error = validateBody(body)
  if (error) {
    return NextResponse.json({ success: false, message: error }, { status: 422 })
  }

  if (!RESEND_KEY) {
    console.error("[leads] RESEND_KEY manquant")
    return NextResponse.json({ success: false, message: "Configuration email manquante." }, { status: 500 })
  }

  const { name, email, phone, message, metadata } = body as Record<string, unknown>
  const timestamp = new Date().toISOString()

  const html = buildHtml({
    name: name as string,
    email: email as string,
    phone: phone as string | undefined,
    message: message as string | undefined,
    page_url: (metadata as Record<string, string> | undefined)?.page_url,
    timestamp,
  })

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: RECIPIENTS,
      subject: `Nouveau lead DATA-HOME — ${name}`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error("[leads] Resend error:", err)
    return NextResponse.json({ success: false, message: "Erreur envoi email." }, { status: 502 })
  }

  return NextResponse.json({ success: true, message: "Demande reçue." })
}

export async function GET() {
  return NextResponse.json({ success: false, message: "Method not allowed." }, { status: 405 })
}
