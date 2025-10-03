import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'; // Import the new CSS file
import App from './app.jsx'; // Import the renamed App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
