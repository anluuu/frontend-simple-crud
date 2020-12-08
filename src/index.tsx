import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import '../node_modules/normalize.css/normalize.css';
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
