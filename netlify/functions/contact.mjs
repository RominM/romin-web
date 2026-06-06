import { Resend } from 'resend'

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const apiKey    = process.env.RESEND_API_KEY
  const notifEmail = process.env.NOTIFICATION_EMAIL

  if (!apiKey) {
    console.error('RESEND_API_KEY manquante')
    return { statusCode: 302, headers: { Location: '/merci' }, body: '' }
  }

  const resend = new Resend(apiKey) // instancié ici, après injection des env vars

  const params   = new URLSearchParams(event.body)
  const name     = params.get('name')     || ''
  const email    = params.get('email')    || ''
  const business = params.get('business') || ''
  const message  = params.get('message')  || ''

  try {
    // 1. Réponse automatique au client
    await resend.emails.send({
      from: 'Romin <onboarding@resend.dev>',
      to: email,
      subject: 'Votre demande a bien été reçue ✓',
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#1c1729;">
          <p style="font-size:1.1rem;">Bonjour ${name},</p>
          <p style="color:#6b5f7a;line-height:1.7;">
            Merci pour votre message ! J'ai bien reçu votre demande concernant
            <strong style="color:#1c1729;">${business}</strong> et je reviens vers vous
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
      `,
    })

    // 2. Notification à Romin
    await resend.emails.send({
      from: 'Formulaire contact <onboarding@resend.dev>',
      to: notifEmail,
      replyTo: email, // ← répondre directement au client (Gmail auto-reply inclus)
      subject: `📩 Nouvelle demande — ${name} (${business})`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#1c1729;">
          <h2 style="color:#7b69f8;">Nouvelle demande de contact</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:1rem;">
            <tr><td style="padding:0.5rem 0;color:#6b5f7a;width:120px;">Nom</td><td><strong>${name}</strong></td></tr>
            <tr><td style="padding:0.5rem 0;color:#6b5f7a;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:0.5rem 0;color:#6b5f7a;">Activité</td><td><strong>${business}</strong></td></tr>
          </table>
          <div style="margin-top:1.5rem;padding:1rem;background:#f7f4ff;border-radius:8px;line-height:1.7;">
            ${message}
          </div>
          <p style="margin-top:1.5rem;">
            <a href="mailto:${email}"
               style="background:#7b69f8;color:#fff;padding:0.6rem 1.4rem;border-radius:100px;text-decoration:none;font-weight:600;">
              Répondre à ${name}
            </a>
          </p>
        </div>
      `,
    })
  } catch (err) {
    console.error('Resend error:', err)
  }

  return {
    statusCode: 302,
    headers: { Location: '/merci' },
    body: '',
  }
}
