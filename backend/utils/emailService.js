/**
 * EMAIL SERVICE
 * Uses Resend (https://resend.com) — free 100 emails/day, no Gmail setup.
 *
 * SETUP (one-time on Render backend env vars):
 *   RESEND_API_KEY = re_xxxxxxxxxxxx   ← from resend.com/api-keys
 *   EMAIL_FROM     = onboarding@resend.dev  (free tier) OR your verified domain
 *   ADMIN_EMAIL    = sisay3575@gmail.com    (where traveler replies go)
 *
 * Fallback: if RESEND_API_KEY not set, uses nodemailer with Gmail App Password:
 *   EMAIL_USER = sisay3575@gmail.com
 *   EMAIL_PASS = (16-char Gmail App Password)
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sisay3575@gmail.com';
const FROM_EMAIL  = process.env.EMAIL_FROM  || 'EthioTour <onboarding@resend.dev>';

// ── HTML templates ────────────────────────────────────────────
const wrap = (body) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ede8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr><td style="background:#2d3e23;padding:24px 32px;text-align:center;">
          <h1 style="color:#d4af37;margin:0;font-size:24px;letter-spacing:1px;">EthioTour</h1>
          <p style="color:rgba(255,255,255,0.5);margin:4px 0 0;font-size:12px;">Horn of Africa Travel Experts</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px;">${body}</td></tr>
        <!-- Footer -->
        <tr><td style="background:#f8f7f4;padding:20px 32px;text-align:center;color:#aaa;font-size:11px;line-height:1.8;">
          EthioTour &nbsp;·&nbsp; Addis Ababa, Ethiopia<br>
          📞 +251 935 756 054 &nbsp;·&nbsp; ✉️ ${ADMIN_EMAIL}<br>
          <em style="color:#bbb;">To reply, simply reply to this email — it goes directly to our team.</em>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const bookingHtml = ({ name, destination, ref, isConfirmed, adminNote, rejectionReason }) => wrap(`
  <h2 style="color:#2d3e23;margin-top:0;">${isConfirmed ? '✅ Your Booking is Confirmed!' : '❌ Booking Not Confirmed'}</h2>
  <p style="color:#555;">Dear <strong>${name}</strong>,</p>
  <p style="color:#555;">
    ${isConfirmed
      ? `Your booking for <strong>${destination}</strong> has been <strong style="color:#2e7d32;">confirmed</strong> by our team. We look forward to welcoming you!`
      : `Unfortunately, your booking for <strong>${destination}</strong> could not be confirmed at this time.`
    }
  </p>
  ${adminNote ? `
    <div style="background:#e3f2fd;border-left:4px solid #1976d2;padding:12px 16px;border-radius:6px;margin:16px 0;">
      <strong style="color:#1565c0;">Message from EthioTour:</strong><br>
      <span style="color:#333;">${adminNote}</span>
    </div>` : ''}
  ${rejectionReason ? `
    <div style="background:#ffebee;border-left:4px solid #f44336;padding:12px 16px;border-radius:6px;margin:16px 0;">
      <strong style="color:#c62828;">Reason:</strong><br>
      <span style="color:#333;">${rejectionReason}</span>
    </div>` : ''}
  <div style="background:#f8f7f4;border-radius:8px;padding:16px;margin:20px 0;">
    <p style="margin:0;color:#777;font-size:13px;"><strong>Booking Reference:</strong>
      <span style="font-family:monospace;font-size:15px;color:#2d3e23;font-weight:bold;"> ${ref}</span>
    </p>
    <p style="margin:6px 0 0;color:#777;font-size:13px;"><strong>Destination:</strong> ${destination}</p>
    <p style="margin:6px 0 0;color:#777;font-size:13px;"><strong>Status:</strong>
      <span style="color:${isConfirmed ? '#2e7d32' : '#c62828'};font-weight:bold;">
        ${isConfirmed ? 'CONFIRMED ✓' : 'NOT CONFIRMED ✗'}
      </span>
    </p>
  </div>
  <p style="color:#555;">
    ${isConfirmed
      ? 'Our team will contact you to finalize your travel arrangements. If you have any questions, simply reply to this email.'
      : 'If you have questions or would like to re-submit your payment, simply reply to this email and our team will assist you.'
    }
  </p>`);

const replyHtml = ({ name, originalMessage, adminReply }) => wrap(`
  <h2 style="color:#2d3e23;margin-top:0;">💬 Reply to Your Message</h2>
  <p style="color:#555;">Dear <strong>${name}</strong>,</p>
  <p style="color:#555;">Our team has responded to your inquiry:</p>
  <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin:16px 0;">
    <p style="margin:0 0 6px;color:#999;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Your Message</p>
    <p style="margin:0;color:#666;font-style:italic;">"${originalMessage}"</p>
  </div>
  <div style="background:#e8f5e9;border-left:4px solid #4caf50;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;">
    <p style="margin:0 0 6px;color:#2e7d32;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">EthioTour Response</p>
    <p style="margin:0;color:#333;">${adminReply}</p>
  </div>
  <p style="color:#555;">If you have further questions, simply <strong>reply to this email</strong> — it goes directly to our team.</p>`);

// ── Send via Resend ───────────────────────────────────────────
const sendViaResend = async ({ to, subject, html, replyTo }) => {
  const { Resend } = require('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from:     FROM_EMAIL,
    to:       [to],
    replyTo:  replyTo || ADMIN_EMAIL,
    subject,
    html,
  });
  if (error) throw new Error(error.message);
};

// ── Send via nodemailer (Gmail fallback) ──────────────────────
const sendViaGmail = async ({ to, subject, html, replyTo }) => {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  await transporter.sendMail({
    from:    `"EthioTour" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: replyTo || ADMIN_EMAIL,
    subject,
    html,
  });
};

// ── Main send function ────────────────────────────────────────
const sendEmail = async (opts) => {
  try {
    if (process.env.RESEND_API_KEY) {
      await sendViaResend(opts);
      console.log(`✅ Email sent via Resend → ${opts.to}`);
    } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendViaGmail(opts);
      console.log(`✅ Email sent via Gmail → ${opts.to}`);
    } else {
      console.warn(`⚠️  No email credentials set. Email NOT sent to ${opts.to}`);
      console.warn('   Set RESEND_API_KEY on Render to enable emails.');
    }
  } catch (err) {
    console.error(`❌ Email failed → ${opts.to}:`, err.message);
  }
};

// ── Public API ────────────────────────────────────────────────
exports.sendBookingConfirmation = async ({ to, name, destination, ref, status, adminNote, rejectionReason }) => {
  const isConfirmed = status === 'confirmed';
  await sendEmail({
    to,
    replyTo: ADMIN_EMAIL,
    subject: isConfirmed
      ? `✅ Booking Confirmed — ${destination} [Ref: ${ref}]`
      : `❌ Booking Not Confirmed — ${destination} [Ref: ${ref}]`,
    html: bookingHtml({ name, destination, ref, isConfirmed, adminNote, rejectionReason }),
  });
};

exports.sendMessageReply = async ({ to, name, subject, originalMessage, adminReply }) => {
  await sendEmail({
    to,
    replyTo: ADMIN_EMAIL,
    subject: `Re: ${subject} — EthioTour`,
    html: replyHtml({ name, originalMessage, adminReply }),
  });
};
