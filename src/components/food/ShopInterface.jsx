/**
 * ShopInterface Component
 * Modal for purchasing food items
 */

import { useState } from 'react';
import styles from './ShopInterface.module.css';
import foodItems from '@/data/foodItems';
import { formatCurrency } from '@/utils/formatters';
import { calculateTotalCost, canAfford } from '@/utils/calculations';
import { useGame } from '@/context/GameContext';

/**
 * ShopInterface Component
 * @param {Object} props
 * @param {Function} props.onClose - Callback to close the shop
 */
function ShopInterface({ onClose }) {
  const { currency, purchaseFood } = useGame();
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState('');

  const handleQuantityChange = (foodId, value) => {
    const quantity = Math.max(1, Math.min(99, parseInt(value) || 1));
    setQuantities((prev) => ({
      ...prev,
      [foodId]: quantity,
    }));
    setError('');
  };

  const handlePurchase = (food) => {
    const quantity = quantities[food.id] || 1;
    const totalCost = calculateTotalCost(food.price, quantity);

    if (!canAfford(currency, totalCost)) {
      setError(`Not enough zeni! Need ${totalCost - currency} more.`);
      return;
    }

    try {
      purchaseFood(food.id, quantity, food.price);
      setError('');
      // Reset quantity for this item
      setQuantities((prev) => ({
        ...prev,
        [food.id]: 1,
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Food Shop</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close shop"
          >
            ×
          </button>
        </div>

        {/* Currency Display */}
        <div className={styles.currency}>
          Your Balance: <span>{formatCurrency(currency)}</span>
        </div>

        {/* Error Message */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Food Items */}
        <div className={styles.items}>
          {foodItems.map((food) => {
            const quantity = quantities[food.id] || 1;
            const totalCost = calculateTotalCost(food.price, quantity);
            const affordable = canAfford(currency, totalCost);

            return (
              <div key={food.id} className={styles.item}>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{food.name}</h3>
                  <p className={styles.itemDescription}>{food.description}</p>
                  <div className={styles.itemStats}>
                    <span className={styles.powerBoost}>
                      +{food.powerBoost} Power
                    </span>
                    <span className={styles.rarity}>
                      {food.rarity.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className={styles.purchaseSection}>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() =>
                        handleQuantityChange(food.id, quantity - 1)
                      }
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(food.id, e.target.value)
                      }
                      aria-label="Quantity"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(food.id, quantity + 1)
                      }
                      disabled={quantity >= 99}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.costDisplay}>
                    Total: {formatCurrency(totalCost)}
                  </div>

                  <button
                    className={`${styles.buyButton} ${
                      !affordable ? styles.disabled : ''
                    }`}
                    onClick={() => handlePurchase(food)}
                    disabled={!affordable}
                  >
                    {affordable ? 'Purchase' : 'Insufficient Funds'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShopInterface;