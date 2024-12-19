import React, { useState } from 'react';

function ItemCard({ image, title, price }) {
  const [quantity, setQuantity] = useState(0); // Initialize quantity to 0

  // Increment quantity
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrement quantity
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="w-48 rounded-lg shadow-lg overflow-hidden bg-white h-80">
      <div className="w-full h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-xl font-bold text-gray-600">${price}</p>

        {/* Quantity Section */}
        <div className="flex items-center justify-center mt-4 space-x-4">
          {/* Decrement Button */}
          <button
            onClick={handleDecrement}
            className="text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
          >
            -
          </button>
          
          {/* Quantity */}
          <p className="text-lg font-bold text-gray-800">{quantity}</p>
          
          {/* Increment Button */}
          <button
            onClick={handleIncrement}
            className="text-white bg-green-500 hover:bg-green-600 rounded-full w-6 h-6 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
