import React from 'react';
import Card from './Card'; // Ensure you have the correct import for the Card component
import OurMenu from './OurMenu';

function CardSection({ onCardClick, menu, setMenu }) {
  return (
    <div className="mt-10 mx-auto max-w-screen-2xl">
      <div className="flex flex-wrap justify-evenly gap-6">
        <Card imageUrl="./various-items/Burger.png" title="Burger" onClick={onCardClick} setMenu={setMenu} />
        <Card imageUrl="./various-items/dessert.png" title="Dessert" onClick={onCardClick} setMenu={setMenu} />
        <Card imageUrl="./various-items/Cold drinks.png" title="Cold Drinks" onClick={onCardClick} setMenu={setMenu} />
        <Card imageUrl="./various-items/pizza.png" title="Pizza" onClick={onCardClick} setMenu={setMenu} />
        <Card imageUrl="./various-items/Special Combo.png" title="Special Combos" onClick={onCardClick} setMenu={setMenu} />
      </div>
      <OurMenu onMenuClick={onCardClick} /> {/* Pass the same function here */}
    </div>
  );
}

export default CardSection;
