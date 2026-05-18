/**
 * Supports multi-language name inputs:
 * - Latin: a-zA-Z
 * - Hebrew: \u0590-\u05FF
 * - Cyrillic: \u0400-\u04FF
 * - Arabic: \u0600-\u06FF
 * - Special: Spaces and hyphens for double names
 */
export const NAME_REGEX = /^[a-zA-Z\u0590-\u05FF\u0400-\u04FF\u0600-\u06FF\s-]+$/;

/**
 * Israeli phone number validation:
 * Supports formats: 0501234567, +972501234567, 972501234567
 */
export const ISRAEL_PHONE_REGEX = /^(?:972|05)\d{8}$|^\+9725\d{8}$/;

/**
 * Strict date validation format: YYYY-MM-DD
 */
export const DATE_YYYY_MM_DD_REGEX = /^\d{4}-\d{2}-\d{2}$/;