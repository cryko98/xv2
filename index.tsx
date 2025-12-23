
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Nem található a 'root' elem!");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("React render hiba:", err);
    rootElement.innerHTML = `<div style="color:red; padding:20px;">React betöltési hiba: ${err}</div>`;
  }
}
