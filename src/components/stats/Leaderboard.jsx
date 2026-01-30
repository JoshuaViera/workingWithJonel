/**
 * Leaderboard Component
 * Displays characters ranked by power level
 */

import styles from './Leaderboard.module.css';
import { formatNumber } from '@/utils/formatters';
import { sortCharactersByPower } from '@/utils/calculations';

/**
 * Leaderboard Component
 * @param {Object} props
 * @param {Array} props.characters - Array of character objects
 */
function Leaderboard({ characters }) {
  const sortedCharacters = sortCharactersByPower(characters);

  return (
    <div className={styles.leaderboard}>
      <h3 className={styles.title}>Top Warriors</h3>

      <div className={styles.list}>
        {sortedCharacters.map((character, index) => (
          <div
            key={character.id}
            className={`${styles.row} ${index === 0 ? styles.topRank : ''}`}
          >
            <div className={styles.rank}>
              {index === 0 ? '👑' : `#${index + 1}`}
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{character.name}</div>
              <div className={styles.series}>{character.series}</div>
            </div>
            <div className={styles.power}>
              {formatNumber(character.currentPowerLevel)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;