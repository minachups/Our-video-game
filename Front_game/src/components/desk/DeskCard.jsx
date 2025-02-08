import React from 'react';
import PowerCard from '../power/powerCard.jsx';
import './DeskCard.css';

const DeskCard = ({ powers, handleUsePower }) => {
  return (
    <div className="desk">
      <h2>My Desk</h2>
      <div className="cards">
        {powers.map((power, index) => (
          <PowerCard key={index} power={power} handleUsePower={handleUsePower} />
        ))}
      </div>
    </div>
  );
};

export default DeskCard;
