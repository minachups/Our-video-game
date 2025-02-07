import React from 'react';
import axios from 'axios';
import Card from './cards/Card'; // Importation du composant Card

const GameBoard = ({ gameState, setGameState, difficulty }) => {
  const handleFlipCard = async (index) => {
    try {
      const res = await axios.post('http://localhost:5000/flip-card', { index });
      setGameState(res.data);
    } catch (error) {
      console.error("Erreur lors du retournement de la carte", error);
    }
  };

  // Définition des tailles de grille selon la difficulté
  const gridSizes = {
    easy: { cols: 6, rows: 5 },  // 30 cartes (6x5)
    medium: { cols: 8, rows: 5 }, // 40 cartes (8x5)
    hard: { cols: 9, rows: 6 },   // 54 cartes (9x6)
  };

  const { cols, rows } = gridSizes[difficulty] || gridSizes.easy; 

  return (
    <div>
  
      <div
        className="board"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 100px)`,
          gridTemplateRows: `repeat(${rows}, 100px)`,
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        {gameState.cards.map((card, index) => (
          <Card key={index} card={card} index={index} handleFlipCard={handleFlipCard} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;