/**
 * EMAIL SERVICE — uses nodemailer with Gmail
 * Set EMAIL_USER and EMAIL_PASS in Render environment variables
 */

const nodemailer = require('nodemailer');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sisay3575@gmail.com';

const getTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS.replace(/\s/g, ''), // remove spaces from app password
    },
  });
};

const wrap = (body) => `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f0ede8;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;">
<tr><td style="background:#2d3e23;padding:24px 32px;text-align:center;">
  <h1 style="color:#d4af37;margin:0;font-size:24px;">EthioTour</h1>
  <p style="color:rgba(255,255,255,0.5);margin:4px 0 0;font-size:12px;">Horn of Africa Travel Experts</p>
</td></tr>
<tr><td style="padding:32px;">${body}</td></tr>
<tr><td style="background:#f8f7f4;padding:20px 32px;text-align:center;color:#aaa;font-size:11px;line-height:1.8;">
  EthioTour &nbsp;·&nbsp; Addis Ababa, Ethiopia<br>
  📞 +251 935 756 054 &nbsp;·&nbsp; ✉️ ${ADMIN_EMAIL}<br>
  <em>To reply, simply reply to this email — it goes directly to our team.</em>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;

const sendEmail = async ({ to, subject, html }) => {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(`⚠️ Email not sent to ${to} — EMAIL_USER/EMAIL_PASS not set in environment`);
    return;
  }
  try {
    await transporter.sendMail({
      from: `"EthioTour" <${process.env.EMAIL_USER}>`,
      to,
      replyTo: ADMIN_EMAIL,
      subject,
      html,
    });
    console.log(`✅ Email sent → ${to}`);
  } catch (err) {
    console.error(`❌ Email failed → ${to}: ${err.message}`);
  }
};

exports.sendBookingConfirmation = async ({ to, name, destination, ref, status, adminNote, rejectionReason }) => {
  const isConfirmed = status === 'confirmed';
  const html = wrap(`
    <h2 style="color:#2d3e23;margin-top:0;">${isConfirmed ? '✅ Your Booking is Confirmed!' : '❌ Booking Not Confirmed'}</h2>
    <p style="color:#555;">Dear <strong>${name}</strong>,</p>
    <p style="color:#555;">${isConfirmed
      ? `Your booking for <strong>${destination}</strong> has been <strong style="color:#2e7d32;">confirmed</strong>. We look forward to welcoming you!`
      : `Unfortunately your booking for <strong>${destination}</strong> could not be confirmed.`
    }</p>
    ${adminNote ? `<div style="background:#e3f2fd;border-left:4px solid #1976d2;padding:12px 16px;border-radius:6px;margin:16px 0;"><strong>Message from EthioTour:</strong><br>${adminNote}</div>` : ''}
    ${rejectionReason ? `<div style="background:#ffebee;border-left:4px solid #f44336;padding:12px 16px;border-radius:6px;margin:16px 0;"><strong>Reason:</strong><br>${rejectionReason}</div>` : ''}
    <div style="background:#f8f7f4;border-radius:8px;padding:16px;margin:20px 0;">
      <p style="margin:0;color:#777;font-size:13px;"><strong>Booking Reference:</strong> <span style="font-family:monospace;color:#2d3e23;font-weight:bold;">${ref}</span></p>
      <p style="margin:6px 0 0;color:#777;font-size:13px;"><strong>Destination:</strong> ${destination}</p>
      <p style="margin:6px 0 0;color:#777;font-size:13px;"><strong>Status:</strong> <span style="color:${isConfirmed ? '#2e7d32' : '#c62828'};font-weight:bold;">${isConfirmed ? 'CONFIRMED ✓' : 'NOT CONFIRMED ✗'}</span></p>
    </div>
    <p style="color:#555;">If you have questions, simply reply to this email — it goes directly to our team.</p>
  `);
  await sendEmail({
    to,
    subject: isConfirmed
      ? `✅ Booking Confirmed — ${destination} [Ref: ${ref}]`
      : `❌ Booking Not Confirmed — ${destination} [Ref: ${ref}]`,
    html,
  });
};

exports.sendMessageReply = async ({ to, name, subject, originalMessage, adminReply }) => {
  const html = wrap(`
    <h2 style="color:#2d3e23;margin-top:0;">💬 Reply to Your Message</h2>
    <p style="color:#555;">Dear <strong>${name}</strong>,</p>
    <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin:16px 0;">
      <p style="margin:0 0 6px;color:#999;font-size:11px;font-weight:bold;text-transform:uppercase;">Your Message</p>
      <p style="margin:0;color:#666;font-style:italic;">"${originalMessage}"</p>
    </div>
    <div style="background:#e8f5e9;border-left:4px solid #4caf50;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;">
      <p style="margin:0 0 6px;color:#2e7d32;font-size:11px;font-weight:bold;text-transform:uppercase;">EthioTour Response</p>
      <p style="margin:0;color:#333;">${adminReply}</p>
    </div>
    <p style="color:#555;">If you have further questions, simply reply to this email.</p>
  `);
  await sendEmail({
    to,
    subject: `Re: ${subject} — EthioTour`,
    html,
  });
};
