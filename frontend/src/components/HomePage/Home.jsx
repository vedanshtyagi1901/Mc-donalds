import React, { useState } from 'react';
import CardSection from './CardSection';
import Sidebar from './Sidebar';
import Heading from './Heading';
import MainSection from './MainSection';


function Home() {
  const [showSidebar, setShowSidebar] = useState(false); // sidebar is not displayed initially
  const [fadeOut, setFadeOut] = useState(false); // No fading of heading and card section occur initially
  const [showContent, setShowContent] = useState(true); // State to hide content after fade out
  const [menu, setMenu] = useState('Burger'); // By default burger will be displayed on menu

  // Function to handle the click event (whether from a card or menu button)
  const handleCardClick = () => {
    setFadeOut(true); // Start fading out the content
    setTimeout(() => {
      setShowContent(false); // Hide content after fade-out completes
      setShowSidebar(true); // Show sidebar after fade-out
    }, 300); // Wait for 300ms before changing content and showing the sidebar
  };

  return (
    <div className="bg-yellow-400 h-screen">

      {/* Conditionally render Heading and CardSection with fade effect */}
      
      {/* This is my heading */}
      <div
        className={`transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        style={{ display: showContent ? 'block' : 'none' }} // Hide content after fade-out
      >
        <Heading />
      </div>

      {/* This is my card section */}
      <div
        className={`transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        style={{ display: showContent ? 'block' : 'none' }} // Hide content after fade-out
      >
        <CardSection onCardClick={handleCardClick} menu={menu} setMenu={setMenu} />
      </div>

      {/* Conditionally render Sidebar with sliding effect */}
      {showSidebar && (<div> <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} menu={menu} setMenu={setMenu} /> </div>)} 
      {showSidebar && (<div> <MainSection menu={menu}/> </div>)} 
      
      
      
      </div>
  );
}

export default Home;