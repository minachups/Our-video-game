import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameBoard from './GameBoard.jsx';

const App = () => {
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

  // Lancer la partie dès le début
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div>
      <h1>Jeu de Mémoire</h1>
      {gameState ? (
        <div>
          <GameBoard gameState={gameState} setGameState={setGameState} />
        </div>
      ) : (
        <button onClick={startGame}>Démarrer une nouvelle partie</button>
      )}
    </div>
  );
};

export default App;
