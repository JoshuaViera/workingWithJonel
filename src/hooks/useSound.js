/**
 * useSound Hook
 * Manages sound effect playback
 */

import { useCallback } from 'react';
import { useGame } from '@/context/GameContext';

/**
 * Hook for playing sound effects
 * @returns {Function} playSound function
 */
export function useSound() {
  const { settings } = useGame();

  const playSound = useCallback(
    (soundFile) => {
      if (!settings.soundEnabled) return;

      try {
        const audio = new Audio(`/sounds/${soundFile}`);
        audio.volume = 0.5;
        audio.play().catch((error) => {
          console.warn('Sound playback failed:', error);
        });
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    },
    [settings.soundEnabled]
  );

  return playSound;
}

export default useSound;