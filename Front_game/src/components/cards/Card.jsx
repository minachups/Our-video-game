import React from 'react';
import "./cards.css";

const Card = ({ card, index, handleFlipCard }) => {
  return (
    <div
      key={index}
      className={`card ${card.flipped ? 'flipped' : ''}`}
      onClick={() => handleFlipCard(index)}
      
    >
      {card.flipped ? (
        <img
          src={`http://localhost:5000/${card.value}`} 
          alt={`Carte ${index}`}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <img
          src={`http://localhost:5000/${card.imageUrl}`}  
          alt="Carte non retournée"
          style={{ objectFit: 'contain' }}
        />
      )}
    </div>
  );
};

export default Card;
