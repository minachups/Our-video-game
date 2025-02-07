import React from 'react';
import './Select_Theme_Real.css';
import Button from '../components/Button_menu/button_menu.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

function Select_Theme_Real() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const difficulty = params.get('difficulty'); // Récupération de la difficulté

  // Dictionnaire des thèmes avec leurs IDs
  const themes = {
    galaxy: 1,
    ocean: 2,
    nature: 3
  };

  const handleThemeSelection = (theme) => {
    const themeId = themes[theme]; // Récupère l'ID du thème
    navigate(`/game?difficulty=${difficulty}&themeId=${themeId}`); 
  };

  return (
    <div className="menu-container">
      <div className="menu-overlay">
        <h1>CHOOSE THEME</h1>
        <div className="buttons">
          <Button onClick={() => handleThemeSelection('galaxy')}>GALAXY</Button>
          <Button onClick={() => handleThemeSelection('ocean')}>OCEAN</Button>
          <Button onClick={() => handleThemeSelection('nature')}>NATURE</Button>
        </div>
      </div>
    </div>
  );
}

export default Select_Theme_Real;
