import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

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

  // Default to asolkarviraj@gmail.com
  const fromEmail = process.env.EMAIL_FROM || user || 'asolkarviraj@gmail.com';
  const adminEmail = process.env.ADMIN_EMAIL || 'asolkarviraj@gmail.com';

  // Check if logo exists on disk to attach as CID and inline base64
  const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
  const hasLogo = fs.existsSync(logoPath);

  let logoBase64 = '';
  if (hasLogo) {
    logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;
  }

  const contactText = phone && email ? `${email} / ${phone}` : email || phone || 'you';
  const channelsList = Array.isArray(channels) ? channels.join(', ') : channels || 'N/A';

  // Client Confirmation Email HTML
  const clientHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Request Received - AVERO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0C2846; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0C2846; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #123B6D; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
          
          <!-- Header with Logo -->
          <tr>
            <td align="center" style="padding: 36px 30px 24px 30px; background-color: #FFFFFF; border-bottom: 3px solid #D4AF37;">
              ${
                hasLogo
                  ? `<img src="${logoBase64}" alt="AVERO" style="max-height: 48px; width: auto; display: block; margin: 0 auto;" />`
                  : `<h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 0.15em; color: #123B6D;">AVERO</h1>`
              }
              <p style="margin: 10px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #123B6D; opacity: 0.85; font-weight: 700;">
                Find the leak &middot; Fix the problem &middot; Scale what works
              </p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 36px 32px 30px 32px;">
              <div style="display: inline-block; background-color: rgba(212, 175, 55, 0.15); border: 1px solid #D4AF37; border-radius: 20px; padding: 5px 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #D4AF37; font-weight: 700; margin-bottom: 18px;">
                Audit Request Confirmed
              </div>

              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">
                We're reviewing your ad setup, ${name || 'there'}!
              </h2>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: rgba(255, 255, 255, 0.85);">
                Thank you for requesting your 15-Minute Performance Marketing Audit for <strong style="color: #FFFFFF;">${website || 'your website'}</strong>. Our growth team is reviewing your details and will contact you via <strong style="color: #D4AF37;">${contactText}</strong> within 24 hours.
              </p>

              <!-- Submission Details Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(12, 40, 70, 0.65); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 12px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px;">
                    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #D4AF37; font-weight: 700; margin-bottom: 14px;">
                      Submitted Diagnostic Summary
                    </div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="6" style="font-size: 14px; color: rgba(255, 255, 255, 0.9);">
                      <tr>
                        <td width="38%" style="color: rgba(255, 255, 255, 0.6);">Name:</td>
                        <td style="font-weight: 600; color: #FFFFFF;">${name}</td>
                      </tr>
                      <tr>
                        <td style="color: rgba(255, 255, 255, 0.6);">Website:</td>
                        <td style="font-weight: 600; color: #FFFFFF;">${website}</td>
                      </tr>
                      <tr>
                        <td style="color: rgba(255, 255, 255, 0.6);">Email:</td>
                        <td style="font-weight: 600; color: #FFFFFF;">${email}</td>
                      </tr>
                      <tr>
                        <td style="color: rgba(255, 255, 255, 0.6);">Phone:</td>
                        <td style="font-weight: 600; color: #FFFFFF;">${phone}</td>
                      </tr>
                      <tr>
                        <td style="color: rgba(255, 255, 255, 0.6);">Monthly Spend:</td>
                        <td style="font-weight: 600; color: #FFFFFF;">${spend || 'Not started'}</td>
                      </tr>
                      ${
                        objective
                          ? `<tr>
                              <td style="color: rgba(255, 255, 255, 0.6);">Objective:</td>
                              <td style="font-weight: 600; color: #FFFFFF;">${objective}</td>
                            </tr>`
                          : ''
                      }
                      ${
                        channelsList !== 'N/A'
                          ? `<tr>
                              <td style="color: rgba(255, 255, 255, 0.6);">Channels:</td>
                              <td style="font-weight: 600; color: #FFFFFF;">${channelsList}</td>
                            </tr>`
                          : ''
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- WhatsApp Action -->
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5; color: rgba(255, 255, 255, 0.8);">
                Need faster assistance or want to talk to our strategy team immediately?
              </p>
              <div>
                <a href="https://wa.me/918692918021" target="_blank" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 26px; border-radius: 30px; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);">
                  Chat on WhatsApp: +91 8692918021 &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #0C2846; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: rgba(255, 255, 255, 0.6);">
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

  // Admin Notification Email HTML
  const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Lead Alert - AVERO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0C2846; font-family: sans-serif; color: #FFFFFF;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #123B6D; border: 2px solid #D4AF37; border-radius: 14px; padding: 24px;">
          <tr>
            <td align="center" style="padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.15);">
              ${
                hasLogo
                  ? `<img src="${logoBase64}" alt="AVERO" style="max-height: 44px; width: auto; display: block;" />`
                  : `<h2 style="color: #D4AF37; margin: 0;">AVERO MEDIA</h2>`
              }
              <h3 style="color: #FFFFFF; margin: 12px 0 0 0;">🔥 NEW AUDIT LEAD RECEIVED</h3>
              <p style="color: #D4AF37; font-size: 13px; font-weight: 700; margin: 4px 0 0 0;">Source: ${formType}</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 20px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="color: #FFFFFF; font-size: 14px;">
                <tr style="background: rgba(255,255,255,0.05);">
                  <td width="35%"><strong>Full Name:</strong></td>
                  <td>${name}</td>
                </tr>
                <tr>
                  <td><strong>Work Email:</strong></td>
                  <td><a href="mailto:${email}" style="color: #D4AF37;">${email}</a></td>
                </tr>
                <tr style="background: rgba(255,255,255,0.05);">
                  <td><strong>Phone Number:</strong></td>
                  <td><a href="tel:${phone}" style="color: #D4AF37;">${phone}</a></td>
                </tr>
                <tr>
                  <td><strong>Website URL:</strong></td>
                  <td><a href="${website.startsWith('http') ? website : 'https://' + website}" target="_blank" style="color: #D4AF37;">${website}</a></td>
                </tr>
                <tr style="background: rgba(255,255,255,0.05);">
                  <td><strong>Monthly Spend:</strong></td>
                  <td>${spend || 'Not started'}</td>
                </tr>
                <tr>
                  <td><strong>Objective:</strong></td>
                  <td>${objective || 'N/A'}</td>
                </tr>
                <tr style="background: rgba(255,255,255,0.05);">
                  <td><strong>Ad Channels:</strong></td>
                  <td>${channelsList}</td>
                </tr>
              </table>
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

      const attachments = hasLogo
        ? [
            {
              filename: 'logo.png',
              path: logoPath,
              cid: 'avero-logo'
            }
          ]
        : [];

      // Send to lead
      await transporter.sendMail({
        from: `"AVERO Performance Marketing" <${fromEmail}>`,
        to: email,
        subject: `Audit Request Received for ${website || 'your brand'} - AVERO`,
        html: clientHtml,
        attachments
      });

      // Send lead notification to admin (asolkarviraj@gmail.com)
      await transporter.sendMail({
        from: `"AVERO Lead Alert" <${fromEmail}>`,
        to: adminEmail,
        subject: `🚨 New Lead: ${name} (${website}) - ${formType}`,
        html: adminHtml,
        attachments
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
