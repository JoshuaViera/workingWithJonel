/**
 * Formatting Utilities
 * Functions for formatting data for display
 */

import { GAME_CONFIG } from './constants';

/**
 * Format currency amount
 * @param {number} amount - Currency amount
 * @returns {string} Formatted currency (e.g., "500 zeni")
 */
export function formatCurrency(amount) {
  return `${amount.toLocaleString()} ${GAME_CONFIG.CURRENCY_NAME}`;
}

/**
 * Format power level with label
 * @param {number} powerLevel - Power level number
 * @returns {string} Formatted power level (e.g., "Power Level: 9,001")
 */
export function formatPowerLevel(powerLevel) {
  return `Power Level: ${powerLevel.toLocaleString()}`;
}

/**
 * Format timestamp to readable date
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date (e.g., "Jan 30, 2026")
 */
export function formatDate(timestamp) {
  if (!timestamp) return 'Never';

  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format time duration
 * @param {number} milliseconds - Duration in milliseconds
 * @returns {string} Formatted duration (e.g., "2h 30m")
 */
export function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Format percentage
 * @param {number} value - Percentage value (0-100)
 * @returns {string} Formatted percentage (e.g., "75%")
 */
export function formatPercentage(value) {
  return `${Math.round(value)}%`;
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, maxLength = 50) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert camelCase to Title Case
 * @param {string} str - camelCase string
 * @returns {string} Title Case string
 */
export function camelToTitle(str) {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}