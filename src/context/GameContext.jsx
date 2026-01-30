/**
 * Game Context
 * Global state management for the entire game
 */

import { createContext, useContext, useReducer, useEffect } from 'react';
import initialGameState from '@/data/initialGameState';
import { loadGameState, saveGameState } from '@/services/storageService';
import {
  calculateNewPowerLevel,
  assignRanks,
  getStrongestCharacter,
  canAfford,
  calculateTotalCost,
  hasInventoryItem,
} from '@/utils/calculations';
import { GAME_CONFIG, ERROR_MESSAGES } from '@/utils/constants';

// Create Context
const GameContext = createContext();

// Action Types
const ACTIONS = {
  LOAD_GAME: 'LOAD_GAME',
  FEED_CHARACTER: 'FEED_CHARACTER',
  PURCHASE_FOOD: 'PURCHASE_FOOD',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  RESET_GAME: 'RESET_GAME',
  INCREMENT_PLAYTIME: 'INCREMENT_PLAYTIME',
};

// Reducer Function
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_GAME:
      return {
        ...action.payload,
        lastSaved: Date.now(),
      };

    case ACTIONS.FEED_CHARACTER: {
      const { characterId, foodId, powerBoost } = action.payload;

      // Find character and update power level
      const updatedCharacters = state.characters.map((char) => {
        if (char.id === characterId) {
          return {
            ...char,
            currentPowerLevel: calculateNewPowerLevel(
              char.currentPowerLevel,
              powerBoost
            ),
            totalFoodConsumed: char.totalFoodConsumed + 1,
            lastFed: Date.now(),
          };
        }
        return char;
      });

      // Assign new ranks
      const rankedCharacters = assignRanks(updatedCharacters);

      // Update inventory
      const updatedInventory = {
        ...state.inventory,
        [foodId]: state.inventory[foodId] - 1,
      };

      // Update stats
      const strongest = getStrongestCharacter(rankedCharacters);
      const updatedStats = {
        ...state.stats,
        totalPowerUps: state.stats.totalPowerUps + 1,
        totalFoodConsumed: state.stats.totalFoodConsumed + 1,
        strongestCharacterId: strongest.id,
      };

      return {
        ...state,
        characters: rankedCharacters,
        inventory: updatedInventory,
        stats: updatedStats,
        lastSaved: Date.now(),
      };
    }

    case ACTIONS.PURCHASE_FOOD: {
      const { foodId, quantity, totalCost } = action.payload;

      return {
        ...state,
        currency: state.currency - totalCost,
        inventory: {
          ...state.inventory,
          [foodId]: state.inventory[foodId] + quantity,
        },
        lastSaved: Date.now(),
      };
    }

    case ACTIONS.UPDATE_SETTINGS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
        lastSaved: Date.now(),
      };
    }

    case ACTIONS.RESET_GAME: {
      return {
        ...initialGameState,
        createdAt: Date.now(),
        lastSaved: Date.now(),
      };
    }

    case ACTIONS.INCREMENT_PLAYTIME: {
      return {
        ...state,
        stats: {
          ...state.stats,
          totalPlayTime: state.stats.totalPlayTime + action.payload,
        },
      };
    }

    default:
      return state;
  }
}

// Provider Component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  // Load game state on mount
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      dispatch({ type: ACTIONS.LOAD_GAME, payload: savedState });
    }
  }, []);

  // Auto-save game state (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveGameState(state);
    }, GAME_CONFIG.SAVE_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [state]);

  // Track playtime
  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      dispatch({ type: ACTIONS.INCREMENT_PLAYTIME, payload: elapsed });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Action: Feed Character
  const feedCharacter = (characterId, foodId, powerBoost) => {
    // Validate
    const character = state.characters.find((c) => c.id === characterId);
    if (!character) {
      throw new Error(ERROR_MESSAGES.INVALID_CHARACTER);
    }

    if (!hasInventoryItem(state.inventory, foodId)) {
      throw new Error(ERROR_MESSAGES.OUT_OF_STOCK);
    }

    dispatch({
      type: ACTIONS.FEED_CHARACTER,
      payload: { characterId, foodId, powerBoost },
    });
  };

  // Action: Purchase Food
  const purchaseFood = (foodId, quantity, unitPrice) => {
    const totalCost = calculateTotalCost(unitPrice, quantity);

    // Validate
    if (!canAfford(state.currency, totalCost)) {
      throw new Error(ERROR_MESSAGES.INSUFFICIENT_FUNDS);
    }

    dispatch({
      type: ACTIONS.PURCHASE_FOOD,
      payload: { foodId, quantity, totalCost },
    });
  };

  // Action: Update Settings
  const updateSettings = (newSettings) => {
    dispatch({
      type: ACTIONS.UPDATE_SETTINGS,
      payload: newSettings,
    });
  };

  // Action: Reset Game
  const resetGame = () => {
    dispatch({ type: ACTIONS.RESET_GAME });
  };

  const value = {
    // State
    characters: state.characters,
    inventory: state.inventory,
    currency: state.currency,
    stats: state.stats,
    settings: state.settings,

    // Actions
    feedCharacter,
    purchaseFood,
    updateSettings,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// Custom Hook
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}

export default GameContext;