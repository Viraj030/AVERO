import { NextResponse } from 'next/server';
import { validateAuditLead } from '@/lib/validations';
import { sendAuditConfirmationEmail } from '@/lib/email';
import { submitToGoogleSheets } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType, name, email, website, phone, spend, objective, channels } = body || {};

    const validation = validateAuditLead({ name, email, website, phone });
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Log lead to Google Sheets & send email confirmation in parallel
    const sheetsPromise = submitToGoogleSheets({
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      formType: formType || 'Hero Form',
      name,
      email,
      website,
      phone,
      spend: spend || 'N/A',
      objective: objective || 'N/A',
      channels: Array.isArray(channels) ? channels.join(', ') : channels || 'N/A'
    }).catch((err) => console.error('[Google Sheets error]:', err));

    const emailPromise = email
      ? sendAuditConfirmationEmail({
          name,
          email,
          website,
          phone,
          spend,
          objective,
          channels,
          formType: formType || 'Hero Form'
        }).catch((err) => console.error('[Email error]:', err))
      : Promise.resolve();

    await Promise.allSettled([sheetsPromise, emailPromise]);

    return NextResponse.json({
      success: true,
      message: 'Audit request received successfully',
      lead: { formType, name, email, website, phone, spend, objective, channels }
    });
  } catch (error) {
    console.error('[API /api/audit error]:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

