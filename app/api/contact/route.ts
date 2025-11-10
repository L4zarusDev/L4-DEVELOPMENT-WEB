import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Opcional helpdesk: GitHub Issues
async function createGithubIssue(title: string, body: string) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "owner/repo"
  if (!token || !repo) return;

  await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
    body: JSON.stringify({ title, body, labels: ['contact'] }),
  }).catch(() => {});
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'emilianorm2025@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'form@onboarding@resend.dev';

function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]!));
}

async function verifyTurnstile(token: string, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // si no hay clave, no bloquear en dev
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
      // @ts-ignore
      next: { revalidate: 0 },
    });
    const data = await res.json();
    return !!data.success;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, budget, services, message, cfToken } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || null;
    const ok = await verifyTurnstile(cfToken || '', ip);
    if (!ok) {
      return NextResponse.json({ error: 'Captcha inválido' }, { status: 400 });
    }

    // Link con prefill a Cal.com (para Discovery)
    const params = new URLSearchParams({
      name,
      email,
      notes: `Servicios: ${(services || []).join(', ')}\nPresupuesto: ${budget || 'N/D'}`,
    });
    const calLink = `https://cal.com/l4zarusdev${params.toString()}`;

    const html = `
      <h2>Nuevo contacto desde l4zarus.dev</h2>
      <p><b>Nombre:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Presupuesto:</b> ${escapeHtml(budget || 'N/D')}</p>
      <p><b>Servicios:</b> ${(services || []).map(escapeHtml).join(', ') || 'N/D'}</p>
      <p><b>Mensaje:</b></p>
      <pre style="white-space:pre-wrap;font-family:Inter,system-ui,sans-serif;">${escapeHtml(message)}</pre>
      <p><b>Agendar:</b> <a href="${calLink}">${calLink}</a></p>
    `;

    // Email a ti + autorespuesta al cliente
    if (resend) {
      await Promise.allSettled([
        // Para ti
        resend.emails.send({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          subject: `Contacto — ${name}`,
          html,
          replyTo: email,
        }),
        // Autorespuesta
        resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: 'Recibimos tu mensaje — L4 DEVELOPMENT',
          html: `
            <p>Hola ${escapeHtml(name)},</p>
            <p>¡Gracias por escribir! Revisaré tu mensaje y te responderé en breve.</p>
            <p>Si prefieres, puedes <a href="${calLink}">agendar una llamada</a> directamente.</p>
            <p>— L4 DEVELOPMENT</p>
          `,
        }),
      ]);
    }

    // Ticket Helpdesk (GitHub Issue)
    await createGithubIssue(
      `Contacto: ${name} <${email}>`,
      `**Servicios**: ${(services || []).join(', ') || 'N/D'}\n**Presupuesto**: ${budget || 'N/D'}\n\n**Mensaje**:\n${message}\n\n**Agendar**: ${calLink}`,
    );

    return NextResponse.json({ ok: true, calLink });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
