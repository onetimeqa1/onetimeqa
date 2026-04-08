import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendBookingEmail(booking) {
  const {
    bookingId, serviceType, packageName, eventDate, eventTime,
    fullName, phone, eventLocation, extraHours, extraPhotos,
    addCard, cardQtys, totalCards,
  } = booking;

  const subject = `New Booking - ${serviceType === "photobooth" ? "Photobooth" : "Instax Camera"} - ${fullName}`;

  const cardSection = addCard && totalCards > 0 ? `
    <tr><td style="padding:6px 0;color:#5C8A67;width:40%;">Custom Cards</td><td style="padding:6px 0;font-weight:500;">Yes</td></tr>
    ${cardQtys && cardQtys.tall > 0 ? `<tr><td style="padding:6px 0;color:#5C8A67;">Layout 1 (Tall)</td><td style="padding:6px 0;font-weight:500;">${cardQtys.tall} cards x 3 QAR = ${cardQtys.tall * 3} QAR</td></tr>` : ""}
    ${cardQtys && cardQtys.big > 0 ? `<tr><td style="padding:6px 0;color:#5C8A67;">Layout 2 (Big)</td><td style="padding:6px 0;font-weight:500;">${cardQtys.big} cards x 5 QAR = ${cardQtys.big * 5} QAR</td></tr>` : ""}
    <tr><td style="padding:6px 0;color:#5C8A67;">Total Cards</td><td style="padding:6px 0;font-weight:500;">${totalCards} cards</td></tr>
  ` : `<tr><td style="padding:6px 0;color:#5C8A67;">Custom Cards</td><td style="padding:6px 0;">No</td></tr>`;

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A4D2E;padding:32px;">
      <h1 style="font-size:28px;font-weight:300;margin-bottom:4px;">New Booking Request</h1>
      <p style="color:#5C8A67;font-family:sans-serif;font-size:13px;margin-top:0;">OneTime_QA · Booking #${bookingId}</p>
      <hr style="border:none;border-top:1px solid #E4D4B4;margin:24px 0;" />
      <h2 style="font-size:15px;font-family:sans-serif;font-weight:600;color:#133A22;margin-bottom:16px;">Customer Details</h2>
      <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px;">
        <tr><td style="padding:6px 0;color:#5C8A67;width:40%;">Full Name</td><td style="padding:6px 0;font-weight:500;">${fullName}</td></tr>
        <tr><td style="padding:6px 0;color:#5C8A67;">Phone</td><td style="padding:6px 0;font-weight:500;">${phone}</td></tr>
        <tr><td style="padding:6px 0;color:#5C8A67;">Event Location</td><td style="padding:6px 0;font-weight:500;">${eventLocation}</td></tr>
        <tr><td style="padding:6px 0;color:#5C8A67;">Event Date</td><td style="padding:6px 0;font-weight:500;">${eventDate}</td></tr>
        <tr><td style="padding:6px 0;color:#5C8A67;">Event Time</td><td style="padding:6px 0;font-weight:500;">${eventTime}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #E4D4B4;margin:24px 0;" />
      <h2 style="font-size:15px;font-family:sans-serif;font-weight:600;color:#133A22;margin-bottom:16px;">Booking Details</h2>
      <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px;">
        <tr><td style="padding:6px 0;color:#5C8A67;width:40%;">Service</td><td style="padding:6px 0;font-weight:500;">${serviceType === "photobooth" ? "Photobooth" : "Instax Camera"}</td></tr>
        <tr><td style="padding:6px 0;color:#5C8A67;">Package</td><td style="padding:6px 0;font-weight:500;">${packageName}</td></tr>
        ${extraHours > 0 ? `<tr><td style="padding:6px 0;color:#5C8A67;">Extra Hours</td><td style="padding:6px 0;font-weight:500;">${extraHours} hour(s) = ${extraHours * 300} QAR</td></tr>` : ""}
        ${extraPhotos > 0 ? `<tr><td style="padding:6px 0;color:#5C8A67;">Extra Photos</td><td style="padding:6px 0;font-weight:500;">${extraPhotos * 10} photos = ${extraPhotos * 150} QAR</td></tr>` : ""}
        ${cardSection}
      </table>
      <hr style="border:none;border-top:1px solid #E4D4B4;margin:24px 0;" />
      <p style="font-family:sans-serif;font-size:12px;color:#8FAF97;text-align:center;">OneTime_QA · Qatar · Booking #${bookingId}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"OneTime_QA Bookings" <${process.env.SMTP_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject,
    html,
  });
}
