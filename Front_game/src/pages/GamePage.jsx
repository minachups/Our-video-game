// src/pages/GamePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameBoard from '../components/GameBoard';  // Composant de l'affichage du jeu

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
  }, []);

  return (
    <div>
      {gameState ? (
        <GameBoard gameState={gameState} setGameState={setGameState} />
      ) : (
        <p>Chargement du jeu...</p>
      )}
    </div>
  );
};

export default GamePage;

