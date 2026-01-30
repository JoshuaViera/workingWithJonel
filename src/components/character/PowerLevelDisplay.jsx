/**
 * PowerLevelDisplay Component
 * Animated power level counter with scouter styling
 */

import { useState, useEffect, useRef } from 'react';
import styles from './PowerLevelDisplay.module.css';
import { formatNumber } from '@/utils/formatters';
import { ANIMATION_DURATION } from '@/utils/constants';

/**
 * PowerLevelDisplay Component
 * @param {Object} props
 * @param {number} props.powerLevel - Current power level
 * @param {boolean} props.isAnimating - Whether to animate the counter
 */
function PowerLevelDisplay({ powerLevel, isAnimating }) {
  const [displayValue, setDisplayValue] = useState(powerLevel);
  const previousValueRef = useRef(powerLevel);

  useEffect(() => {
    if (!isAnimating) {
      setDisplayValue(powerLevel);
      previousValueRef.current = powerLevel;
      return;
    }

    const start = previousValueRef.current;
    const end = powerLevel;
    const duration = ANIMATION_DURATION.COUNTER;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(start + (end - start) * easeOut);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
        previousValueRef.current = end;
      }
    };

    requestAnimationFrame(animate);
  }, [powerLevel, isAnimating]);

  return (
    <div className={`${styles.display} ${isAnimating ? styles.animating : ''}`}>
      <div className={styles.label}>Power Level</div>
      <div className={styles.value}>{formatNumber(displayValue)}</div>
    </div>
  );
}

export default PowerLevelDisplay;