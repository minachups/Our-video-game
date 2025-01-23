import React, { useState } from 'react';
import './Select_Theme.css';  // Vous pouvez l'utiliser aussi pour le CSS de Theme_Choice.
import Button from '../components/Button_menu/button_menu.jsx';
import Checkbox from '../components/Checkbox/checkbox.jsx';
import { useNavigate } from 'react-router-dom';

function Theme_Choice() {
  const [musicOn, setMusicOn] = useState(true);
  const navigate = useNavigate();  // Hook pour gérer la redirection

  const handleMusicToggle = () => {
    setMusicOn(!musicOn);
  };

  const handleGalaxyClick = () => {
    // Gérer le choix du thème Galaxy
    console.log("Thème Galaxy sélectionné");
  };

  const handleOceanClick = () => {
    // Gérer le choix du thème Ocean
    console.log("Thème Ocean sélectionné");
  };

  return (
    <div className="menu-container">
      <div className="menu-overlay">
        <h1>SELECT THEME</h1>
        <div>
          <div className="buttons">
            {/* Bouton GALAXY */}
            <Button onClick={handleGalaxyClick}>
              GALAXY
            </Button>
            {/* Bouton OCEAN */}
            <Button onClick={handleOceanClick}>
              OCEAN
            </Button>
          </div>

          <div className="theme-button-container">
            {/* Bouton LOCKED, à mettre selon besoin */}
            <Button>
              LOCKED
            </Button>
          </div>

          {/* Composant Checkbox */}
          <Checkbox 
            musicOn={musicOn} 
            handleMusicToggle={handleMusicToggle} 
            textColor={musicOn ? 'white' : 'grey'} 
          />
        </div>
      </div>
    </div>
  );
}

export default Theme_Choice;
