
import { z } from 'zod';

// Nigerian phone number validation
export const nigerianPhoneSchema = z.string()
  .min(11, 'Phone number must be at least 11 digits')
  .max(14, 'Phone number must not exceed 14 digits')
  .regex(/^(\+234|234|0)?[789]\d{9}$/, 'Please enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)');

// Email validation with sanitization
export const emailSchema = z.string()
  .email('Please enter a valid email address')
  .min(5, 'Email must be at least 5 characters')
  .max(254, 'Email must not exceed 254 characters')
  .transform(email => email.toLowerCase().trim());

// Name validation with sanitization
export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
  .transform(name => name.trim().replace(/\s+/g, ' '));

// Password validation
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must not exceed 128 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number');

// Nigerian states validation
export const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
] as const;

export const stateSchema = z.enum(nigerianStates, {
  errorMap: () => ({ message: 'Please select a valid Nigerian state' })
});

// Medical data validation
export const bloodGroupSchema = z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
  errorMap: () => ({ message: 'Please select a valid blood group' })
});

export const genotypeSchema = z.enum(['AA', 'AS', 'AC', 'SS', 'SC', 'CC'], {
  errorMap: () => ({ message: 'Please select a valid genotype' })
});

export const genderSchema = z.enum(['male', 'female', 'other'], {
  errorMap: () => ({ message: 'Please select a valid gender' })
});

// Address validation
export const addressSchema = z.string()
  .min(10, 'Address must be at least 10 characters')
  .max(500, 'Address must not exceed 500 characters')
  .transform(address => address.trim());

// LGA validation
export const lgaSchema = z.string()
  .min(3, 'LGA must be at least 3 characters')
  .max(100, 'LGA must not exceed 100 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'LGA can only contain letters, spaces, hyphens, and apostrophes')
  .transform(lga => lga.trim());

// Date validation
export const dateOfBirthSchema = z.string()
  .refine(date => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 13 && age <= 120;
  }, 'Please enter a valid date of birth (age must be between 13 and 120)');

export const dueDateSchema = z.string()
  .optional()
  .refine(date => {
    if (!date) return true;
    const dueDate = new Date(date);
    const today = new Date();
    const tenMonthsFromNow = new Date();
    tenMonthsFromNow.setMonth(today.getMonth() + 10);
    return dueDate >= today && dueDate <= tenMonthsFromNow;
  }, 'Due date must be between today and 10 months from now');

// Profile validation schema
export const profileSchema = z.object({
  full_name: nameSchema,
  phone_number: nigerianPhoneSchema,
  date_of_birth: dateOfBirthSchema,
  gender: genderSchema,
  state_of_residence: stateSchema,
  lga: lgaSchema,
  address: addressSchema,
  emergency_contact_name: nameSchema,
  emergency_contact_phone: nigerianPhoneSchema,
  is_pregnant: z.boolean(),
  due_date: dueDateSchema,
  blood_group: bloodGroupSchema.optional(),
  genotype: genotypeSchema.optional(),
  insurance_provider: z.string().max(100).optional(),
  insurance_number: z.string().max(50).optional(),
  preferred_language: z.enum(['english', 'hausa', 'yoruba', 'igbo']).default('english')
});

// Auth validation schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
});

export const signupSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: nigerianPhoneSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Sanitization functions
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript protocols
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim().replace(/[<>'"]/g, '');
};

export const formatNigerianPhone = (phone: string): string => {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Convert to standard Nigerian format
  if (digits.startsWith('234')) {
    return `+${digits}`;
  } else if (digits.startsWith('0')) {
    return `+234${digits.slice(1)}`;
  } else if (digits.length === 10) {
    return `+234${digits}`;
  }
  
  return phone; // Return original if format is unclear
};
