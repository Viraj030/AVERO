import { NextResponse } from 'next/server';
import { validateAuditLead } from '@/lib/validations';

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

    // Here lead details can be safely dispatched to CRM, Slack, Webhook, Email API
    // Secret keys stay safe on the server environment.

    return NextResponse.json({
      success: true,
      message: 'Audit request received successfully',
      lead: { name, email, website, phone, spend, objective, channels }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
