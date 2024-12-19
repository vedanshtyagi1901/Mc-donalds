import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';

function MainSection({ menu }) {
  // Declare all state variables first
  const [Burger1, setBurger1] = useState(0);
  const [Burger2, setBurger2] = useState(0);
  const [Burger3, setBurger3] = useState(0);
  const [Burger4, setBurger4] = useState(0);

  const [Dessert1, setDessert1] = useState(0);
  const [Dessert2, setDessert2] = useState(0);
  const [Dessert3, setDessert3] = useState(0);
  const [Dessert4, setDessert4] = useState(0);

  const [Cold_Drink1, setCold_Drink1] = useState(0);
  const [Cold_Drink2, setCold_Drink2] = useState(0);
  const [Cold_Drink3, setCold_Drink3] = useState(0);
  const [Cold_Drink4, setCold_Drink4] = useState(0);

  const [Pizza1, setPizza1] = useState(0);
  const [Pizza2, setPizza2] = useState(0);
  const [Pizza3, setPizza3] = useState(0);
  const [Pizza4, setPizza4] = useState(0);

  const [SpecialCombo1, setSpecialCombo1] = useState(0);
  const [SpecialCombo2, setSpecialCombo2] = useState(0);
  const [SpecialCombo3, setSpecialCombo3] = useState(0);
  const [SpecialCombo4, setSpecialCombo4] = useState(0);

  // Declare the menuItems JSON object with getter and setter
  const menuItems = {
    Burger: [
      { image: './various-burgers/burger1.png', title: 'Margreta', price: 300, getter: Burger1, setter: setBurger1 },
      { image: './various-burgers/burger2.png', title: 'Cheeseburger', price: 350, getter: Burger2, setter: setBurger2 },
      { image: './various-burgers/burger3.png', title: 'Chicken Burger', price: 400, getter: Burger3, setter: setBurger3 },
      { image: './various-burgers/burger4.png', title: 'Veggie Burger', price: 250, getter: Burger4, setter: setBurger4 },
    ],
    Pizza: [
      { image: './various-pizzas/pizza1.png', title: 'Margherita Pizza', price: 500, getter: Pizza1, setter: setPizza1 },
      { image: './various-pizzas/pizza2.png', title: 'Pepperoni Pizza', price: 600, getter: Pizza2, setter: setPizza2 },
      { image: './various-pizzas/pizza3.png', title: 'Veggie Pizza', price: 450, getter: Pizza3, setter: setPizza3 },
      { image: './various-pizzas/pizza4.png', title: 'BBQ Chicken Pizza', price: 550, getter: Pizza4, setter: setPizza4 },
    ],
    Dessert: [
      { image: './various-desserts/chocolate-cake.png', title: 'Chocolate Cake', price: 150, getter: Dessert1, setter: setDessert1 },
      { image: './various-desserts/ice-cream.png', title: 'Ice Cream', price: 100, getter: Dessert2, setter: setDessert2 },
      { image: './various-desserts/fruit-chart.png', title: 'Fruit Tart', price: 200, getter: Dessert3, setter: setDessert3 },
      { image: './various-desserts/cheese-cake.png', title: 'Cheesecake', price: 250, getter: Dessert4, setter: setDessert4 },
    ],
    "Cold Drinks": [
      { image: './various-cold-drinks/Coke.png', title: 'Coke', price: 10, getter: Cold_Drink1, setter: setCold_Drink1 },
      { image: './various-cold-drinks/Mountain_Dew.png', title: 'Mountain DEW', price: 10, getter: Cold_Drink2, setter: setCold_Drink2 },
      { image: './various-cold-drinks/Fanta.png', title: 'Fanta', price: 10, getter: Cold_Drink3, setter: setCold_Drink3 },
      { image: './various-cold-drinks/Pepsi.png', title: 'Pepsi', price: 10, getter: Cold_Drink4, setter: setCold_Drink4 },
    ],
    "Special Combos": [
      { image: './various-items/Special Combo.png', title: 'Combo A', price: 700, getter: SpecialCombo1, setter: setSpecialCombo1 },
      { image: './various-items/Special Combo.png', title: 'Combo B', price: 800, getter: SpecialCombo2, setter: setSpecialCombo2 },
      { image: './various-items/Special Combo.png', title: 'Combo C', price: 900, getter: SpecialCombo3, setter: setSpecialCombo3 },
      { image: './various-items/Special Combo.png', title: 'Combo D', price: 850, getter: SpecialCombo4, setter: setSpecialCombo4 },
    ],
  };

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

  // useEffect to force re-render when item count changes
  useEffect(() => {
    // This effect runs when any of the item counts change
    // It will trigger a re-render of the component
    console.log(Burger1);
    console.log("Item count changed, forcing re-render");
  }, [
    Burger1, Burger2, Burger3, Burger4,
    Dessert1, Dessert2, Dessert3, Dessert4,
    Cold_Drink1, Cold_Drink2, Cold_Drink3, Cold_Drink4,
    Pizza1, Pizza2, Pizza3, Pizza4,
    SpecialCombo1, SpecialCombo2, SpecialCombo3, SpecialCombo4
  ]);

  const handleViewBill = () => {
    alert('View Bill clicked!');
  };

  return (
    <div className="pl-80 py-10 pr-10">
      <div className="h-[85vh] p-10">
        <div className="card-wrapper">
          {selectedMenuItems.length > 0 ? (
            selectedMenuItems.map((item, index) => (
              <div className={`card ${flip ? 'flip' : ''}`} key={item.title}>
                <div className="card-inner">
                  <div className="card-front">
                    <ItemCard 
                      image={item.image} 
                      title={item.title} 
                      price={item.price}
                      count={item.getter} 
                      updateCount={item.setter} 
                    />
                  </div>
                  <div className="card-back">
                    <ItemCard 
                      image={item.image} 
                      title={`${item.title} - Back`} 
                      price={item.price} 
                      count={item.getter} 
                      updateCount={item.setter} 
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No items available for this menu.</div>
          )}
        </div>
        <div className="flex justify-center mt-24">
          <button
            onClick={handleViewBill}
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
          >
            View Bill
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainSection;
