import React from 'react';
import ReactDOM from 'react-dom';
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";
import "grapesjs-component-code-editor/dist/grapesjs-component-code-editor.min.css";
import "tui-image-editor/dist/tui-image-editor.min.css";
import "grapesjs-project-manager/dist/grapesjs-project-manager.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
