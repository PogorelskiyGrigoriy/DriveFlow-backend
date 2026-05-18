/**
 * Machine-readable error codes for frontend and backend synchronization.
 */
export type AppErrorCode = 
  | 'VALIDATION_ERROR'    // Zod validation failed
  | 'NOT_FOUND'           // Resource not found (404)
  | 'AUTH_REQUIRED'       // Missing or invalid token (401)
  | 'FORBIDDEN'           // Insufficient permissions / RBAC (403)
  | 'CONFLICT'            // Resource conflict, e.g., double booking (409)
  | 'SERVER_ERROR';       // Unhandled runtime exception (500)

/**
 * Structure for field-specific validation issues (directly maps from Zod).
 */
export interface ValidationErrorDetail {
  path: (string | number)[];
  message: string;
}

/**
 * Standard API response payload for any non-2xx HTTP status code.
 */
export interface ApiErrorResponse {
  error: string;
  code: AppErrorCode;
  details?: ValidationErrorDetail[] | unknown;
  timestamp: string;
}