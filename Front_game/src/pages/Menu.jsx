import React, { useState } from 'react';
import './Menu.css';
import Button from '../components/Button_menu/button_menu.jsx';
import Checkbox from '../components/Checkbox/checkbox.jsx';

function Menu() {
  const [musicOn, setMusicOn] = useState(true);

  const handleMusicToggle = () => {
    setMusicOn(!musicOn);
  };

  return (
    <div className="menu-container">
      <div className="menu-overlay">
        <h1>MEMORY GAME</h1>
        <div>
            <div className = "buttons">
              
              <Button>
                START
              </Button>
              <Button>
                SHOP
              </Button>
            </div>
            <Checkbox musicOn={musicOn} handleMusicToggle={handleMusicToggle} />
        </div> 
      </div>
    </div>
  );
}

export default Menu;