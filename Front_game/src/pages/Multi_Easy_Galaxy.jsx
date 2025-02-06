import React, { useEffect } from 'react';
import './Multi_Easy_Galaxy.css';
import Card from '../components/cards/Card.jsx';




function Multi_Easy_Galaxy() {
  // Définir 30 cartes (6x5).
  const cards = Array(30).fill('/src/assets/images/planet.png');

  useEffect(() => {
    // Appliquer une classe pour cette page afin de spécifier l'image de fond
    document.body.classList.add('multi-easy-galaxy-page');
    
    return () => {
      // Lorsqu'on quitte la page, enlever la classe
      document.body.classList.remove('multi-easy-galaxy-page');
    };
  }, []);

  return (
    <div className="multi-easy-galaxy">
      <h1 className="header">
        <span className="First_header_text">Galaxy Theme</span>
        <span className="Second_header_text">02:30 min</span>
        <span className="Third_header_text">Easy Mode</span>
        <span className="Fourth_header_text">Score 12400 XP</span>
         {/* Conteneur du cercle Avatar */}
         <div className="avatar-container">
          <img
            src="/src/assets/images/default-avatar.png"
            alt="User Avatar"
            className="avatar-image"
          />
        </div>
      </h1>
      <div className="main-content">
        <div className="grid">
          {cards.map((card, index) => (
            <Card key={index} image={card} />
          ))}
        </div>
      </div>
      <aside className="desk">
        <h2>My Desk</h2>
        <div className="cards">
        </div>
      </aside>
    </div>
  );
  
}



export default Multi_Easy_Galaxy;
