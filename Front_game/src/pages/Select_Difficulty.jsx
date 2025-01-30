import React from 'react';
import './Select_Difficulty.css';
import Button from '../components/Button_menu/button_menu.jsx';
import { useNavigate } from 'react-router-dom';

function Select_Difficulty() {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <div className="menu-overlay">
        <h1>SELECT DIFFICULTY</h1>
        <div className="buttons">
          <Button onClick={() => navigate('/select-theme-real')}>EASY</Button>
          <Button>MEDIUM</Button>
          <Button>HARD</Button>
        </div>
      </div>
    </div>
  );
}

export default Select_Difficulty;
