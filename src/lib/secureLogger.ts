
/**
 * Secure logging utility for production environments
 * Replaces console.log statements with conditional, sanitized logging
 */

interface LogContext {
  [key: string]: any;
}

interface SecurityEvent {
  type: 'auth' | 'admin' | 'error' | 'security';
  action: string;
  userId?: string;
  metadata?: LogContext;
  timestamp: string;
}

class SecureLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private securityEvents: SecurityEvent[] = [];

  /**
   * Log general information (only in development)
   */
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, context);
    }
  }

  /**
   * Log errors (always logged, but sanitized in production)
   */
  error(message: string, error?: any, context?: LogContext): void {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error, context);
    } else {
      // In production, log sanitized error without sensitive data
      console.error(`[ERROR] ${message}`, {
        errorType: error?.name || 'Unknown',
        hasContext: !!context,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Log security events (always logged for audit purposes)
   */
  security(type: SecurityEvent['type'], action: string, userId?: string, metadata?: LogContext): void {
    const event: SecurityEvent = {
      type,
      action,
      userId: userId ? this.sanitizeUserId(userId) : undefined,
      metadata: metadata ? this.sanitizeMetadata(metadata) : undefined,
      timestamp: new Date().toISOString()
    };

    this.securityEvents.push(event);
    
    if (this.isDevelopment) {
      console.log(`[SECURITY] ${type.toUpperCase()} - ${action}`, event);
    }

    // In production, you might want to send this to a logging service
    // Example: this.sendToLoggingService(event);
  }

  /**
   * Log authentication events
   */
  auth(action: string, userId?: string, metadata?: LogContext): void {
    this.security('auth', action, userId, metadata);
  }

  /**
   * Log admin actions
   */
  admin(action: string, userId?: string, metadata?: LogContext): void {
    this.security('admin', action, userId, metadata);
  }

  /**
   * Sanitize user ID for logging (show only partial ID)
   */
  private sanitizeUserId(userId: string): string {
    if (userId.length > 8) {
      return `${userId.substring(0, 4)}...${userId.substring(userId.length - 4)}`;
    }
    return userId.substring(0, 3) + '***';
  }

  /**
   * Sanitize metadata to remove sensitive information
   */
  private sanitizeMetadata(metadata: LogContext): LogContext {
    const sanitized: LogContext = {};
    const sensitiveKeys = ['password', 'token', 'email', 'phone', 'ssn', 'credit_card'];
    
    for (const [key, value] of Object.entries(metadata)) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'string' && value.length > 100) {
        sanitized[key] = value.substring(0, 50) + '...[TRUNCATED]';
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }

  /**
   * Get recent security events for audit purposes
   */
  getSecurityEvents(limit: number = 50): SecurityEvent[] {
    return this.securityEvents.slice(-limit);
  }

  /**
   * Clear old security events (call periodically to prevent memory leaks)
   */
  clearOldEvents(maxAge: number = 24 * 60 * 60 * 1000): void {
    const cutoff = Date.now() - maxAge;
    this.securityEvents = this.securityEvents.filter(
      event => new Date(event.timestamp).getTime() > cutoff
    );
  }
}

export const secureLogger = new SecureLogger();
