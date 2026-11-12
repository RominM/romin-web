import { Resend } from 'resend'

const MIN_FILL_TIME_MS = 3000 // un humain met plus de 3 s à remplir le formulaire
const MAX_LENGTHS = { name: 100, email: 200, phone: 30, business: 150, message: 5000 }
const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/

// Redirection utilisée aussi pour les envois rejetés : un bot ne doit pas savoir qu'il a été filtré.
const thanks = () => ({ statusCode: 302, headers: { Location: '/merci' }, body: '' })

// Neutralise le HTML saisi par le visiteur avant de l'insérer dans un mail
const escapeHtml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// Pas de retours à la ligne dans les objets de mail
const oneLine = (str) => str.replace(/[\r\n]+/g, ' ').trim()

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // Turnstile pas encore configuré : on ne bloque pas
  if (!token) return false

  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip) body.append('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body
    })
    const data = await res.json()
    return data.success === true
  } catch (err) {
    console.error('Turnstile error:', err)
    return false
  }
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const params = new URLSearchParams(event.body)
  const get = (key) => (params.get(key) || '').trim()

  // 1. Champ piège : rempli = bot
  if (get('website')) {
    console.log('Spam bloqué : honeypot')
    return thanks()
  }

  // 2. Formulaire envoyé trop vite (ou sans passer par la page) = bot
  const ts = Number(get('ts'))
  if (!ts || Date.now() - ts < MIN_FILL_TIME_MS) {
    console.log('Spam bloqué : envoi trop rapide')
    return thanks()
  }

  // 3. Vérification Cloudflare Turnstile
  const ip = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip']
  if (!(await verifyTurnstile(get('cf-turnstile-response'), ip))) {
    console.log('Spam bloqué : Turnstile')
    return thanks()
  }

  const name = get('name')
  const email = get('email')
  const business = get('business')
  const message = get('message')
  const phone = get('phone') // facultatif

  // 4. Champs obligatoires, longueurs et format d'email
  const tooLong = Object.entries(MAX_LENGTHS).some(([k, max]) => get(k).length > max)
  if (!name || !email || !business || !message || tooLong || !EMAIL_RE.test(email)) {
    console.log('Envoi rejeté : champs invalides')
    return thanks()
  }

  const apiKey = process.env.RESEND_API_KEY
  const notifEmail = process.env.NOTIFICATION_EMAIL

  if (!apiKey) {
    console.error('RESEND_API_KEY manquante')
    return thanks()
  }

  const resend = new Resend(apiKey) // instancié ici, après injection des env vars

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    business: escapeHtml(business),
    message: escapeHtml(message).replace(/\r?\n/g, '<br/>'),
    phone: escapeHtml(phone),
    phoneHref: phone.replace(/[^0-9+]/g, '') // pour le lien « tel: » cliquable
  }

  const phoneRow = phone
    ? `<tr><td style="padding:0.5rem 0;color:#6b5f7a;">Téléphone</td><td><a href="tel:${safe.phoneHref}"><strong>${safe.phone}</strong></a></td></tr>`
    : `<tr><td style="padding:0.5rem 0;color:#6b5f7a;">Téléphone</td><td style="color:#a89ab8;">Non renseigné</td></tr>`

  try {
    // Réponse automatique au client (seulement si tous les contrôles sont passés)
    await resend.emails.send({
      from: 'Romin <hello@mgl-studio.fr>',
      to: email,
      subject: 'Votre demande a bien été reçue ✓',
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#1c1729;">
          <p style="font-size:1.1rem;">Bonjour ${safe.name},</p>
          <p style="color:#6b5f7a;line-height:1.7;">
            Merci pour votre message ! J'ai bien reçu votre demande concernant
            <strong style="color:#1c1729;">${safe.business}</strong> et je reviens vers vous
            <strong style="color:#7b69f8;">sous 24h</strong> avec un premier retour.
          </p>
          <p style="color:#6b5f7a;line-height:1.7;">
            En attendant, si vous avez des questions urgentes, vous pouvez
            répondre directement à cet email.
          </p>
          <p style="color:#6b5f7a;margin-top:2rem;">
            À très vite,<br/>
            <strong style="color:#1c1729;">Romin</strong><br/>
            <span style="color:#a89ab8;font-size:0.9rem;">Développeur web freelance</span>
          </p>
        </div>
      `
    })

    // Notification à Romin
    await resend.emails.send({
      from: 'Formulaire contact <hello@mgl-studio.fr>',
      to: notifEmail,
      replyTo: email, // ← répondre directement au client (Gmail auto-reply inclus)
      subject: oneLine(`📩 Nouvelle demande — ${name} (${business})`),
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#1c1729;">
          <h2 style="color:#7b69f8;">Nouvelle demande de contact</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:1rem;">
            <tr><td style="padding:0.5rem 0;color:#6b5f7a;width:120px;">Nom</td><td><strong>${safe.name}</strong></td></tr>
            <tr><td style="padding:0.5rem 0;color:#6b5f7a;">Email</td><td><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
            ${phoneRow}
            <tr><td style="padding:0.5rem 0;color:#6b5f7a;">Activité</td><td><strong>${safe.business}</strong></td></tr>
          </table>
          <div style="margin-top:1.5rem;padding:1rem;background:#f7f4ff;border-radius:8px;line-height:1.7;">
            ${safe.message}
          </div>
          <p style="margin-top:1.5rem;">
            <a href="mailto:${safe.email}"
               style="background:#7b69f8;color:#fff;padding:0.6rem 1.4rem;border-radius:100px;text-decoration:none;font-weight:600;">
              Répondre à ${safe.name}
            </a>
          </p>
        </div>
      `
    })
  } catch (err) {
    console.error('Resend error:', err)
  }

  return thanks()
}
