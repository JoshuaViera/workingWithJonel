/**
 * Application Constants
 * Centralized constants for the entire application
 */

// Color Palette
export const COLORS = {
  PRIMARY_ORANGE: '#FF6B35',
  SCOUTER_GREEN: '#00FF41',
  POWER_AURA_GOLD: '#FFD700',
  BACKGROUND_DARK: '#1A1A2E',
  ACCENT_RED: '#E94560',
  TEXT_LIGHT: '#FFFFFF',
  TEXT_DARK: '#2C2C2C',
};

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 500,
  SLOW: 1000,
  COUNTER: 1500,
  SENZU_SHAKE: 300,
  FLASH_TEXT: 800,
};

// Power Level Tiers
export const POWER_TIERS = {
  WEAK: { min: 0, max: 100, label: 'Weak', color: '#999' },
  AVERAGE: { min: 101, max: 500, label: 'Average', color: '#4CAF50' },
  STRONG: { min: 501, max: 1000, label: 'Strong', color: '#FF9800' },
  SUPER: { min: 1001, max: 5000, label: 'Super', color: '#FF6B35' },
  LEGENDARY: { min: 5001, max: Infinity, label: 'Legendary', color: '#FFD700' },
};

// Food Rarity Colors
export const RARITY_COLORS = {
  common: '#999',
  uncommon: '#4CAF50',
  rare: '#2196F3',
  legendary: '#FFD700',
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  GAME_STATE: 'dbz-power-up-diner-save',
  BACKUP_1: 'dbz-power-up-diner-backup-1',
  BACKUP_2: 'dbz-power-up-diner-backup-2',
  SETTINGS: 'dbz-power-up-diner-settings',
};

// Game Constants
export const GAME_CONFIG = {
  STARTING_CURRENCY: 500,
  MAX_CHARACTERS: 12,
  MAX_INVENTORY_PER_ITEM: 99,
  SAVE_DEBOUNCE_MS: 2000,
  CURRENCY_NAME: 'zeni',
};

// Series Badges
export const SERIES_INFO = {
  Z: {
    label: 'Dragon Ball Z',
    color: '#FF6B35',
    badgeUrl: '/images/badges/dbz-badge.png',
  },
  GT: {
    label: 'Dragon Ball GT',
    color: '#E94560',
    badgeUrl: '/images/badges/gt-badge.png',
  },
  Super: {
    label: 'Dragon Ball Super',
    color: '#2196F3',
    badgeUrl: '/images/badges/super-badge.png',
  },
};

// Breakpoints (matches CSS)
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1440,
};

// Error Messages
export const ERROR_MESSAGES = {
  STORAGE_UNAVAILABLE: 'Save feature unavailable. Progress won\'t persist.',
  STORAGE_QUOTA_EXCEEDED: 'Storage limit reached. Please free up some space.',
  CORRUPTED_SAVE: 'Save data corrupted. Starting fresh.',
  INSUFFICIENT_FUNDS: 'Not enough zeni to purchase this item.',
  OUT_OF_STOCK: 'This food item is out of stock. Visit the shop!',
  INVALID_CHARACTER: 'Character not found.',
  INVALID_FOOD: 'Food item not found.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: 'Progress saved successfully!',
  PURCHASE_SUCCESS: 'Item purchased!',
  RESET_SUCCESS: 'Game reset to defaults.',
};

// Event Names (for custom events)
export const EVENTS = {
  CHARACTER_FED: 'character:fed',
  POWER_UP: 'power:up',
  PURCHASE_MADE: 'purchase:made',
  GAME_SAVED: 'game:saved',
  GAME_RESET: 'game:reset',
};

export default {
  COLORS,
  ANIMATION_DURATION,
  POWER_TIERS,
  RARITY_COLORS,
  STORAGE_KEYS,
  GAME_CONFIG,
  SERIES_INFO,
  BREAKPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  EVENTS,
};

