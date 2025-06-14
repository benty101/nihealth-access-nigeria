
// Data masking utilities
export const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) return email;
  
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) return email;
  
  const maskedLocal = localPart[0] + '*'.repeat(Math.max(localPart.length - 2, 1)) + localPart[localPart.length - 1];
  return `${maskedLocal}@${domain}`;
};

export const maskPhone = (phone: string): string => {
  if (!phone || phone.length < 8) return phone;
  
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length < 8) return phone;
  
  const lastFour = cleanPhone.slice(-4);
  const masked = '*'.repeat(cleanPhone.length - 4) + lastFour;
  
  // Preserve original formatting structure
  return phone.replace(/\d/g, (match, index) => {
    const digitIndex = phone.slice(0, index + 1).replace(/\D/g, '').length - 1;
    return digitIndex < masked.length ? masked[digitIndex] : match;
  });
};

// Error message sanitization
export const sanitizeErrorMessage = (error: any): string => {
  const errorMessage = error?.message || 'An unexpected error occurred';
  
  // Map specific error messages to user-friendly ones
  const errorMappings: Record<string, string> = {
    'Invalid login credentials': 'Incorrect email or password. Please try again.',
    'User already registered': 'An account with this email already exists. Please sign in instead.',
    'Email not confirmed': 'Please check your email and confirm your account before signing in.',
    'Invalid email': 'Please enter a valid email address.',
    'Password too short': 'Password must be at least 8 characters long.',
    'Network error': 'Connection error. Please check your internet and try again.',
    'Internal server error': 'Service temporarily unavailable. Please try again later.',
    'Too many requests': 'Too many attempts. Please wait a moment before trying again.',
  };
  
  // Check for exact matches first
  for (const [key, message] of Object.entries(errorMappings)) {
    if (errorMessage.includes(key)) {
      return message;
    }
  }
  
  // Generic fallback that doesn't reveal system details
  if (errorMessage.toLowerCase().includes('auth') || errorMessage.toLowerCase().includes('login')) {
    return 'Authentication failed. Please check your credentials and try again.';
  }
  
  if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('fetch')) {
    return 'Connection error. Please check your internet and try again.';
  }
  
  if (errorMessage.toLowerCase().includes('server') || errorMessage.toLowerCase().includes('500')) {
    return 'Service temporarily unavailable. Please try again later.';
  }
  
  // Don't reveal internal system details
  return 'Something went wrong. Please try again or contact support if the problem persists.';
};

// Session security utilities
export const SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
export const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout

export const isSessionExpired = (lastActivity: number): boolean => {
  return Date.now() - lastActivity > SESSION_TIMEOUT;
};

export const shouldShowWarning = (lastActivity: number): boolean => {
  const timeLeft = SESSION_TIMEOUT - (Date.now() - lastActivity);
  return timeLeft <= WARNING_TIME && timeLeft > 0;
};

// Rate limiting helpers (client-side)
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  canAttempt(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Clean old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }
  
  getRemainingTime(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): number {
    const attempts = this.attempts.get(key) || [];
    if (attempts.length < maxAttempts) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    return Math.max(0, windowMs - (Date.now() - oldestAttempt));
  }
}

// Input validation for potential XSS
export const validateInput = (input: string, maxLength: number = 1000): boolean => {
  if (!input || typeof input !== 'string') return false;
  if (input.length > maxLength) return false;
  
  // Check for potential XSS patterns
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /<link/gi,
    /<meta/gi
  ];
  
  return !xssPatterns.some(pattern => pattern.test(input));
};

// Secure logging function that excludes sensitive data
export const secureLog = (event: string, data: Record<string, any> = {}) => {
  const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth', 'session'];
  
  const sanitizedData = Object.entries(data).reduce((acc, [key, value]) => {
    const isSensitive = sensitiveFields.some(field => 
      key.toLowerCase().includes(field)
    );
    
    acc[key] = isSensitive ? '[REDACTED]' : value;
    return acc;
  }, {} as Record<string, any>);
  
  console.log(`[SECURITY] ${event}:`, sanitizedData);
};
