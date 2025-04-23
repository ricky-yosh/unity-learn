import React from 'react';
import GameLibrary from './components/game-library/GameLibrary';
import './App.css';

const App = () => {
  // Get the base URL from Vite environment
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <img src={`${baseUrl}unity-full.svg`} alt="Site Logo" />
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#" className="active">Games</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      
      <main className="app-main">
        <GameLibrary />
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Your Game Studio. All rights reserved.</p>
        <p>Powered by React and Unity WebGL</p>
      </footer>
    </div>
  );
};

export default App;