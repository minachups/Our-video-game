import React, { useState } from 'react';

function Menu() {

  return (
    <div className="menu-container">
      <img src={wallpaper_menu}/>
      <div className="menu-overlay">
        <h1>MEMORY GAME</h1>
        <div>
            <div className = "buttons">
            <button>START</button>
            <button>SHOP</button>
            </div>
            <div className="music-toggle">
              <label htmlFor="music-checkbox">Music On</label>
              <input
                  type="checkbox"
                  id="music-checkbox"
                  checked={musicOn}
                  onChange={handleMusicToggle}
              />
            </div>
        </div> 
      </div>
    </div>
  );
}
export default Menu;