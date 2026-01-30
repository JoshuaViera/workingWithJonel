/**
 * useAnimation Hook
 * Generic animation trigger hook
 */

import { useState, useEffect } from 'react';

/**
 * Hook for triggering and managing animations
 * @param {number} duration - Animation duration in ms
 * @returns {[boolean, function]} [isActive, trigger]
 */
export function useAnimation(duration = 500) {
  const [isActive, setIsActive] = useState(false);

  const trigger = () => {
    setIsActive(true);
  };

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsActive(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, duration]);

  return [isActive, trigger];
}

export default useAnimation;