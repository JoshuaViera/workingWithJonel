/**
 * Storage Service
 * Handles all localStorage operations with error handling and backups
 */

import { STORAGE_KEYS, ERROR_MESSAGES } from '@/utils/constants';
import {
  isValidGameState,
  isValidStorageData,
} from '@/utils/validators';

/**
 * Check if localStorage is available
 * @returns {boolean} Is available
 */
export function isStorageAvailable() {
  try {
    const test = '__storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.warn('localStorage is not available:', error);
    return false;
  }
}

/**
 * Save game state to localStorage
 * @param {Object} gameState - Game state object
 * @returns {boolean} Success status
 */
export function saveGameState(gameState) {
  if (!isStorageAvailable()) {
    console.warn(ERROR_MESSAGES.STORAGE_UNAVAILABLE);
    return false;
  }

  try {
    // Validate before saving
    if (!isValidGameState(gameState)) {
      console.error('Invalid game state, not saving');
      return false;
    }

    const dataToSave = {
      ...gameState,
      lastSaved: Date.now(),
      version: '1.0.0',
    };

    // Backup current save before overwriting
    const currentSave = window.localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    if (currentSave) {
      window.localStorage.setItem(STORAGE_KEYS.BACKUP_1, currentSave);
    }

    // Save to primary key
    window.localStorage.setItem(
      STORAGE_KEYS.GAME_STATE,
      JSON.stringify(dataToSave)
    );

    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error(ERROR_MESSAGES.STORAGE_QUOTA_EXCEEDED);
    } else {
      console.error('Error saving game state:', error);
    }
    return false;
  }
}

/**
 * Load game state from localStorage
 * @returns {Object|null} Game state or null if not found
 */
export function loadGameState() {
  if (!isStorageAvailable()) {
    console.warn(ERROR_MESSAGES.STORAGE_UNAVAILABLE);
    return null;
  }

  try {
    // Try to load from primary key
    const saved = window.localStorage.getItem(STORAGE_KEYS.GAME_STATE);

    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);

    // Validate loaded data
    if (!isValidStorageData(parsed)) {
      console.warn('Corrupted save data, trying backup...');
      return loadBackup();
    }

    return parsed;
  } catch (error) {
    console.error('Error loading game state:', error);
    return loadBackup();
  }
}

/**
 * Load from backup save
 * @returns {Object|null} Backup game state or null
 */
function loadBackup() {
  try {
    const backup = window.localStorage.getItem(STORAGE_KEYS.BACKUP_1);

    if (!backup) {
      console.warn('No backup available');
      return null;
    }

    const parsed = JSON.parse(backup);

    if (isValidStorageData(parsed)) {
      console.log('Restored from backup save');
      return parsed;
    }

    return null;
  } catch (error) {
    console.error('Error loading backup:', error);
    return null;
  }
}

/**
 * Clear all saved data
 */
export function clearStorage() {
  if (!isStorageAvailable()) return;

  try {
    window.localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
    window.localStorage.removeItem(STORAGE_KEYS.BACKUP_1);
    window.localStorage.removeItem(STORAGE_KEYS.BACKUP_2);
    console.log('Storage cleared successfully');
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}

/**
 * Export save data as JSON string
 * @returns {string} JSON string of save data
 */
export function exportSaveData() {
  const saveData = loadGameState();
  if (!saveData) return null;

  return JSON.stringify(saveData, null, 2);
}

/**
 * Import save data from JSON string
 * @param {string} jsonString - JSON string of save data
 * @returns {boolean} Success status
 */
export function importSaveData(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);

    if (!isValidStorageData(parsed)) {
      console.error('Invalid save data format');
      return false;
    }

    return saveGameState(parsed);
  } catch (error) {
    console.error('Error importing save data:', error);
    return false;
  }
}