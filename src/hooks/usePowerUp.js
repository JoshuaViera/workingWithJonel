/**
 * usePowerUp Hook
 * Manages power-up animations and effects
 */

import { useState, useCallback } from 'react';
import { ANIMATION_DURATION } from '@/utils/constants';

/**
 * Hook for managing power-up animations
 * @returns {Object} Animation state and trigger function
 */
export function usePowerUp() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingCharacterId, setAnimatingCharacterId] = useState(null);
  const [isSenzuBean, setIsSenzuBean] = useState(false);

  const triggerPowerUp = useCallback((characterId, foodId) => {
    setIsAnimating(true);
    setAnimatingCharacterId(characterId);
    setIsSenzuBean(foodId === 'senzu-bean');

    // Determine animation duration
    const duration =
      foodId === 'senzu-bean'
        ? ANIMATION_DURATION.SLOW * 2
        : ANIMATION_DURATION.COUNTER;

    // Reset after animation completes
    setTimeout(() => {
      setIsAnimating(false);
      setAnimatingCharacterId(null);
      setIsSenzuBean(false);
    }, duration);
  }, []);

  return {
    isAnimating,
    animatingCharacterId,
    isSenzuBean,
    triggerPowerUp,
  };
}

export default usePowerUp;