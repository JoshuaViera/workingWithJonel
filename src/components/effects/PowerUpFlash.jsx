/**
 * PowerUpFlash Component
 * "POWER UP!" flash text effect
 */

import { useEffect, useState } from 'react';
import styles from './PowerUpFlash.module.css';

/**
 * PowerUpFlash Component
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the flash
 */
function PowerUpFlash({ show }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <div className={styles.flash}>
      <div className={styles.text}>POWER UP!</div>
    </div>
  );
}

export default PowerUpFlash;