/**
 * FoodItem Component
 * Displays a single food item with purchase/use functionality
 */

import { useState } from 'react';
import styles from './FoodItem.module.css';
import { RARITY_COLORS } from '@/utils/constants';
import { formatCurrency } from '@/utils/formatters';

/**
 * FoodItem Component
 * @param {Object} props
 * @param {Object} props.food - Food item data
 * @param {number} props.quantity - Current inventory quantity
 * @param {Function} props.onSelect - Callback when food is selected
 * @param {boolean} props.isSelected - Whether food is currently selected
 * @param {boolean} props.disabled - Whether food is disabled (out of stock)
 */
function FoodItem({ food, quantity, onSelect, isSelected, disabled }) {
  const [imageError, setImageError] = useState(false);

  const rarityColor = RARITY_COLORS[food.rarity] || RARITY_COLORS.common;

  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect(food.id);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`${styles.item} ${isSelected ? styles.selected : ''} ${
        disabled ? styles.disabled : ''
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyPress={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          handleClick();
        }
      }}
      aria-label={`${food.name}, +${food.powerBoost} power, ${quantity} in stock`}
      aria-disabled={disabled}
    >
      {/* Rarity Indicator */}
      <div
        className={styles.rarityBorder}
        style={{ borderColor: rarityColor }}
      />

      {/* Food Image */}
      <div className={styles.imageContainer}>
        {!imageError ? (
          <img
            src={food.imageUrl}
            alt={food.name}
            onError={handleImageError}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.emoji}>🍜</span>
          </div>
        )}

        {/* Quantity Badge */}
        <div className={styles.quantityBadge}>
          {quantity}x
        </div>
      </div>

      {/* Food Info */}
      <div className={styles.info}>
        <h4 className={styles.name}>{food.name}</h4>

        {/* Power Boost */}
        <div className={styles.powerBoost}>
          +{food.powerBoost} Power
        </div>

        {/* Price */}
        <div className={styles.price}>
          {formatCurrency(food.price)}
        </div>
      </div>

      {/* Out of Stock Overlay */}
      {disabled && (
        <div className={styles.outOfStock}>
          <span>Out of Stock</span>
        </div>
      )}
    </div>
  );
}

export default FoodItem;