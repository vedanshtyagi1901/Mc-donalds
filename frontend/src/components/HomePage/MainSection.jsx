import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';

const menuItems = {
  Burger: [
    { image: './various-burgers/burger1.png', title: 'Margreta', price: 300 },
    { image: './various-burgers/burger2.png', title: 'Cheeseburger', price: 350 },
    { image: './various-burgers/burger3.png', title: 'Chicken Burger', price: 400 },
    { image: './various-burgers/burger4.png', title: 'Veggie Burger', price: 250 },
  ],
  Pizza: [
    { image: './various-pizzas/pizza1.png', title: 'Margherita Pizza', price: 500 },
    { image: './various-pizzas/pizza2.png', title: 'Pepperoni Pizza', price: 600 },
    { image: './various-pizzas/pizza3.png', title: 'Veggie Pizza', price: 450 },
    { image: './various-pizzas/pizza4.png', title: 'BBQ Chicken Pizza', price: 550 },
  ],
  Dessert: [
    { image: './various-desserts/chocolate-cake.png', title: 'Chocolate Cake', price: 150 },
    { image: './various-desserts/ice-cream.png', title: 'Ice Cream', price: 100 },
    { image: './various-desserts/fruit-chart.png', title: 'Fruit Tart', price: 200 },
    { image: './various-desserts/cheese-cake.png', title: 'Cheesecake', price: 250 },
  ],
  "Cold Drinks": [
    { image: './various-cold-drinks/Coke.png', title: 'Coke', price: 10 },
    { image: './various-cold-drinks/Mountain_Dew.png', title: 'Mountain DEW', price: 10 },
    { image: './various-cold-drinks/Fanta.png', title: 'Fanta', price: 10 },
    { image: './various-cold-drinks/Pepsi.png', title: 'Pepsi', price: 10 },
  ],
//   insert 's' after 'combo' so that it may work. But right now i have deleted it by intention as this feature is not yet build
  "Special Combo": [
    { image: './various-items/Special Combo.png', title: 'Combo A', price: 700 },
    { image: './various-items/Special Combo.png', title: 'Combo B', price: 800 },
    { image: './various-items/Special Combo.png', title: 'Combo C', price: 900 },
    { image: './various-items/Special Combo.png', title: 'Combo D', price: 850 },
  ],
};

function MainSection({ menu }) {
  const [selectedMenuItems, setSelectedMenuItems] = useState(menuItems[menu] || []);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    // Trigger flip animation when menu changes
    setFlip(true);

    const timer = setTimeout(() => {
      setSelectedMenuItems(menuItems[menu] || []); // Update content after flip
      setFlip(false); // Reset flip animation
    }, 600); // Duration of flip animation

    return () => clearTimeout(timer); // Clean up timer
  }, [menu]);

  return (
    <div className="pl-80 py-10 pr-10">
<div className="h-[85vh] p-10">
<div className="card-wrapper">
          {selectedMenuItems.length > 0 ? (
            selectedMenuItems.map((item, index) => (
              <div className={`card ${flip ? 'flip' : ''}`} key={index}>
                <div className="card-inner">
                  {/* Front side of the card */}
                  <div className="card-front">
                    <ItemCard image={item.image} title={item.title} price={item.price} />
                  </div>

                  {/* Back side of the card with new items */}
                  <div className="card-back">
                    <ItemCard image={item.image} title={`${item.title} - Back`} price={item.price} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No items available for this menu.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainSection;