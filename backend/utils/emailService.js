const nodemailer = require('nodemailer');

/**
 * EMAIL SETUP (one-time on Render):
 * 1. Google Account → Security → 2-Step Verification → App Passwords → create one
 * 2. Set in Render backend env vars:
 *    EMAIL_USER = sisay3575@gmail.com
 *    EMAIL_PASS = (16-char app password)
 */

const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    console.warn('⚠️  EMAIL_USER or EMAIL_PASS not set — emails skipped.');
    return null;
  }
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
};

const ADMIN_EMAIL = process.env.EMAIL_USER || 'sisay3575@gmail.com';

const HEADER = `
  <div style="background:#2d3e23;padding:20px 32px;text-align:center;">
    <h1 style="color:#d4af37;margin:0;font-size:22px;letter-spacing:1px;">EthioTour</h1>
    <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:12px;">Horn of Africa Travel Experts</p>
  </div>`;

const FOOTER = (showReply) => `
  <div style="padding:20px 32px;background:#f0ede8;text-align:center;color:#999;font-size:11px;line-height:1.8;">
    EthioTour · Addis Ababa, Ethiopia<br>
    📞 +251 935 756 054 &nbsp;·&nbsp; ✉️ ${ADMIN_EMAIL}
    ${showReply ? `<br><br><em>To reply, simply reply to this email — it goes directly to our team.</em>` : ''}
  </div>`;

// ── Booking status email → traveler ──────────────────────────
exports.sendBookingConfirmation = async ({
  to, name, destination, ref, status, adminNote, rejectionReason,
}) => {
  const transporter = getTransporter();
  if (!transporter) return;

  const isConfirmed = status === 'confirmed';

  const noteBlock = adminNote
    ? `<div style="background:#e3f2fd;border-left:4px solid #1976d2;padding:12px 16px;border-radius:6px;margin:16px 0;">
        <strong style="color:#1565c0;">Message from EthioTour:</strong><br>
        <span style="color:#333;">${adminNote}</span>
       </div>`
    : '';

  const reasonBlock = rejectionReason
    ? `<div style="background:#ffebee;border-left:4px solid #f44336;padding:12px 16px;border-radius:6px;margin:16px 0;">
        <strong style="color:#c62828;">Reason:</strong><br>
        <span style="color:#333;">${rejectionReason}</span>
       </div>`
    : '';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
      ${HEADER}
      <div style="background:#fff;padding:32px;">
        <h2 style="color:#2d3e23;margin-top:0;">
          ${isConfirmed ? '✅ Your Booking is Confirmed!' : '❌ Booking Not Confirmed'}
        </h2>
        <p style="color:#555;">Dear <strong>${name}</strong>,</p>
        <p style="color:#555;">
          ${isConfirmed
            ? `Your booking for <strong>${destination}</strong> has been <strong style="color:#2e7d32;">confirmed</strong> by our team. We look forward to welcoming you!`
            : `Unfortunately, your booking for <strong>${destination}</strong> could not be confirmed at this time.`
          }
        </p>
        ${noteBlock}
        ${reasonBlock}
        <div style="background:#f8f7f4;border-radius:8px;padding:16px;margin:20px 0;">
          <p style="margin:0;color:#777;font-size:13px;"><strong>Booking Reference:</strong>
            <span style="font-family:monospace;font-size:15px;color:#2d3e23;font-weight:bold;"> ${ref}</span>
          </p>
          <p style="margin:6px 0 0;color:#777;font-size:13px;"><strong>Destination:</strong> ${destination}</p>
          <p style="margin:6px 0 0;color:#777;font-size:13px;"><strong>Status:</strong>
            <span style="color:${isConfirmed ? '#2e7d32' : '#c62828'};font-weight:bold;">
              ${isConfirmed ? 'CONFIRMED' : 'NOT CONFIRMED'}
            </span>
          </p>
        </div>
        <p style="color:#555;">
          ${isConfirmed
            ? 'Our team will contact you to finalize your travel arrangements. If you have any questions, simply reply to this email.'
            : 'If you have questions or would like to re-submit your payment, simply reply to this email and our team will assist you.'
          }
        </p>
      </div>
      ${FOOTER(true)}
    </div>`;

  try {
    await transporter.sendMail({
      from:    `"EthioTour" <${ADMIN_EMAIL}>`,
      to,
      replyTo: ADMIN_EMAIL,   // ← traveler replies go to YOUR Gmail inbox
      subject: isConfirmed
        ? `✅ Booking Confirmed — ${destination} [Ref: ${ref}]`
        : `❌ Booking Update — ${destination} [Ref: ${ref}]`,
      html,
    });
    console.log(`✅ Booking email sent → ${to} [${status}]`);
  } catch (err) {
    console.error(`❌ Booking email failed → ${to}:`, err.message);
  }
};

// ── Message reply email → traveler ───────────────────────────
exports.sendMessageReply = async ({ to, name, subject, originalMessage, adminReply }) => {
  const transporter = getTransporter();
  if (!transporter) return;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
      ${HEADER}
      <div style="background:#fff;padding:32px;">
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

        <p style="color:#555;">
          If you have further questions, simply <strong>reply to this email</strong> — it goes directly to our team.
        </p>
      </div>
      ${FOOTER(true)}
    </div>`;

  try {
    await transporter.sendMail({
      from:    `"EthioTour" <${ADMIN_EMAIL}>`,
      to,
      replyTo: ADMIN_EMAIL,   // ← traveler replies go to YOUR Gmail inbox
      subject: `Re: ${subject} — EthioTour`,
      html,
    });
    console.log(`✅ Reply email sent → ${to}`);
  } catch (err) {
    console.error(`❌ Reply email failed → ${to}:`, err.message);
  }
};
