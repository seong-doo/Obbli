import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Topnavigation from './components/topNavigation';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <Topnavigation />
      </nav>
      <body>
        hello, world
      </body>
    </div>
  );
}

export default App;
