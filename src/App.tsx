import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
};

export default App;
