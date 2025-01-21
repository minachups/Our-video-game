import React, { useState } from 'react';
import Menu_1 from '../Menu_principal/Menu_principal.jsx';

function Menu() {

  return (
<<<<<<< HEAD
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
    
=======
    <Menu_1/>
>>>>>>> 69a01adcdf7f51b66d4d872084f0d9c54b05881b
  );
}
export default Menu;