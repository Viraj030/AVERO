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
}

export async function sendAuditConfirmationEmail({
  name,
  email,
  website,
  phone,
  spend,
  objective,
  channels
}: SendAuditConfirmationEmailParams) {
  if (!email || !email.includes('@')) {
    console.warn('[Email] Skipping confirmation email: No valid recipient email provided.');
    return { success: false, reason: 'Invalid email' };
  }

  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const port = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 587);
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;
  const fromEmail = process.env.EMAIL_FROM || user || 'hello@averomedia.in';

  // Check if logo exists on disk to attach as CID
  const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
  const hasLogo = fs.existsSync(logoPath);

  const contactText = phone && email ? `${email} / ${phone}` : (email || phone || 'you');

  const htmlContent = `
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
        <!-- Main Card -->
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #123B6D; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
          
          <!-- Header with Logo -->
          <tr>
            <td align="center" style="padding: 36px 30px 20px 30px; background-color: #FFFFFF; border-bottom: 2px solid #D4AF37;">
              ${
                hasLogo
                  ? `<img src="cid:avero-logo" alt="AVERO" style="max-height: 38px; width: auto; display: block;" />`
                  : `<h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 0.15em; color: #123B6D;">AVERO</h1>`
              }
              <p style="margin: 8px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #123B6D; opacity: 0.8; font-weight: 600;">
                Find the leak &middot; Fix the problem &middot; Scale what works
              </p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 36px 32px 30px 32px;">
              <div style="display: inline-block; background-color: rgba(212, 175, 55, 0.15); border: 1px solid #D4AF37; border-radius: 20px; padding: 4px 14px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #D4AF37; font-weight: 700; margin-bottom: 16px;">
                Audit Request Received
              </div>

              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">
                We're reviewing your ad setup, ${name || 'there'}!
              </h2>

              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.85);">
                Thank you for requesting your 15-Minute Performance Marketing Audit. We will review your ad setup for <strong style="color: #FFFFFF;">${website || 'your website'}</strong> and reach out to <strong style="color: #D4AF37;">${contactText}</strong> within 24 hours.
              </p>

              <!-- Submission Summary Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(12, 40, 70, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px;">
                    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #D4AF37; font-weight: 700; margin-bottom: 12px;">
                      Your Diagnostic Details
                    </div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="6" style="font-size: 14px; color: rgba(255, 255, 255, 0.9);">
                      <tr>
                        <td width="35%" style="color: rgba(255, 255, 255, 0.6);">Name:</td>
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
                        <td style="color: rgba(255, 255, 255, 0.6);">Contact Number:</td>
                        <td style="font-weight: 600; color: #FFFFFF;">${phone}</td>
                      </tr>
                      ${
                        spend
                          ? `<tr>
                              <td style="color: rgba(255, 255, 255, 0.6);">Monthly Spend:</td>
                              <td style="font-weight: 600; color: #FFFFFF;">${spend}</td>
                            </tr>`
                          : ''
                      }
                      ${
                        objective
                          ? `<tr>
                              <td style="color: rgba(255, 255, 255, 0.6);">Objective:</td>
                              <td style="font-weight: 600; color: #FFFFFF;">${objective}</td>
                            </tr>`
                          : ''
                      }
                      ${
                        channels && channels.length > 0
                          ? `<tr>
                              <td style="color: rgba(255, 255, 255, 0.6);">Ad Channels:</td>
                              <td style="font-weight: 600; color: #FFFFFF;">${channels.join(', ')}</td>
                            </tr>`
                          : ''
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- WhatsApp Quick Connect -->
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5; color: rgba(255, 255, 255, 0.8);">
                Need faster assistance or have quick questions before the teardown?
              </p>
              <div>
                <a href="https://wa.me/918692918021" target="_blank" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 30px; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);">
                  Chat on WhatsApp: +91 8692918021 &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #0C2846; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: rgba(255, 255, 255, 0.6);">
                &copy; ${new Date().getFullYear()} AVERO &mdash; Performance Marketing. All rights reserved.
              </p>
              <div style="font-size: 11px; color: rgba(255, 255, 255, 0.4);">
                <a href="https://www.instagram.com/averomedia.in?stkn=MTlmd3oxd3ptcDVubw==" style="color: #D4AF37; text-decoration: none; margin: 0 6px;">Instagram</a> &middot;
                <a href="https://www.linkedin.com/company/avero-media/" style="color: #D4AF37; text-decoration: none; margin: 0 6px;">LinkedIn</a> &middot;
                <a href="https://www.facebook.com/profile.php?id=61593950286740" style="color: #D4AF37; text-decoration: none; margin: 0 6px;">Facebook</a>
              </div>
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
        auth: {
          user,
          pass
        }
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

      await transporter.sendMail({
        from: `"AVERO Performance Marketing" <${fromEmail}>`,
        to: email,
        subject: `Audit Request Received for ${website || 'your brand'} - AVERO`,
        html: htmlContent,
        attachments
      });

      console.log(`[Email] Audit confirmation email successfully sent to ${email}`);
      return { success: true };
    } else {
      console.log(
        `[Email Simulation] SMTP not configured. Prepared confirmation email for ${email} with details:`,
        { name, email, website, phone, spend }
      );
      return { success: true, simulated: true };
    }
  } catch (error) {
    console.error('[Email Error] Failed to send audit confirmation email:', error);
    return { success: false, error };
  }
}
