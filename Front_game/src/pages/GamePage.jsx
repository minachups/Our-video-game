// src/pages/Multi_Easy_Galaxy.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import GameBoard from '../components/GameBoard'; // Assurez-vous d'importer le composant GameBoard
import './Multi_Easy_Galaxy.css';

function Multi_Easy_Galaxy() {
  const [gameState, setGameState] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const difficulty = params.get('difficulty') || 'easy';
  const theme = params.get('theme') || 'galaxy';

  const startGame = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/start/${difficulty}`);
      setGameState(res.data);
    } catch (error) {
      console.error("Erreur lors du démarrage du jeu", error);
    }
  };

  useEffect(() => {
    startGame();
    document.body.classList.add('multi-easy-galaxy-page');
    
    return () => {
      document.body.classList.remove('multi-easy-galaxy-page');
    };
  }, [difficulty]);

  return (
    <div className="multi-easy-galaxy">
      <nav className="header">
        <span className="First_header_text">{theme.charAt(0).toUpperCase() + theme.slice(1)} Theme</span>
        <span className="Second_header_text">02:30 min</span>
        <span className="Third_header_text">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode</span>
        <span className="Fourth_header_text">Score: <br /> {gameState ? gameState.score : '0'} XP</span>
      </nav>
      <div className="main-content">
        {gameState ? (
          <GameBoard gameState={gameState} setGameState={setGameState} />
        ) : (
          <p>Chargement du jeu...</p>
        )}
      </div>
      <aside className="desk">
        <h2>My Desk</h2>
        <div className="cards">
          {/* Cartes collectées */}
        </div>
      </aside>
    </div>
  );
}

export default Multi_Easy_Galaxy;
