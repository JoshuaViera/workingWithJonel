/**
 * Main App Component
 * Fully integrated with all features
 */

import { useState } from 'react';
import { GameProvider, useGame } from '@/context/GameContext';
import styles from './App.module.css';

// Components
import CharacterGrid from '@/components/character/CharacterGrid';
import FoodMenu from '@/components/food/FoodMenu';
import ShopInterface from '@/components/food/ShopInterface';
import Leaderboard from '@/components/stats/Leaderboard';
import PowerUpFlash from '@/components/effects/PowerUpFlash';
import Button from '@/components/ui/Button';

// Hooks
import { usePowerUp } from '@/hooks/usePowerUp';

// Utils
import { formatCurrency } from '@/utils/formatters';
import foodItems from '@/data/foodItems';

/**
 * GameContent Component (uses GameProvider context)
 */
function GameContent() {
  const { characters, inventory, currency, feedCharacter, resetGame } =
    useGame();

  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [showShop, setShowShop] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [error, setError] = useState('');

  const { animatingCharacterId, isSenzuBean, triggerPowerUp } = usePowerUp();

  // Handle food selection
  const handleFoodSelect = (foodId) => {
    setSelectedFoodId(foodId);
    setSelectedCharacterId(null);
    setError('');
  };

  // Handle character click (feeding)
  const handleCharacterClick = (characterId) => {
    if (!selectedFoodId) {
      setError('Please select a food item first!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const food = foodItems.find((f) => f.id === selectedFoodId);

      // Feed the character
      feedCharacter(characterId, selectedFoodId, food.powerBoost);

      // Trigger animations
      triggerPowerUp(characterId, selectedFoodId);
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 800);

      // Reset selections
      setSelectedFoodId(null);
      setSelectedCharacterId(null);
      setError('');
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  // Handle reset with confirmation
  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all progress? This cannot be undone.'
      )
    ) {
      resetGame();
      setSelectedFoodId(null);
      setSelectedCharacterId(null);
      setError('');
    }
  };

  return (
    <div className={styles.app}>
      {/* Power Up Flash Effect */}
      <PowerUpFlash show={showFlash} />

      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              Dragon Ball
              <br />
              <span className={styles.subtitle}>Power-Up Diner</span>
            </h1>

            <div className={styles.headerActions}>
              <div className={styles.currencyDisplay}>
                <span className={styles.currencyLabel}>Balance:</span>
                <span className={styles.currencyAmount}>
                  {formatCurrency(currency)}
                </span>
              </div>

              <Button onClick={() => setShowShop(true)} variant="primary">
                🛒 Shop
              </Button>

              <Button onClick={handleReset} variant="danger">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className={styles.errorBanner}>
          <div className="container">{error}</div>
        </div>
      )}

      {/* Main Content */}
      <main className={styles.main}>
        <div className="container">
          <div className={styles.gameLayout}>
            {/* Character Section */}
            <section className={styles.characterSection}>
              <h2 className={styles.sectionTitle}>Warriors</h2>
              <CharacterGrid
                characters={characters}
                onCharacterClick={handleCharacterClick}
                animatingCharacterId={animatingCharacterId}
                selectedCharacterId={selectedCharacterId}
              />
            </section>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Leaderboard */}
              <Leaderboard characters={characters} />
            </aside>
          </div>

          {/* Food Menu Section */}
          <section className={styles.foodSection}>
            <h2 className={styles.sectionTitle}>Food Menu</h2>
            <FoodMenu
              inventory={inventory}
              selectedFoodId={selectedFoodId}
              onFoodSelect={handleFoodSelect}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          Made with ⚡ for learning | Dragon Ball © Akira Toriyama/Shueisha
        </p>
      </footer>

      {/* Shop Modal */}
      {showShop && <ShopInterface onClose={() => setShowShop(false)} />}
    </div>
  );
}

/**
 * App Component (Root)
 */
function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;