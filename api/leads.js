const RESEND_KEY = process.env.RESEND_KEY || process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@data-home.app"
const RECIPIENTS = (process.env.CONTACT_EMAIL || "gillian@amaru-homes.com,gaetan@amaru-homes.com")
  .split(",").map((e) => e.trim()).filter(Boolean)

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

function setCors(res) {
  for (const [k, v] of Object.entries(CORS_HEADERS)) res.setHeader(k, v)
}

function buildHtml(data) {
  const planRow = data.plan ? `<tr>
    <td style="padding:14px 20px;font-size:13px;color:#64748b;border-bottom:1px solid #e2e8f0;">Plan</td>
    <td style="padding:14px 20px;text-align:right;font-size:13px;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;">${data.plan}</td>
  </tr>` : ""
  const phoneRow = data.phone ? `<tr>
    <td style="padding:14px 20px;font-size:13px;color:#64748b;border-bottom:1px solid #e2e8f0;">Téléphone</td>
    <td style="padding:14px 20px;text-align:right;font-size:13px;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;">${data.phone}</td>
  </tr>` : ""
  const messageRow = data.message ? `<tr>
    <td style="padding:14px 20px;font-size:13px;color:#64748b;vertical-align:top;">Message</td>
    <td style="padding:14px 20px;text-align:right;font-size:13px;color:#0f172a;">${String(data.message).replace(/\n/g, "<br/>")}</td>
  </tr>` : ""

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
        ${phoneRow}
        ${planRow}
        ${messageRow}
      </table>
      <p style="margin:0;font-size:12px;color:#94a3b8;">
        Reçu le ${new Date(data.timestamp).toLocaleString("fr-FR")}
        ${data.locale ? ` · Langue : ${data.locale}` : ""}
        ${data.source ? ` · Source : ${data.source}` : ""}
        ${data.page_url ? `<br/><a href="${data.page_url}" style="color:#2563eb;">${data.page_url}</a>` : ""}
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

module.exports = async (req, res) => {
  setCors(res)

  if (req.method === "OPTIONS") {
    return res.status(204).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed." })
  }

  const { name, email, phone, message, plan, source, locale, metadata } = req.body || {}

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(422).json({ success: false, error: "Le champ 'name' est requis (min 2 caractères)." })
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(422).json({ success: false, error: "Le champ 'email' doit être une adresse valide." })
  }

  if (!RESEND_KEY) {
    console.error("[leads] RESEND_KEY manquant")
    return res.status(500).json({ success: false, error: "Configuration email manquante." })
  }

  const timestamp = new Date().toISOString()
  const html = buildHtml({
    name: String(name),
    email: String(email),
    phone: phone ? String(phone) : undefined,
    message: message ? String(message) : undefined,
    plan: plan ? String(plan) : undefined,
    source: source ? String(source) : undefined,
    locale: locale ? String(locale) : undefined,
    page_url: metadata && typeof metadata === "object" ? metadata.page_url : undefined,
    timestamp,
  })

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: RECIPIENTS,
      subject: `Nouveau lead DATA-HOME — ${name}${plan ? ` (${plan})` : ""}`,
      html,
    }),
  })

  if (!resendRes.ok) {
    const err = await resendRes.text()
    console.error("[leads] Resend error:", err)
    return res.status(502).json({ success: false, error: "Erreur envoi email." })
  }

  return res.status(200).json({ success: true })
}
