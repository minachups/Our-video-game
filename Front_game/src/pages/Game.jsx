import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Game.css';

const Card = ({ id, src, onClick, isVisible }) => (
  <div className="case" onClick={() => onClick(id)}>
    <img id={`img${id}`} src={src} style={{ visibility: isVisible ? 'visible' : 'hidden' }} />
  </div>
);

function Game() {
  const [cards, setCards] = useState([]);
  const [prev, setPrev] = useState(-1);
  const [waiting, setWaiting] = useState(0);
  const [imgPairs, setImgPairs] = useState(0);
  const [congratsMsg, setCongratsMsg] = useState('');

  useEffect(() => {
    initGame();
  }, []);

  const initGame = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cartes');
      const initialCards = response.data.map(card => ({
        id: card.ID_cartes,
        src: card.URL_Image, // Assurez-vous que votre API renvoie l'URL de l'image
        isVisible: false
      }));
      
      setCards(initialCards);
      setImgPairs(0);
      setCongratsMsg('');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du jeu:', error);
    }
  };

  const clic = async (n) => {
    if (waiting !== 1) {
      const newCards = [...cards];
      const currentCard = newCards[n - 1];
      currentCard.isVisible = true;
      setCards(newCards);

      if (prev < 0) {
        setPrev(n);
      } else {
        const prevCard = newCards[prev - 1];
        if (prevCard.src === currentCard.src) {
          setImgPairs(imgPairs + 1);
          if (imgPairs + 1 === cards.length / 2) {
            setCongratsMsg("Congrats you won the game");
            try {
              await axios.post('http://localhost:8080/api/parties', { 
                // Ajoutez ici les données de la partie à envoyer au serveur
              });
            } catch (error) {
              console.error('Erreur lors de l\'enregistrement de la partie:', error);
            }
            setTimeout(initGame, 800);
          }
        } else {
          setWaiting(1);
          setTimeout(() => {
            prevCard.isVisible = false;
            currentCard.isVisible = false;
            setCards(newCards);
            setWaiting(0);
          }, 800);
        }
        setPrev(-1);
      }
    }
  };

  return (
    <div>
      <h1>Jeu de memory</h1>
      <span id="congratsMsg">{congratsMsg}</span>
      <div className="jeu">
        {cards.map((card, index) => (
          <React.Fragment key={card.id}>
            <Card {...card} onClick={clic} />
            {(index + 1) % 4 === 0 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Game;
