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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 100px)', // Ajustez cette valeur selon la hauteur de votre h1
      padding: '20px'
    }}>
      <div className="scoreboard" style={{
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <p>Joueur 1: {gameState.scores[1]}</p>
        <p>Joueur 2: {gameState.scores[2]}</p>
        <p>Tour: Joueur {gameState.currentPlayer}</p>
      </div>
      <div className="board" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 100px)',
        gap: '10px',
        justifyContent: 'center'
      }}>
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
                src={`http://localhost:5000/${card.value}`} 
                alt={`Carte ${index}`}
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
            ) : (
              <img
                src={`http://localhost:5000/${card.imageUrl}`}  
                alt="Carte non retournée"
                style={{ width: '80px', height: '80px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
