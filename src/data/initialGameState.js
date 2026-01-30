/**
 * Initial Game State
 * Default values when starting a new game
 */

import characters from './characters';
import foodItems from './foodItems';

const initialGameState = {
  // Character states (deep clone to avoid mutation)
  characters: characters.map((char) => ({ ...char })),

  // Food inventory (starting quantities)
  inventory: {
    'ramen': 3,
    'rice-ball': 5,
    'sushi': 2,
    'meat': 2,
    'senzu-bean': 1,
  },

  // Starting currency
  currency: 500, // zeni

  // Game statistics
  stats: {
    totalPowerUps: 0,
    totalFoodConsumed: 0,
    strongestCharacterId: 'goku',
    totalPlayTime: 0, // in milliseconds
    gamesPlayed: 1,
  },

  // User settings
  settings: {
    soundEnabled: false, // Default off until implemented
    animationsEnabled: true,
    theme: 'dark',
  },

  // Metadata
  version: '1.0.0',
  lastSaved: null,
  createdAt: Date.now(),
};

export default initialGameState;