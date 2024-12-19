import React from 'react';

function ItemCard({ image, title, price }) {
  return (
    <div className="w-48 rounded-lg shadow-lg overflow-hidden bg-white h-72">
      <div className="w-full h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-xl font-bold text-gray-600">${price}</p>
      </div>
    </div>
  );
}

export default ItemCard;
