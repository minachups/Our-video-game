import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook de navigation
import './Select_Theme.css';
import Button from '../components/Button_menu/button_menu.jsx';
import Checkbox from '../components/Checkbox/checkbox.jsx';

function Select_Theme() {
  const [musicOn, setMusicOn] = useState(true);
  const navigate = useNavigate(); // Hook de redirection

  const handleMusicToggle = () => {
    setMusicOn(!musicOn);
  };

  // Fonction pour rediriger vers la page Select_Difficulty pour le mode SOLO
  const handleSoloClick = () => {
    navigate('/select-difficulty', { state: { mode: 'SOLO' } });
  };

  // Fonction pour rediriger vers la page Select_Difficulty pour le mode MULTI
  const handleMultiClick = () => {
    navigate('/select-difficulty', { state: { mode: 'MULTI' } });
  };

  return (
    <div className="menu-container">
      <div className="menu-overlay">
        <h1>SELECT MODE</h1>
        <div>
          <div className="buttons">
            {/* Bouton SOLO qui redirige vers Select_Difficulty */}
            <Button onClick={handleSoloClick}>
              SOLO
            </Button>

            {/* Bouton MULTI qui redirige vers Select_Difficulty */}
            <Button onClick={handleMultiClick}>
              MULTI
            </Button>
          </div>

          <div className="theme-button-container">
            {/* Bouton "THEMES" qui redirige vers Theme_Choice */}
            <Button onClick={() => navigate('/theme-choice')}>
              THEMES
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

export default Select_Theme;
