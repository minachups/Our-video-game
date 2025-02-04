// src/pages/GamePage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import GameBoard from '../components/GameBoard';
import './Multi_Easy_Galaxy.css';

const GamePage = () => {
  const [gameState, setGameState] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const difficulty = params.get('difficulty') || 'easy'; 
  const theme = params.get('theme') || 'default'; 

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
  }, [difficulty]);

  return (
    <div 
      className="multi-easy-galaxy"
      style={{ 
        backgroundImage: 'url(/src/assets/images/wp9998529.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        boxSizing: 'border-box',
        padding: '20px'
      }}>

      <h1 className="header">
        <span className="First_header_text">Galaxy Theme</span>
        <span className="Second_header_text">02:30 min</span>
        <span className="Third_header_text">Easy Mode</span>
        <span className="Fourth_header_text">Score: <br /> 12400 XP</span>
      </h1>
      {gameState ? (
        <GameBoard gameState={gameState} setGameState={setGameState} />
      ) : (
        <p>Chargement du jeu...</p>
      )}
    </div>
  );
};

export default GamePage;

/*
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Multi_Easy_Galaxy.css';

const GamePage = () => {
  const [gameState, setGameState] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const difficulty = params.get('difficulty') || 'easy';
  const theme = params.get('theme') || 'default';

  useEffect(() => {
    const startGame = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/start/${difficulty}`);
        setGameState(res.data);
      } catch (error) {
        console.error("Erreur lors du démarrage du jeu", error);
      }
    };

    startGame();
    document.body.classList.add('multi-easy-galaxy-page');
    return () => {
      document.body.classList.remove('multi-easy-galaxy-page');
    };
  }, [difficulty]);

  const handleFlipCard = async (index) => {
    try {
      const res = await axios.post('http://localhost:5000/flip-card', { index });
      setGameState(res.data);
    } catch (error) {
      console.error("Erreur lors du retournement de la carte", error);
    }
  };

  if (!gameState) {
    return <p>Chargement du jeu...</p>;
  }

  return (
    <div className="multi-easy-galaxy">
      <h1 className="header">
        <span className="First_header_text">{gameState.theme} Theme</span>
        <span className="Second_header_text">02:30 min</span>
        <span className="Third_header_text">{gameState.difficulty} Mode</span>
        <span className="Fourth_header_text">Score: <br /> {gameState.scores[gameState.currentPlayer]} XP</span>
      </h1>
      <div className="main-content">
        <div className="grid">
          {gameState.cards.map((card, index) => (
            <div
              key={index}
              className={`card ${card.flipped ? 'flipped' : ''}`}
              onClick={() => handleFlipCard(index)}
            >
              <img
                src={`http://localhost:5000/${card.flipped ? card.value : card.imageUrl}`}
                alt={`Carte ${index}`}
              />
            </div>
          ))}
        </div>
      </div>
      <aside className="desk">
        <h2>My Desk</h2>
        <div className="cards"></div>
      </aside>
    </div>
  );
};

export default GamePage;
*/