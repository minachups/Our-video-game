import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Select_Theme.css';
import Button from '../components/Button_menu/button_menu.jsx';
import Checkbox from '../components/Checkbox/checkbox.jsx';

function Select_Theme() {
  const [musicOn, setMusicOn] = useState(true);
  const navigate = useNavigate();

  const handleMusicToggle = () => {
    setMusicOn(!musicOn);
  };

  const handleSoloClick = () => {
    navigate('/select-difficulty', { state: { mode: 'SOLO' } });
  };

  const handleMultiClick = () => {
    navigate('/select-difficulty', { state: { mode: 'MULTI' } });
  };

  return (
    <div className="menu-container">
      <div className="menu-overlay">
        <h1>SELECT MODE</h1>
        <div>
          <div className="buttons">
            <Button onClick={handleSoloClick}>SOLO</Button>
            <Button onClick={handleMultiClick}>MULTI</Button>
          </div>
          <Checkbox 
            musicOn={musicOn} 
            handleMusicToggle={handleMusicToggle} 
            textColor={musicOn ? 'white' : 'grey'} 
          />
        </div>
      </div>
    </div>
  );
}

export default Select_Theme;
