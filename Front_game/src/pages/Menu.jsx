import React, { useState } from 'react';
import '../styles/Menu.css';
import wallpaper_menu from '../assets/images/wallpaper_menu.png';


function Menu() {
  const [musicOn, setMusicOn] = useState(true);

  const handleMusicToggle = () => {
    setMusicOn(!musicOn);
  };

  return (
    <div className="menu-container">
      <img src={wallpaper_menu}/>
      <div className="menu-overlay">
        <h1>MEMORY GAME</h1>
        <div className = "buttons">
          <button>START</button>
          <button>SHOP</button>
        </div>
        <div className="music-toggle">
          <label htmlFor="music-checkbox">MUSIC</label>
          <input
            type="checkbox"
            id="music-checkbox"
            checked={musicOn}
            onChange={handleMusicToggle}
          />
        </div>
      </div>
    </div>
    
  );
}

export default Menu;