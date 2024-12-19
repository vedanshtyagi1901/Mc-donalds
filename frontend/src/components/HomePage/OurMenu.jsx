import React from 'react';

function OurMenu({ onMenuClick }) {
  return (
    <div className="flex justify-center items-center mt-20">
      <button
        className="bg-red-600 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center"
        onClick={onMenuClick} // Ensure this calls the handler passed as a prop
      >
        {/* Font Awesome Search Icon */}
        <i className="fas fa-search mr-2"></i>
        {/* Text */}
        Explore Our Menu
      </button>
    </div>
  );
}

export default OurMenu;

