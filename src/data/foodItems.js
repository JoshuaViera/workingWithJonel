/**
 * Food Item Database
 * Contains all available food items with their properties
 */

const foodItems = [
  {
    id: 'ramen',
    name: 'Ramen',
    powerBoost: 20,
    price: 10,
    rarity: 'common',
    imageUrl: '/images/food/ramen.png',
    description: 'A hearty bowl of ramen. Goku\'s favorite!',
    soundEffect: 'eating.mp3',
  },
  {
    id: 'rice-ball',
    name: 'Rice Ball',
    powerBoost: 10,
    price: 5,
    rarity: 'common',
    imageUrl: '/images/food/rice-ball.png',
    description: 'Simple but effective. A quick snack.',
    soundEffect: 'eating.mp3',
  },
  {
    id: 'sushi',
    name: 'Sushi',
    powerBoost: 30,
    price: 15,
    rarity: 'common',
    imageUrl: '/images/food/sushi.png',
    description: 'Fresh sushi rolls. Delicious and nutritious.',
    soundEffect: 'eating.mp3',
  },
  {
    id: 'meat',
    name: 'Meat',
    powerBoost: 50,
    price: 25,
    rarity: 'uncommon',
    imageUrl: '/images/food/meat.png',
    description: 'A huge chunk of meat. Vegeta approves.',
    soundEffect: 'eating.mp3',
  },
  {
    id: 'senzu-bean',
    name: 'Senzu Bean',
    powerBoost: 200,
    price: 100,
    rarity: 'legendary',
    imageUrl: '/images/food/senzu-bean.png',
    description: 'Legendary healing bean! Massive power boost!',
    soundEffect: 'senzu-bean.mp3',
  },
];

export default foodItems;