import React from 'react';
import "./cards.css";

const Card = ({ card, index, handleFlipCard }) => {
  console.log(`Image URL de la carte ${index}: ${card.imageUrl}`);
  return (
    <div
      key={index}
      className={`card ${card.flipped ? 'flipped' : ''}`}
      onClick={() => handleFlipCard(index)}
    >
      {card.flipped ? (
        <img
          src={`http://localhost:5000/public/${card.imageUrl}`}  // Ajoutez 'public/' pour correspondre à la route statique
          alt={`Carte ${index}`}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <img
          src={`http://localhost:5000/public/themes/Space/Card/Back_planet.svg`}  
          alt="Carte non retournée"
          style={{ objectFit: 'contain' }}
        />
      )}
    </div>
  );
};

export default Card;
