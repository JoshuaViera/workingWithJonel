/**
 * Calculation Utilities
 * Pure functions for game calculations
 */

import { POWER_TIERS } from './constants';

/**
 * Calculate new power level after feeding
 * @param {number} currentPower - Current power level
 * @param {number} foodBoost - Power boost from food
 * @returns {number} New power level
 */
export function calculateNewPowerLevel(currentPower, foodBoost) {
  return currentPower + foodBoost;
}

/**
 * Get power tier for a given power level
 * @param {number} powerLevel - Character's power level
 * @returns {Object} Tier object with label and color
 */
export function getPowerTier(powerLevel) {
  for (const [key, tier] of Object.entries(POWER_TIERS)) {
    if (powerLevel >= tier.min && powerLevel <= tier.max) {
      return { key, ...tier };
    }
  }
  return POWER_TIERS.WEAK;
}

/**
 * Format number with commas (e.g., 9001 -> "9,001")
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Calculate total power across all characters
 * @param {Array} characters - Array of character objects
 * @returns {number} Total power
 */
export function calculateTotalPower(characters) {
  return characters.reduce((sum, char) => sum + char.currentPowerLevel, 0);
}

/**
 * Sort characters by power level (descending)
 * @param {Array} characters - Array of character objects
 * @returns {Array} Sorted array of characters
 */
export function sortCharactersByPower(characters) {
  return [...characters].sort(
    (a, b) => b.currentPowerLevel - a.currentPowerLevel
  );
}

/**
 * Assign ranks to characters based on power level
 * @param {Array} characters - Array of character objects
 * @returns {Array} Characters with rank property updated
 */
export function assignRanks(characters) {
  const sorted = sortCharactersByPower(characters);
  return sorted.map((char, index) => ({
    ...char,
    rank: index + 1,
  }));
}

/**
 * Calculate if player can afford a purchase
 * @param {number} currentCurrency - Player's current currency
 * @param {number} itemPrice - Price of item
 * @returns {boolean} Can afford
 */
export function canAfford(currentCurrency, itemPrice) {
  return currentCurrency >= itemPrice;
}

/**
 * Calculate total cost for multiple items
 * @param {number} unitPrice - Price per unit
 * @param {number} quantity - Number of units
 * @returns {number} Total cost
 */
export function calculateTotalCost(unitPrice, quantity) {
  return unitPrice * quantity;
}

/**
 * Check if inventory has item available
 * @param {Object} inventory - Inventory object
 * @param {string} foodId - Food item ID
 * @returns {boolean} Has item
 */
export function hasInventoryItem(inventory, foodId) {
  return inventory[foodId] > 0;
}

/**
 * Get strongest character
 * @param {Array} characters - Array of character objects
 * @returns {Object} Strongest character
 */
export function getStrongestCharacter(characters) {
  return characters.reduce((strongest, char) =>
    char.currentPowerLevel > strongest.currentPowerLevel ? char : strongest
  );
}

/**
 * Calculate percentage progress to next tier
 * @param {number} powerLevel - Current power level
 * @returns {number} Percentage (0-100)
 */
export function calculateTierProgress(powerLevel) {
  const tier = getPowerTier(powerLevel);
  if (tier.max === Infinity) return 100; // Max tier

  const range = tier.max - tier.min;
  const progress = powerLevel - tier.min;
  return Math.min(100, (progress / range) * 100);
}