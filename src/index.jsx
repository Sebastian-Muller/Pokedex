import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia 'react-dom' por 'react-dom/client'
import App from './App';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Usa createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);