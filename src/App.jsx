/**
 * Main App Component
 * Root component that wraps the entire application
 */

import { useState, useEffect } from 'react';
import styles from './App.module.css';

// Import initial data
import initialGameState from '@/data/initialGameState';

// TODO: Import components as they're built
// import CharacterGrid from '@/components/character/CharacterGrid';
// import FoodMenu from '@/components/food/FoodMenu';

function App() {
  const [gameState, setGameState] = useState(initialGameState);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading (will be replaced with actual localStorage loading)
  useEffect(() => {
    // TODO: Load from localStorage
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="loading"></div>
        <p>Loading Dragon Ball Power-Up Diner...</p>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Dragon Ball Power-Up Diner</h1>
          <div className={styles.currencyDisplay}>
            <span className={styles.currencyAmount}>
              {gameState.currency} zeni
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className="container">
          <div className={styles.gameArea}>
            {/* Character Section - To be built */}
            <section className={styles.characterSection}>
              <h2>Characters</h2>
              {/* <CharacterGrid characters={gameState.characters} /> */}
              <p className={styles.placeholder}>
                Character cards will appear here
              </p>
            </section>

            {/* Food Menu Section - To be built */}
            <section className={styles.foodSection}>
              <h2>Food Menu</h2>
              {/* <FoodMenu inventory={gameState.inventory} /> */}
              <p className={styles.placeholder}>Food menu will appear here</p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          Made with ⚡ by [Your Names] | Dragon Ball © Akira Toriyama/Shueisha
        </p>
      </footer>
    </div>
  );
}

export default App;