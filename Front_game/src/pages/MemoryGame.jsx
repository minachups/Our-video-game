import React, { useState, useEffect } from 'react';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });

  useEffect(() => {
    fetchGameState();
  }, []);

  const fetchGameState = async () => {
    const response = await fetch('/game');
    const data = await response.json();
    setCards(data.cards);
    setCurrentPlayer(data.currentPlayer);
    setScores(data.scores);
    setFlippedCards(data.flippedCards);
  };

  const flipCard = async (index) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
      await checkCards(index);
    }
  };

  const checkCards = async () => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      const response = await fetch('/flip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardIndex: flippedCards[flippedCards.length - 1] })
      });

      const data = await response.json();
      if (firstCard === secondCard) {
        setScores(prevScores => ({
          ...prevScores,
          [currentPlayer]: prevScores[currentPlayer] + 1,
        }));
      }

      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setFlippedCards([]);
    }
  };

  const startGame = async () => {
    try {
      // Assure-toi que l'URL pointe bien vers le serveur backend sur localhost:8000
      const response = await fetch('http://localhost:8052/start', { method: 'POST' });
  
      // Vérifier que la réponse est bien en JSON
      const data = await response.json();  // Ici, tu peux convertir la réponse en JSON
  
      if (data.success) {
        fetchGameState();  // Récupère l'état du jeu après l'initialisation
      } else {
        console.error("Erreur lors du démarrage du jeu");
      }
    } catch (error) {
      console.error("Erreur de connexion au serveur", error);  // Log l'erreur si la requête échoue
    }
  };
  
  
  

  return (
    <div>
      <h1>Jeu de Mémoire</h1>
      <button onClick={startGame}>Démarrer le jeu</button>

      <div className="game-board" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: '10px' }}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedCards.includes(index) ? 'flipped' : ''}`}
            onClick={() => flipCard(index)}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: flippedCards.includes(index) ? 'lightgreen' : '#ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            {flippedCards.includes(index) ? card : ''}
          </div>
        ))}
      </div>
      <div>
        <h2>Scores</h2>
        <p>Joueur 1: {scores[1]} | Joueur 2: {scores[2]}</p>
      </div>
    </div>
  );
};

export default MemoryGame;
