import nodemailer from 'nodemailer';

export interface SendAuditConfirmationEmailParams {
  name: string;
  email: string;
  website: string;
  phone: string;
  spend?: string;
  objective?: string;
  channels?: string[];
  formType?: string;
}

export async function sendAuditConfirmationEmail({
  name,
  email,
  website,
  phone,
  spend,
  objective,
  channels,
  formType = 'Audit Form'
}: SendAuditConfirmationEmailParams) {
  if (!email || !email.includes('@')) {
    console.warn('[Email] Skipping confirmation email: No valid recipient email provided.');
    return { success: false, reason: 'Invalid email' };
  }

  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const port = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 587);
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass =
    process.env.SMTP_PASSWORD ||
    process.env.SMTP_PASS ||
    process.env.EMAIL_PASS ||
    process.env.EMAIL_PASSWORD;

  // Default to info@averomedia.in & CC to asolkarviraj@gmail.com, averomediainfo@gmail.com
  const fromEmail = process.env.EMAIL_FROM || user || 'info@averomedia.in';
  const adminEmail = process.env.ADMIN_EMAIL || 'info@averomedia.in';
  const adminCcEmail = process.env.ADMIN_CC_EMAIL || process.env.EMAIL_CC || 'asolkarviraj@gmail.com, averomediainfo@gmail.com';

  // Hosted public HTTPS URL for Gmail/Outlook image rendering without local path reliance
  const logoImgSrc = 'https://averomedia.in/logo.png';

  const contactText = phone && email ? `${email} / ${phone}` : email || phone || 'you';
  const channelsList = Array.isArray(channels) ? channels.join(', ') : channels || 'N/A';
  const formattedWebsite = website.startsWith('http') ? website : `https://${website}`;

  // Client Confirmation Email HTML (Light & Professional)
  const clientHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Request Received - AVERO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4F6F9; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(18,59,109,0.06);">
          
          <!-- Header with White Background & Gold Accent Line -->
          <tr>
            <td align="center" style="padding: 32px 24px 20px 24px; background-color: #FFFFFF; border-bottom: 3px solid #D4AF37;">
              <a href="https://averomedia.in" target="_blank" style="text-decoration: none; display: inline-block;">
                <img src="${logoImgSrc}" alt="AVERO Performance Marketing" width="130" style="max-height: 42px; width: auto; display: block; margin: 0 auto; border: 0;" />
              </a>
              <p style="margin: 10px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #123B6D; font-weight: 700;">
                Find the leak &middot; Fix the problem &middot; Scale what works
              </p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 36px 32px 30px 32px; background-color: #FFFFFF;">
              <div style="display: inline-block; background-color: #FEF3C7; border: 1px solid #FCD34D; border-radius: 20px; padding: 4px 14px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #92400E; font-weight: 700; margin-bottom: 20px;">
                Audit Request Confirmed
              </div>

              <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #123B6D; line-height: 1.35;">
                Thank you! We have received your audit request.
              </h2>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #475569;">
                Our team will review your ad setup and reach out to you within 24 hours.
              </p>

              <!-- WhatsApp Quick Action Callout -->
              <p style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.5; color: #475569;">
                Need faster assistance or want to talk to our strategy team immediately?
              </p>
              <div>
                <a href="https://wa.me/918692918021" target="_blank" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);">
                  Chat on WhatsApp: +91 8692918021 &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748B; font-weight: 500;">
                &copy; ${new Date().getFullYear()} AVERO Performance Marketing. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Admin Lead Notification Email HTML (Light & Professional)
  const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Alert - AVERO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4F6F9; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(18,59,109,0.06);">
          
          <!-- Header with Logo -->
          <tr>
            <td align="center" style="padding: 28px 24px 20px 24px; background-color: #FFFFFF; border-bottom: 3px solid #D4AF37;">
              <a href="https://averomedia.in" target="_blank" style="text-decoration: none; display: inline-block;">
                <img src="${logoImgSrc}" alt="AVERO Performance Marketing" width="130" style="max-height: 42px; width: auto; display: block; margin: 0 auto; border: 0;" />
              </a>
              <h3 style="color: #123B6D; font-size: 18px; font-weight: 800; margin: 12px 0 0 0; letter-spacing: -0.01em;">
                🔥 NEW AUDIT LEAD RECEIVED
              </h3>
              <div style="margin-top: 8px;">
                <span style="background-color: #FEF3C7; color: #B45309; border: 1px solid #FCD34D; font-size: 11px; text-transform: uppercase; border-radius: 20px; padding: 3px 12px; font-weight: 700; display: inline-block;">
                  Source: ${formType}
                </span>
              </div>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding: 28px 28px 24px 28px; background-color: #FFFFFF;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden;">
                <tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
                  <td width="36%" style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Full Name:</td>
                  <td style="padding: 12px 16px; color: #0F172A; font-weight: 700; font-size: 14px;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E2E8F0;">
                  <td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Work Email:</td>
                  <td style="padding: 12px 16px; font-size: 14px;"><a href="mailto:${email}" style="color: #123B6D; font-weight: 700; text-decoration: none;">${email}</a></td>
                </tr>
                <tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
                  <td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Phone Number:</td>
                  <td style="padding: 12px 16px; font-size: 14px;"><a href="tel:${phone}" style="color: #123B6D; font-weight: 700; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #E2E8F0;">
                  <td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Website URL:</td>
                  <td style="padding: 12px 16px; font-size: 14px;"><a href="${formattedWebsite}" target="_blank" style="color: #123B6D; font-weight: 700; text-decoration: underline;">${website}</a></td>
                </tr>
                <tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
                  <td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Monthly Spend:</td>
                  <td style="padding: 12px 16px; color: #0F172A; font-weight: 700; font-size: 14px;">${spend || 'Not started'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E2E8F0;">
                  <td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Objective:</td>
                  <td style="padding: 12px 16px; color: #0F172A; font-weight: 600; font-size: 14px;">${objective || 'N/A'}</td>
                </tr>
                <tr style="background-color: #F8FAFC;">
                  <td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Ad Channels:</td>
                  <td style="padding: 12px 16px; color: #0F172A; font-weight: 600; font-size: 14px;">${channelsList}</td>
                </tr>
              </table>

              <!-- Quick Action Bar -->
              <div style="margin-top: 24px; text-align: center;">
                <a href="tel:${phone}" style="display: inline-block; background-color: #123B6D; color: #FFFFFF; font-weight: 700; font-size: 13px; text-decoration: none; padding: 10px 20px; border-radius: 6px; margin-right: 8px;">
                  📞 Call Lead Now
                </a>
                <a href="mailto:${email}" style="display: inline-block; background-color: #F1F5F9; color: #1E293B; border: 1px solid #CBD5E1; font-weight: 700; font-size: 13px; text-decoration: none; padding: 10px 20px; border-radius: 6px;">
                  ✉️ Reply by Email
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 24px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748B; font-weight: 500;">
                AVERO Lead Dispatch System &middot; &copy; ${new Date().getFullYear()} AVERO
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      });



      // Send to lead
      await transporter.sendMail({
        from: `"AVERO Performance Marketing" <${fromEmail}>`,
        to: email,
        subject: `Audit Request Received for ${website || 'your brand'} - AVERO`,
        html: clientHtml
      });

      // Send lead notification to admin & CC recipient
      await transporter.sendMail({
        from: `"AVERO Lead Alert" <${fromEmail}>`,
        to: adminEmail,
        ...(adminCcEmail ? { cc: adminCcEmail } : {}),
        subject: `🚨 New Lead: ${name} (${website}) - ${formType}`,
        html: adminHtml
      });

      console.log(`[Email] Lead notification and confirmation email sent successfully.`);
      return { success: true };
    } else {
      console.log(
        `[Email Simulation] SMTP not fully configured. Notification intended for ${email} & ${adminEmail}:`,
        { name, email, website, phone, spend, formType }
      );
      return { success: true, simulated: true };
    }
  } catch (error) {
    console.error('[Email Error] Failed to send email:', error);
    return { success: false, error };
  }
}
