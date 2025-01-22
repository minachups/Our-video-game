import React from 'react';
import './checkbox.css';

const Checkbox = ({ musicOn, handleMusicToggle }) => {
  return (
    <div className="music-toggle">
        <p>{musicOn ? "Music is ON" : "Music is OFF"}</p>
        <div className="checkbox-gradient-border-mask">
          <input
            type="checkbox"
            id="music-checkbox"
            checked={musicOn}
            onChange={handleMusicToggle}
          />
        </div>
    </div>
  );
};

export default Checkbox;
