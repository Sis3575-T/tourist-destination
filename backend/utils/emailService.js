const nodemailer = require('nodemailer');

// Create transporter — uses Gmail SMTP
// Set EMAIL_USER and EMAIL_PASS in backend/.env
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'sisay3575@gmail.com',
      pass: process.env.EMAIL_PASS || '',
    },
  });
};

// Send booking confirmation to traveler
exports.sendBookingConfirmation = async ({ to, name, destination, ref, status, adminNote, rejectionReason }) => {
  if (!process.env.EMAIL_PASS) return; // Skip if not configured
  try {
    const transporter = createTransporter();
    const isConfirmed = status === 'confirmed';
    await transporter.sendMail({
      from: `"EthioTour" <${process.env.EMAIL_USER || 'sisay3575@gmail.com'}>`,
      to,
      subject: isConfirmed
        ? `✅ Booking Confirmed — ${destination}`
        : `❌ Booking Update — ${destination}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f8f7f4;padding:32px;border-radius:16px;">
          <div style="background:#2d3e23;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px;">
            <h1 style="color:#d4af37;margin:0;font-size:24px;">EthioTour</h1>
          </div>
          <h2 style="color:#2d3e23;">${isConfirmed ? '✅ Your Booking is Confirmed!' : '❌ Booking Update'}</h2>
          <p style="color:#555;">Dear <strong>${name}</strong>,</p>
          <p style="color:#555;">${isConfirmed
            ? `Great news! Your booking for <strong>${destination}</strong> has been confirmed by our team.`
            : `We have an update regarding your booking for <strong>${destination}</strong>.`
          }</p>
          ${adminNote ? `<div style="background:#e8f5e9;border-left:4px solid #4caf50;padding:12px 16px;border-radius:8px;margin:16px 0;"><strong>Message from EthioTour:</strong><br>${adminNote}</div>` : ''}
          ${rejectionReason ? `<div style="background:#ffebee;border-left:4px solid #f44336;padding:12px 16px;border-radius:8px;margin:16px 0;"><strong>Reason:</strong><br>${rejectionReason}</div>` : ''}
          <p style="color:#555;">Booking Reference: <strong style="font-family:monospace;">${ref}</strong></p>
          <p style="color:#555;">Log in to your dashboard to view full details.</p>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #ddd;color:#999;font-size:12px;text-align:center;">
            EthioTour · Addis Ababa, Ethiopia · sisay3575@gmail.com · +251 935 756 054
          </div>
        </div>
      `,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error('Email send error:', err.message);
  }
};

// Send admin reply to traveler message
exports.sendMessageReply = async ({ to, name, subject, originalMessage, adminReply }) => {
  if (!process.env.EMAIL_PASS) return;
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"EthioTour" <${process.env.EMAIL_USER || 'sisay3575@gmail.com'}>`,
      to,
      subject: `Re: ${subject} — EthioTour`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f8f7f4;padding:32px;border-radius:16px;">
          <div style="background:#2d3e23;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px;">
            <h1 style="color:#d4af37;margin:0;font-size:24px;">EthioTour</h1>
          </div>
          <h2 style="color:#2d3e23;">Reply to Your Message</h2>
          <p style="color:#555;">Dear <strong>${name}</strong>,</p>
          <div style="background:#f0f0f0;padding:12px 16px;border-radius:8px;margin:16px 0;color:#777;font-style:italic;">
            <strong>Your message:</strong><br>${originalMessage}
          </div>
          <div style="background:#e8f5e9;border-left:4px solid #4caf50;padding:12px 16px;border-radius:8px;margin:16px 0;">
            <strong>EthioTour Response:</strong><br>${adminReply}
          </div>
          <p style="color:#555;">You can also view this reply in your dashboard under "My Messages".</p>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #ddd;color:#999;font-size:12px;text-align:center;">
            EthioTour · Addis Ababa, Ethiopia · sisay3575@gmail.com · +251 935 756 054
          </div>
        </div>
      `,
    });
    console.log(`✅ Reply email sent to ${to}`);
  } catch (err) {
    console.error('Email send error:', err.message);
  }
};
