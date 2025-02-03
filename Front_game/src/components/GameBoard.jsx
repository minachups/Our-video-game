import React from 'react';
import axios from 'axios';

const GameBoard = ({ gameState, setGameState }) => {
  const handleFlipCard = async (index) => {
    try {
      const res = await axios.post('http://localhost:5000/flip-card', { index });
      setGameState(res.data);
    } catch (error) {
      console.error("Erreur lors du retournement de la carte", error);
    }
  };

  return (
    <div>
      <div className="scoreboard">
        <p>Joueur 1: {gameState.scores[1]}</p>
        <p>Joueur 2: {gameState.scores[2]}</p>
        <p>Tour: Joueur {gameState.currentPlayer}</p>
      </div>
      <div className="board" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: '10px' }}>
        {gameState.cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.flipped ? 'flipped' : ''}`}
            onClick={() => handleFlipCard(index)}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: card.flipped ? '#fff' : '#ddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '1px solid #000',
            }}
          >
            {card.flipped ? (
              <img
              src={`http://localhost:5000/${card.value}`}  // Correctement formé
              alt={`Carte ${index}`}
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
            
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
