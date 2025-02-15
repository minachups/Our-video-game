import React from 'react';
import './navbar.css'; 

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="theme-info">
          <h2>themeName</h2>
          <p>Difficulté: difficulty</p>
        </div>
      </div>

      <div className="navbar-center">
        <h2>Score: score</h2>
        <p>Temps: formatTime(gameTime)</p>
      </div>
      
      <div className="navbar-right">
      <img src="" alt="themeName" className="theme-image" />
      </div>
    </div>
  );
};

export default Navbar;
