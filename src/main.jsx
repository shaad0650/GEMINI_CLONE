import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Your CSS file
import ContextProvider from './context/context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
