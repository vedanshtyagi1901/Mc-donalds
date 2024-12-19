import React from 'react';
import ItemCard from './ItemCard';

// Define all menu items outside of the component
const menuItems = {
  Burger: [
    { image: './various-items/Burger.png', title: 'Margreta', price: 300 },
    { image: './various-items/Burger.png', title: 'Cheeseburger', price: 350 },
    { image: './various-items/Burger.png', title: 'Chicken Burger', price: 400 },
    { image: './various-items/Burger.png', title: 'Veggie Burger', price: 250 },
  ],
  Pizza: [
    { image: './various-items/pizza.png', title: 'Margherita Pizza', price: 500 },
    { image: './various-items/pizza.png', title: 'Pepperoni Pizza', price: 600 },
    { image: './various-items/pizza.png', title: 'Veggie Pizza', price: 450 },
    { image: './various-items/pizza.png', title: 'BBQ Chicken Pizza', price: 550 },
  ],
  Dessert: [
    { image: './various-items/dessert.png', title: 'Chocolate Cake', price: 150 },
    { image: './various-items/dessert.png', title: 'Ice Cream', price: 100 },
    { image: './various-items/dessert.png', title: 'Fruit Tart', price: 200 },
    { image: './various-items/dessert.png', title: 'Cheesecake', price: 250 },
  ],
  "Cold Drinks": [
    { image: './various-items/Cold drinks.png', title: 'Coke', price: 100 },
    { image: './various-items/Cold drinks.png', title: 'Sprite', price: 100 },
    { image: './various-items/Cold drinks.png', title: 'Fanta', price: 100 },
    { image: './various-items/Cold drinks.png', title: 'Pepsi', price: 100 },
  ],
  "Special Combos": [
    { image: './various-items/Special Combo.png', title: 'Combo A', price: 700 },
    { image: './various-items/Special Combo.png', title: 'Combo B', price: 800 },
    { image: './various-items/Special Combo.png', title: 'Combo C', price: 900 },
    { image: './various-items/Special Combo.png', title: 'Combo D', price: 850 },
  ],
};

function MainSection({ menu }) {
  // Get the items for the selected menu, or default to an empty array if no match is found
  const selectedMenuItems = menuItems[menu] || [];

  return (
    <div className="pl-80 py-10 pr-10">
      <div className="border h-[85vh] p-10 flex space-x-28">
        {/* Render the items based on the selected menu */}
        {selectedMenuItems.length > 0 ? (
          selectedMenuItems.map((item, index) => (
            <ItemCard key={index} image={item.image} title={item.title} price={item.price} />
          ))
        ) : (
          <div>No items available for this menu.</div>
        )}
      </div>
    </div>
  );
}

export default MainSection;
