import React from 'react';

function Sidebar({ showSidebar, setShowSidebar, menu, setMenu }) {
  return (
    <div className={`flex flex-col w-72 bg-red-600 text-white h-screen fixed left-0 top-0 rounded-r-xl shadow-xl ${showSidebar ? 'sidebar-slide-in' : ''}`}>
      {/* Logo Section with Image */}
      <div className="flex justify-center items-center p-6">
        <img 
          src="./various-items/images.jpg" // Replace with your actual logo image URL
          alt="Logo"
          className="rounded-full border-4 border-white w-32 h-32 object-cover"
        />
      </div>

      {/* Sidebar Menu */}
      <div className="flex flex-col p-4 space-y-6">
        <button 
          className="flex items-center justify-center space-x-2 hover:bg-red-700 p-2 rounded-lg transition-colors duration-300"
          onClick={() => setMenu("Burger")} // Set menu to Burger on click
        >
          <i className="fas fa-hamburger"></i> {/* Example icon */}
          <span>Burger</span>
        </button>
        
        <button 
          className="flex items-center justify-center space-x-2 hover:bg-red-700 p-2 rounded-lg transition-colors duration-300"
          onClick={() => setMenu("Dessert")} // Set menu to Dessert on click
        >
          <i className="fas fa-cake"></i> {/* Example icon */}
          <span>Dessert</span>
        </button>
        
        <button 
          className="flex items-center justify-center space-x-2 hover:bg-red-700 p-2 rounded-lg transition-colors duration-300"
          onClick={() => setMenu("Cold Drinks")} // Set menu to Cold Drinks on click
        >
          <i className="fas fa-cocktail"></i> {/* Example icon */}
          <span>Cold Drinks</span>
        </button>
        
        <button 
          className="flex items-center justify-center space-x-2 hover:bg-red-700 p-2 rounded-lg transition-colors duration-300"
          onClick={() => setMenu("Pizza")} // Set menu to Pizza on click
        >
          <i className="fas fa-pizza-slice"></i> {/* Example icon */}
          <span>Pizza</span>
        </button>
        
        <button 
          className="flex items-center justify-center space-x-2 hover:bg-red-700 p-2 rounded-lg transition-colors duration-300"
          onClick={() => setMenu("Special Combos")} // Set menu to Special Combos on click
        >
          <i className="fas fa-box"></i> {/* Example icon */}
          <span>Special Combos</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;