/**
 * CharacterCard Component
 * Displays a single Dragon Ball character with their stats
 */

import { useState } from 'react';
import styles from './CharacterCard.module.css';
import PowerLevelDisplay from './PowerLevelDisplay';
import { SERIES_INFO } from '@/utils/constants';
import { getPowerTier } from '@/utils/calculations';

/**
 * CharacterCard Component
 * @param {Object} props
 * @param {Object} props.character - Character data
 * @param {Function} props.onFeed - Callback when character is clicked for feeding
 * @param {boolean} props.isAnimating - Whether power-up animation is active
 * @param {boolean} props.isSelected - Whether character is selected for feeding
 */
function CharacterCard({ character, onFeed, isAnimating, isSelected }) {
  const [imageError, setImageError] = useState(false);

  const tier = getPowerTier(character.currentPowerLevel);
  const seriesInfo = SERIES_INFO[character.series];

  const handleClick = () => {
    if (onFeed) {
      onFeed(character.id);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`${styles.card} ${isAnimating ? styles.animating : ''} ${
        isSelected ? styles.selected : ''
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      aria-label={`${character.name}, Power Level ${character.currentPowerLevel}`}
    >
      {/* Aura Effect */}
      {isAnimating && <div className={styles.aura}></div>}

      {/* Series Badge */}
      <div
        className={styles.badge}
        style={{ backgroundColor: seriesInfo.color }}
        title={seriesInfo.label}
      >
        {character.series}
      </div>

      {/* Character Portrait */}
      <div className={styles.portrait}>
        {!imageError ? (
          <img
            src={character.imageUrl}
            alt={character.name}
            onError={handleImageError}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderText}>
              {character.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Character Info */}
      <div className={styles.info}>
        <h3 className={styles.name}>{character.name}</h3>

        {/* Power Level Display */}
        <PowerLevelDisplay
          powerLevel={character.currentPowerLevel}
          isAnimating={isAnimating}
        />

        {/* Power Tier */}
        <div
          className={styles.tier}
          style={{ color: tier.color }}
        >
          {tier.label}
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Rank:</span>
            <span className={styles.statValue}>#{character.rank || '—'}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Fed:</span>
            <span className={styles.statValue}>
              {character.totalFoodConsumed}x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;