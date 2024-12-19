import React from 'react';

function Card({ imageUrl, title, onClick, setMenu }) {
  return (
    <div 
      className="inline-block w-[180px] rounded-lg overflow-hidden shadow-lg bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl mx-10" 
      onClick={() => {
        onClick(); // Call the onClick event handler
        setMenu(title); // Call setMenu with the title when the card is clicked
      }}
    >
      {/* Image */}
      <img 
        src={imageUrl} 
        alt="Card Image" 
        className="w-[180px] h-[180px] object-cover rounded-t-lg" 
      />

      {/* Card Content */}
      <div className="px-6 py-4">
        {/* Title */}
        <div className="font-semibold text-base text-center text-gray-800">
          {title}
        </div>
      </div>
    </div>
  );
}

export default Card;
