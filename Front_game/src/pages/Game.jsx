import React, { useState, useEffect } from 'react';
import '../CSS/Game.css';

const Card = ({ id, src, onClick, isVisible }) => (
  <div className="case" onClick={() => onClick(id)}>
    <img id={`img${id}`} src={src} style={{ visibility: isVisible ? 'visible' : 'hidden' }} />
  </div>
);

function App() {
  const [cards, setCards] = useState([]);
  const [prev, setPrev] = useState(-1);
  const [waiting, setWaiting] = useState(0);
  const [imgPairs, setImgPairs] = useState(0);
  const [congratsMsg, setCongratsMsg] = useState('');

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const initialCards = Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      src: `https://picsum.photos/20${i + 1}`,
      isVisible: false
    }));
    
    for (let i = 0; i < 200; i++) {
      const n1 = Math.floor(Math.random() * 16);
      const n2 = Math.floor(Math.random() * 16);
      [initialCards[n1].src, initialCards[n2].src] = [initialCards[n2].src, initialCards[n1].src];
    }
    
    setCards(initialCards);
    setImgPairs(0);
    setCongratsMsg('');
  };

  const clic = (n) => {
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

export default App;
