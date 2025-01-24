import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook pour la navigation
import './Menu.css';
import Button from '../components/Button_menu/button_menu.jsx';
import Checkbox from '../components/Checkbox/checkbox.jsx';

function Menu() {
  const [musicOn, setMusicOn] = useState(true); // État de la musique
  const navigate = useNavigate(); // Hook pour la navigation

  // Fonction pour inverser l'état de la musique
  const handleMusicToggle = () => {
    setMusicOn(!musicOn);
  };

  // Fonction pour rediriger vers la page Select_Theme
  const handleStartClick = () => {
    navigate('/select-theme');
  };

  return (
    <div className="menu-container">
      <div className="menu-overlay">
        <h1>MEMORY GAME</h1>
        <div>
          <div className="buttons">
            {/* Bouton START avec redirection */}
            <Button onClick={handleStartClick}>
              START
            </Button>
            <Button>
              SHOP
            </Button>
          </div>
          {/* Composant Checkbox avec changement dynamique de couleur de texte */}
          <Checkbox 
            musicOn={musicOn} 
            handleMusicToggle={handleMusicToggle} 
            textColor={musicOn ? 'white' : 'grey'}  // Applique une couleur selon l'état de la musique
          />
        </div> 
      </div>
    </div>
  );
}

export default Menu;
