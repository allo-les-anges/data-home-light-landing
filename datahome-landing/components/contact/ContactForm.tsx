'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import s from './ContactForm.module.css';

export type ContactFormCopy = {
  fields: { name: string; email: string; phone: string; message: string; namePlaceholder: string; emailPlaceholder: string; phonePlaceholder: string; messagePlaceholder: string; };
  submit: string; sending: string; success: string; genericError: string;
  errors: { name: string; email: string; };
};

type FieldErrors = Partial<Record<'name' | 'email', string>>;

export function ContactForm({ locale, copy, source = 'contact_page' }: { locale: string; copy: ContactFormCopy; source?: string }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const nextErrors: FieldErrors = {};
    if (name.length < 2) nextErrors.name = copy.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = copy.errors.email;
    setErrors(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          locale,
          name,
          email,
          phone: String(data.get('phone') || '').trim(),
          message: String(data.get('message') || '').trim(),
          company: String(data.get('company') || ''),
          metadata: { page_url: window.location.href },
        }),
      });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok || !payload || typeof payload !== 'object' || !('success' in payload) || payload.success !== true) throw new Error(copy.genericError);
      form.reset();
      setErrors({});
      setStatus({ type: 'success', message: copy.success });
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error && error.message ? error.message : copy.genericError });
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldError = (name: keyof FieldErrors) => errors[name];
  return <form className={s.form} noValidate onSubmit={submitLead} aria-busy={isSubmitting}>
    <div className={s.honeypot} aria-hidden="true"><label htmlFor="contact-company">Company</label><input id="contact-company" name="company" tabIndex={-1} autoComplete="off" /></div>
    <div className={s.fields}>
      <div className={s.field}><label htmlFor="contact-name">{copy.fields.name}</label><input id="contact-name" name="name" autoComplete="name" placeholder={copy.fields.namePlaceholder} aria-invalid={Boolean(fieldError('name'))} aria-describedby={fieldError('name') ? 'contact-name-error' : undefined} />{fieldError('name') && <p className={s.error} id="contact-name-error">{fieldError('name')}</p>}</div>
      <div className={s.field}><label htmlFor="contact-email">{copy.fields.email}</label><input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder={copy.fields.emailPlaceholder} aria-invalid={Boolean(fieldError('email'))} aria-describedby={fieldError('email') ? 'contact-email-error' : undefined} />{fieldError('email') && <p className={s.error} id="contact-email-error">{fieldError('email')}</p>}</div>
      <div className={s.field}><label htmlFor="contact-phone">{copy.fields.phone}</label><input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={copy.fields.phonePlaceholder} /></div>
      <div className={s.field}><label htmlFor="contact-message">{copy.fields.message}</label><textarea id="contact-message" name="message" autoComplete="off" placeholder={copy.fields.messagePlaceholder} /></div>
      <button className={s.submit} type="submit" disabled={isSubmitting}>{isSubmitting ? copy.sending : copy.submit}<ArrowRight size={16} aria-hidden="true" /></button>
      <div aria-live="polite" aria-atomic="true">{status && <p className={`${s.status} ${status.type === 'success' ? s.statusSuccess : s.statusError}`}>{status.message}</p>}</div>
    </div>
  </form>;
}
