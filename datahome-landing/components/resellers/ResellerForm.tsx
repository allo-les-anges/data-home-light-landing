'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import s from './ResellerForm.module.css';

export type ResellerFormCopy = {
  eyebrow: string;
  title: string;
  body: string;
  fields: {
    fullName: string; company: string; email: string; phone: string; country: string; activity: string;
    hasNetwork: string; hasNetworkYes: string; hasNetworkNo: string; interest: string;
    fullNamePlaceholder: string; companyPlaceholder: string; emailPlaceholder: string; phonePlaceholder: string;
    countryPlaceholder: string; activityPlaceholder: string; interestPlaceholder: string;
  };
  submit: string; sending: string; success: string; genericError: string;
  errors: { fullName: string; company: string; email: string; country: string; activity: string; interest: string };
  privacy: string;
};

type FieldName = 'fullName' | 'company' | 'email' | 'country' | 'activity' | 'interest';
type FieldErrors = Partial<Record<FieldName, string>>;

// Reuses the existing /api/leads infrastructure (same validation, rate
// limiting, honeypot and Resend email delivery as the Contact form) rather
// than a parallel endpoint. /api/leads only recognizes name/email/phone/
// message/source/locale — so every reseller-specific field is folded into a
// single, clearly labelled `message` body instead of being dropped. The
// `source: 'reseller_application'` value (distinct from the Contact page's
// 'contact_page') is what lets these submissions be told apart downstream.
const SOURCE = 'reseller_application';

export function ResellerForm({ locale, copy, formId }: { locale: string; copy: ResellerFormCopy; formId?: string }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return; // anti double-submit, belt-and-braces alongside the disabled button
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get('fullName') || '').trim();
    const company = String(data.get('company') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const country = String(data.get('country') || '').trim();
    const activity = String(data.get('activity') || '').trim();
    const hasNetwork = String(data.get('hasNetwork') || '');
    const interest = String(data.get('interest') || '').trim();

    const nextErrors: FieldErrors = {};
    if (fullName.length < 2) nextErrors.fullName = copy.errors.fullName;
    if (company.length < 1) nextErrors.company = copy.errors.company;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = copy.errors.email;
    if (country.length < 1) nextErrors.country = copy.errors.country;
    if (activity.length < 1) nextErrors.activity = copy.errors.activity;
    if (interest.length < 5) nextErrors.interest = copy.errors.interest;
    setErrors(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length) return;

    const message = [
      `${copy.fields.company}: ${company}`,
      `${copy.fields.country}: ${country}`,
      `${copy.fields.activity}: ${activity}`,
      `${copy.fields.hasNetwork} ${hasNetwork === 'yes' ? copy.fields.hasNetworkYes : copy.fields.hasNetworkNo}`,
      '',
      interest,
    ].join('\n');

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: SOURCE,
          locale,
          name: fullName,
          email,
          phone,
          message,
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

  const fieldError = (name: FieldName) => errors[name];
  return (
    <div className={s.card} id={formId}>
      <p className={s.eyebrow}>{copy.eyebrow}</p>
      <h2>{copy.title}</h2>
      <p className={s.intro}>{copy.body}</p>
      <form className={s.form} noValidate onSubmit={submitApplication} aria-busy={isSubmitting}>
        {/* Honeypot: must stay empty. /api/leads treats a non-empty "company"
            key as spam, so the real company name is deliberately sent via a
            different field (folded into `message` above), never this one. */}
        <div className={s.honeypot} aria-hidden="true">
          <label htmlFor="reseller-hp-company">Company</label>
          <input id="reseller-hp-company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className={s.fields}>
          <div className={s.field}>
            <label htmlFor="reseller-fullName">{copy.fields.fullName} *</label>
            <input id="reseller-fullName" name="fullName" autoComplete="name" placeholder={copy.fields.fullNamePlaceholder} aria-invalid={Boolean(fieldError('fullName'))} aria-describedby={fieldError('fullName') ? 'reseller-fullName-error' : undefined} />
            {fieldError('fullName') && <p className={s.error} id="reseller-fullName-error">{fieldError('fullName')}</p>}
          </div>

          <div className={s.field}>
            <label htmlFor="reseller-companyName">{copy.fields.company} *</label>
            <input id="reseller-companyName" name="companyName" autoComplete="organization" placeholder={copy.fields.companyPlaceholder} aria-invalid={Boolean(fieldError('company'))} aria-describedby={fieldError('company') ? 'reseller-companyName-error' : undefined} />
            {fieldError('company') && <p className={s.error} id="reseller-companyName-error">{fieldError('company')}</p>}
          </div>

          <div className={s.row}>
            <div className={s.field}>
              <label htmlFor="reseller-email">{copy.fields.email} *</label>
              <input id="reseller-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder={copy.fields.emailPlaceholder} aria-invalid={Boolean(fieldError('email'))} aria-describedby={fieldError('email') ? 'reseller-email-error' : undefined} />
              {fieldError('email') && <p className={s.error} id="reseller-email-error">{fieldError('email')}</p>}
            </div>
            <div className={s.field}>
              <label htmlFor="reseller-phone">{copy.fields.phone}</label>
              <input id="reseller-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={copy.fields.phonePlaceholder} />
            </div>
          </div>

          <div className={s.field}>
            <label htmlFor="reseller-country">{copy.fields.country} *</label>
            <input id="reseller-country" name="country" autoComplete="country-name" placeholder={copy.fields.countryPlaceholder} aria-invalid={Boolean(fieldError('country'))} aria-describedby={fieldError('country') ? 'reseller-country-error' : undefined} />
            {fieldError('country') && <p className={s.error} id="reseller-country-error">{fieldError('country')}</p>}
          </div>

          <div className={s.field}>
            <label htmlFor="reseller-activity">{copy.fields.activity} *</label>
            <input id="reseller-activity" name="activity" placeholder={copy.fields.activityPlaceholder} aria-invalid={Boolean(fieldError('activity'))} aria-describedby={fieldError('activity') ? 'reseller-activity-error' : undefined} />
            {fieldError('activity') && <p className={s.error} id="reseller-activity-error">{fieldError('activity')}</p>}
          </div>

          <fieldset className={s.radioGroup}>
            <legend>{copy.fields.hasNetwork}</legend>
            <label className={s.radio}><input type="radio" name="hasNetwork" value="yes" defaultChecked /> {copy.fields.hasNetworkYes}</label>
            <label className={s.radio}><input type="radio" name="hasNetwork" value="no" /> {copy.fields.hasNetworkNo}</label>
          </fieldset>

          <div className={s.field}>
            <label htmlFor="reseller-interest">{copy.fields.interest} *</label>
            <textarea id="reseller-interest" name="interest" placeholder={copy.fields.interestPlaceholder} aria-invalid={Boolean(fieldError('interest'))} aria-describedby={fieldError('interest') ? 'reseller-interest-error' : undefined} />
            {fieldError('interest') && <p className={s.error} id="reseller-interest-error">{fieldError('interest')}</p>}
          </div>

          <button className={s.submit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? copy.sending : copy.submit}<ArrowRight size={16} aria-hidden="true" />
          </button>
          <div aria-live="polite" aria-atomic="true">
            {status && <p className={`${s.status} ${status.type === 'success' ? s.statusSuccess : s.statusError}`}>{status.message}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}
