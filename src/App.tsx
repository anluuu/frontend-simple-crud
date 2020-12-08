import React from 'react';
import './App.css';
import AppProvider from './hooks';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Login />
    </AppProvider>
  );
};

export default App;
