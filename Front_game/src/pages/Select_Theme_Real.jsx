import React from 'react';
import './Select_Theme_Real.css';
import Button from '../components/Button_menu/button_menu.jsx';
import { useNavigate } from 'react-router-dom';

function Select_Theme_Real() {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <div className="menu-overlay">
        <h1>CHOOSE THEME</h1>
        <div className="buttons">
          <Button onClick={() => navigate('/multi-easy-galaxy')}>GALAXY</Button>
          <Button>OCEAN</Button>
          <Button>NATURE</Button>
        </div>
      </div>
    </div>
  );
}

export default Select_Theme_Real;

