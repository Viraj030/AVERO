export interface AuditLeadValidationInput {
  name?: string;
  email?: string;
  website?: string;
  phone?: string;
  spend?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateAuditLead(input: AuditLeadValidationInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.name !== undefined) {
    if (!input.name.trim()) {
      errors.name = 'Enter your name';
    }
  }

  if (input.email !== undefined) {
    if (!input.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
      errors.email = 'Enter a valid work email';
    }
  }

  if (input.website !== undefined) {
    if (!input.website.trim()) {
      errors.website = 'Enter your website';
    }
  }

  if (input.phone !== undefined) {
    const cleanPhone = input.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      errors.phone = 'Contact number must be exactly 10 digits';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
