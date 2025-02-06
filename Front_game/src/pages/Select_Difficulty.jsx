import React from 'react';
import './Select_Difficulty.css';
import Button from '../components/Button_menu/button_menu.jsx';
import { useNavigate } from 'react-router-dom';

function Select_Difficulty() {
  const navigate = useNavigate();

  const handleDifficultySelection = (difficulty) => {
    navigate(`/select-theme-real?difficulty=${difficulty}`); // On passe la difficulté dans l'URL
  };

  return (
    <div className="menu-container">
      <div className="menu-overlay">
        <h1>SELECT DIFFICULTY</h1>
        <div className="buttons">
          <Button onClick={() => handleDifficultySelection('easy')}>EASY</Button>
          <Button onClick={() => handleDifficultySelection('medium')}>MEDIUM</Button>
          <Button onClick={() => handleDifficultySelection('hard')}>HARD</Button>
        </div>
      </div>
    </div>
  );
}

export default Select_Difficulty;