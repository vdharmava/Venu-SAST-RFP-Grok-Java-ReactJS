import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Vuln 38: CWE-200 - Information Exposure
console.log("Frontend initialized with key: hardcoded_key_123");
