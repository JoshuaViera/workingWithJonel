/**
 * CharacterGrid Component
 * Grid layout for displaying multiple character cards
 */

import CharacterCard from './CharacterCard';
import styles from './CharacterGrid.module.css';

/**
 * CharacterGrid Component
 * @param {Object} props
 * @param {Array} props.characters - Array of character objects
 * @param {Function} props.onCharacterClick - Callback when character is clicked
 * @param {string} props.animatingCharacterId - ID of currently animating character
 * @param {string} props.selectedCharacterId - ID of selected character
 */
function CharacterGrid({
  characters,
  onCharacterClick,
  animatingCharacterId,
  selectedCharacterId,
}) {
  if (!characters || characters.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No characters available</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onFeed={onCharacterClick}
          isAnimating={animatingCharacterId === character.id}
          isSelected={selectedCharacterId === character.id}
        />
      ))}
    </div>
  );
}

export default CharacterGrid;