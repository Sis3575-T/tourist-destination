const nodemailer = require('nodemailer');

/**
 * EMAIL SETUP:
 * 1. Go to https://myaccount.google.com/security
 * 2. Enable 2-Step Verification
 * 3. Go to App Passwords → create one for "Mail"
 * 4. Set in Render backend env vars:
 *    EMAIL_USER = sisay3575@gmail.com
 *    EMAIL_PASS = (the 16-char app password)
 */

const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('⚠️  EMAIL_USER or EMAIL_PASS not set — emails will not be sent.');
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
};

const BRAND_HEADER = `
  <div style="background:#2d3e23;padding:20px 32px;border-radius:12px 12px 0 0;text-align:center;">
    <h1 style="color:#d4af37;margin:0;font-size:22px;letter-spacing:1px;">EthioTour</h1>
    <p style="color:#ffffff80;margin:4px 0 0;font-size:12px;">Horn of Africa Travel Experts</p>
  </div>`;

const BRAND_FOOTER = `
  <div style="margin-top:24px;padding:16px 32px;background:#f0ede8;border-radius:0 0 12px 12px;text-align:center;color:#999;font-size:11px;">
    EthioTour · Addis Ababa, Ethiopia<br>
    📞 +251 935 756 054 · ✉️ sisay3575@gmail.com
  </div>`;

// ── Booking status email ──────────────────────────────────────
exports.sendBookingConfirmation = async ({
  to, name, destination, ref, status, adminNote, rejectionReason,
}) => {
  const transporter = getTransporter();
  if (!transporter) return;

  const isConfirmed = status === 'confirmed';

  const subject = isConfirmed
    ? `✅ Booking Confirmed — ${destination}`
    : `❌ Booking Rejected — ${destination}`;

  const bodyColor  = isConfirmed ? '#e8f5e9' : '#ffebee';
  const borderColor = isConfirmed ? '#4caf50' : '#f44336';
  const headline   = isConfirmed
    ? '✅ Your Booking is Confirmed!'
    : '❌ Your Booking Has Been Rejected';

  const statusMsg = isConfirmed
    ? `Great news! Your booking for <strong>${destination}</strong> has been <strong style="color:#2e7d32;">confirmed</strong> by our team. We look forward to welcoming you!`
    : `Unfortunately, your booking for <strong>${destination}</strong> could not be confirmed at this time.`;

  const noteBlock = adminNote
    ? `<div style="background:#e3f2fd;border-left:4px solid #1976d2;padding:12px 16px;border-radius:6px;margin:16px 0;">
        <strong style="color:#1565c0;">Message from EthioTour:</strong><br>
        <span style="color:#333;">${adminNote}</span>
       </div>`
    : '';

  const reasonBlock = rejectionReason
    ? `<div style="background:#ffebee;border-left:4px solid #f44336;padding:12px 16px;border-radius:6px;margin:16px 0;">
        <strong style="color:#c62828;">Reason for rejection:</strong><br>
        <span style="color:#333;">${rejectionReason}</span>
       </div>`
    : '';

  const nextStep = isConfirmed
    ? `<p style="color:#555;">Our team will contact you shortly to finalize your travel arrangements. You can also view your booking in your <strong>Dashboard</strong>.</p>`
    : `<p style="color:#555;">If you believe this is an error or would like to re-submit your payment, please <a href="https://tourist-destination-2.onrender.com" style="color:#2d3e23;font-weight:bold;">contact us</a> or visit your Dashboard.</p>`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
      ${BRAND_HEADER}
      <div style="background:#ffffff;padding:32px;">
        <h2 style="color:#2d3e23;margin-top:0;">${headline}</h2>
        <p style="color:#555;">Dear <strong>${name}</strong>,</p>
        <p style="color:#555;">${statusMsg}</p>
        ${noteBlock}
        ${reasonBlock}
        ${nextStep}
        <div style="background:#f8f7f4;border-radius:8px;padding:16px;margin:20px 0;">
          <p style="margin:0;color:#777;font-size:13px;">
            <strong>Booking Reference:</strong>
            <span style="font-family:monospace;font-size:15px;color:#2d3e23;font-weight:bold;"> ${ref}</span>
          </p>
          <p style="margin:6px 0 0;color:#777;font-size:13px;">
            <strong>Destination:</strong> ${destination}
          </p>
          <p style="margin:6px 0 0;color:#777;font-size:13px;">
            <strong>Status:</strong>
            <span style="color:${isConfirmed ? '#2e7d32' : '#c62828'};font-weight:bold;">
              ${isConfirmed ? 'CONFIRMED' : 'REJECTED'}
            </span>
          </p>
        </div>
      </div>
      ${BRAND_FOOTER}
    </div>`;

  try {
    await transporter.sendMail({
      from: `"EthioTour" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Booking email sent → ${to} [${status}]`);
  } catch (err) {
    console.error(`❌ Failed to send booking email to ${to}:`, err.message);
  }
};

// ── Message reply email ───────────────────────────────────────
exports.sendMessageReply = async ({ to, name, subject, originalMessage, adminReply }) => {
  const transporter = getTransporter();
  if (!transporter) return;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
      ${BRAND_HEADER}
      <div style="background:#ffffff;padding:32px;">
        <h2 style="color:#2d3e23;margin-top:0;">💬 Reply to Your Message</h2>
        <p style="color:#555;">Dear <strong>${name}</strong>,</p>
        <p style="color:#555;">Our team has responded to your message. Here is the reply:</p>

        <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin:16px 0;">
          <p style="margin:0 0 6px;color:#999;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Your Message</p>
          <p style="margin:0;color:#666;font-style:italic;">"${originalMessage}"</p>
        </div>

        <div style="background:#e8f5e9;border-left:4px solid #4caf50;border-radius:0 8px 8px 0;padding:16px;margin:16px 0;">
          <p style="margin:0 0 6px;color:#2e7d32;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">EthioTour Response</p>
          <p style="margin:0;color:#333;">${adminReply}</p>
        </div>

        <p style="color:#555;">You can also view this reply in your <a href="https://tourist-destination-2.onrender.com" style="color:#2d3e23;font-weight:bold;">Dashboard → My Messages</a>.</p>
        <p style="color:#555;">If you have further questions, feel free to reply to this email or contact us directly.</p>
      </div>
      ${BRAND_FOOTER}
    </div>`;

  try {
    await transporter.sendMail({
      from: `"EthioTour" <${process.env.EMAIL_USER}>`,
      to,
      replyTo: process.env.EMAIL_USER,
      subject: `Re: ${subject} — EthioTour`,
      html,
    });
    console.log(`✅ Reply email sent → ${to}`);
  } catch (err) {
    console.error(`❌ Failed to send reply email to ${to}:`, err.message);
  }
};
