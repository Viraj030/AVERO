import { NextResponse } from 'next/server';
import { validateAuditLead } from '@/lib/validations';
import { sendAuditConfirmationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, website, phone, spend, objective, channels } = body || {};

    const validation = validateAuditLead({ name, email, website, phone });
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Send confirmation email to the user with company logo & audit summary
    if (email) {
      await sendAuditConfirmationEmail({
        name,
        email,
        website,
        phone,
        spend,
        objective,
        channels
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Audit request received successfully',
      lead: { name, email, website, phone, spend, objective, channels }
    });
  } catch (error) {
    console.error('[API /api/audit error]:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

