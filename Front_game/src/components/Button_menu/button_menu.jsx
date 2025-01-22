import React, { useState } from 'react';
import './button_menu.css';


const Button = ({ onClick, children }) => {
  return (
    <button className="gradient-border-mask" onClick={onClick}>
      {children}
    </button>
    
  );
};


export default Button;