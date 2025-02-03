// src/pages/GamePage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import GameBoard from '../components/GameBoard';

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

  useEffect(() => {
    console.log("État du jeu mis à jour :", gameState); // Vérifier le contenu de gameState
  }, [gameState]);
  

  return (
    <div>
      <h1>Game Page</h1>
      <p><strong>Difficulté :</strong> {difficulty}</p>
      <p><strong>Thème :</strong> {theme}</p>

      {gameState ? (
        <GameBoard gameState={gameState} setGameState={setGameState} />
      ) : (
        <p>Chargement du jeu...</p>
      )}
    </div>
  );
};

export default GamePage;