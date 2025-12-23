
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Fatal Render Error:", error);
    container.innerHTML = `<div style="color:white; text-align:center; padding:50px;">React Error: ${error}</div>`;
  }
}
