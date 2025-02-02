// src/pages/GamePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Multi_Easy_Galaxy.css';

function Card({ image, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt="Galaxy" />
    </div>
  );
}

const GamePage = () => {
  const [gameState, setGameState] = useState(null);

  // Démarrer une nouvelle partie
  const startGame = async () => {
    try {
      const res = await axios.get('http://localhost:5000/start');
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
  }, []);

  const cards = Array(30).fill('/src/assets/images/planet.png');

  return (
    <div className="multi-easy-galaxy">
      {gameState ? (
        <>
          <h1 className="header">
            <span className="First_header_text">Galaxy Theme</span>
            <span className="Second_header_text">02:30 min</span>
            <span className="Third_header_text">Easy Mode</span>
            <span className="Fourth_header_text">Score: <br /> 12400 XP</span>
          </h1>
          <div className="main-content">
            <div className="grid">
              {cards.map((card, index) => (
                <Card key={index} image={card} />
              ))}
            </div>
          </div>
          <aside className="desk">
            <h2>My Desk</h2>
            <div className="cards"></div>
          </aside>
        </>
      ) : (
        <p>Chargement du jeu...</p>
      )}
    </div>
  );
};

export default GamePage;
