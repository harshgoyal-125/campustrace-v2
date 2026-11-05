import '@fontsource-variable/inter/wght.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.css';
import './application-theme.css';
import '@fontsource-variable/geist';
import '@fontsource/geist-mono/400.css';
try { const sv = localStorage.getItem('pp_theme'); document.documentElement.dataset.theme = sv ? (sv === 'dark' ? 'dark' : 'light') : 'dark'; } catch (e) { document.documentElement.dataset.theme = 'light'; }
createRoot(document.getElementById('root')).render(<App />);

