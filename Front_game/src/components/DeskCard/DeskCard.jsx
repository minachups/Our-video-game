import React from 'react';
import './DeskCard.css';

function DeskCard({ title, image, score, description }) {
  return (
    <div className="desk">
      <h2>{title}</h2>
      <img src={image} alt="icon" className="desk-icon" />
      <p className="score">Score: {score}</p>
      <p className="description">{description}</p>
    </div>
  );
}

export default DeskCard;
