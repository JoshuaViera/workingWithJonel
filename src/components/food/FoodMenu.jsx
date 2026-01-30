/**
 * FoodMenu Component
 * Displays grid of available food items for feeding
 */

import FoodItem from './FoodItem';
import styles from './FoodMenu.module.css';
import foodItems from '@/data/foodItems';

/**
 * FoodMenu Component
 * @param {Object} props
 * @param {Object} props.inventory - Current food inventory
 * @param {string} props.selectedFoodId - Currently selected food ID
 * @param {Function} props.onFoodSelect - Callback when food is selected
 */
function FoodMenu({ inventory, selectedFoodId, onFoodSelect }) {
  return (
    <div className={styles.menu}>
      <div className={styles.instruction}>
        Click a food item, then click a character to feed them
      </div>

      <div className={styles.grid}>
        {foodItems.map((food) => {
          const quantity = inventory[food.id] || 0;
          const isOutOfStock = quantity === 0;

          return (
            <FoodItem
              key={food.id}
              food={food}
              quantity={quantity}
              onSelect={onFoodSelect}
              isSelected={selectedFoodId === food.id}
              disabled={isOutOfStock}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FoodMenu;