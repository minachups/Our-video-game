import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; // Importation du style global
import Menu from './pages/Menu.jsx';  // Page Menu
import Select_Theme from './pages/Select_Theme.jsx'; // Page Select_Theme
import Theme_Choice from './pages/Theme_Choice.jsx'; // Page Theme_Choice
import Select_Difficulty from './pages/Select_Difficulty.jsx'; // Page Select_Difficulty

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />  {/* La route pour le menu */}
        <Route path="/select-theme" element={<Select_Theme />} /> {/* La route pour Select_Theme */}
        <Route path="/theme-choice" element={<Theme_Choice />} /> {/* La route pour Theme_Choice */}
        <Route path="/select-difficulty" element={<Select_Difficulty />} /> {/* La route pour Select_Difficulty */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
