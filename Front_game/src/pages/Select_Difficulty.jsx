import React from 'react';
import { useLocation } from 'react-router-dom'; // Import du hook pour récupérer les paramètres passés dans la redirection
import './Select_Theme.css';
import Button from '../components/Button_menu/button_menu.jsx';

function Select_Difficulty() {
  const location = useLocation(); // Récupération des paramètres de la redirection
  const { mode } = location.state || { mode: 'SOLO' };  // Par défaut SOLO si pas de mode passé

  return (
    <div className="menu-container">
      <div className="menu-overlay">
        <h1>SELECT DIFFICULTY - {mode}</h1> {/* Affiche le mode sélectionné */}
        <div>
          <div className="buttons">
            {/* Boutons pour sélectionner la difficulté */}
            <Button>
              EASY
            </Button>
            <Button>
              MEDIUM
            </Button>
            <Button>
              HARD
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Select_Difficulty;
