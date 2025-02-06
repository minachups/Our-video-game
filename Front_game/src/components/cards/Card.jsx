import React from 'react';
import "./cards.css"

const Card = ({ imageSrc, title, description, power }) => {
  return (
    <div className="card">
      <img src={imageSrc} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <p className="card-score">{power}</p>
      </div>
    </div>
  );
};



export default Card;
