import React, {useEffect, useState} from 'react';

function ItemCard({ image, title, price, count, updateCount }) {
  // Increment quantity using the provided setter
  const handleIncrement = () => {
    console.log("Incrementing count");  // Log the action
    console.log(count);
    updateCount((prev) => prev + 1);   // Increment the count
  };

  const handleDecrement = () => {
    console.log("Decrementing count");  // Log the action
    if (count > 0) {
      console.log(count)
      updateCount((prev) => prev - 1); // Decrement the count
    }
  };

  // useEffect to force re-render when item count changes
  useEffect(() => {
    // This effect runs when any of the item counts change
    // It will trigger a re-render of the component
    console.log("Item count changed, forcing re-render");
  }, [
    count
  ]);


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

          {/* Quantity Display */}
          <p className="text-lg font-bold text-gray-800">{count}</p>

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
