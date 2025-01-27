import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; // Styles globaux

import Menu from './pages/Menu.jsx';
import Select_Theme from './pages/Select_Theme.jsx';
import Select_Difficulty from './pages/Select_Difficulty.jsx';
import Select_Theme_Real from './pages/Select_Theme_Real.jsx';
import Multi_Easy_Galaxy from './pages/Multi_Easy_Galaxy.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/select-theme" element={<Select_Theme />} />
        <Route path="/select-difficulty" element={<Select_Difficulty />} />
        <Route path="/select-theme-real" element={<Select_Theme_Real />} />
        <Route path="/multi-easy-galaxy" element={<Multi_Easy_Galaxy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
