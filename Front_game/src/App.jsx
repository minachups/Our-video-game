import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; // Importation du style global

import Menu from './pages/Menu.jsx';  // Page Menu

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />  {/* La route pour le menu */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
