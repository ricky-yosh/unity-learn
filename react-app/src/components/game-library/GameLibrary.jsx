import React, { useState } from 'react';
import UnityGamePlayer from '../unity-game-player/UnityGamePlayer';
import './GameLibrary.css';

// Sample game library data - in a real app, you might fetch this from an API
const GAMES = [
  {
    id: 'essentials-project',
    title: 'Essentials Project',
    description: 'A sample Unity project showcasing essential features.',
    // Using a relative path that will be prefixed with BASE_URL during build
    thumbnail: 'unity-builds/essentials-project/thumbnail.png',
    width: 1280,
    height: 720
  },
  // Add more games as you create them
];

const GameLibrary = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  // Get the base URL from Vite environment
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Show game selection screen
  const showGameSelection = () => {
    setSelectedGame(null);
  };
  
  // Launch a specific game
  const launchGame = (gameId) => {
    const game = GAMES.find(g => g.id === gameId);
    if (game) {
      setSelectedGame(game);
    }
  };
  
  // If a game is selected, display it
  // Inside GameLibrary.jsx, modify the selectedGame section:
  if (selectedGame) {
    return (
      <div className="game-container">
        <div className="game-header">
          <button className="back-button" onClick={showGameSelection}>
            &larr; Back to Library
          </button>
          <h1>{selectedGame.title}</h1>
        </div>
        
        {/* Remove the unity-wrapper div and use a fixed size container */}
        <div style={{ 
          width: '100%', 
          height: '600px', 
          margin: '0 auto',
          maxWidth: selectedGame.width + 'px'
        }}>
          <UnityGamePlayer 
            gameId={selectedGame.id}
            gameTitle={selectedGame.title}
            width={selectedGame.width}
            height={selectedGame.height}
          />
        </div>
      </div>
    );
  }
  
  // Otherwise, show the game selection screen
  return (
    <div className="game-library">
      <h1>Unity Game Library</h1>
      <p>Select a game to play:</p>
      
      <div className="game-grid">
        {GAMES.map(game => (
          <div 
            key={game.id} 
            className="game-card" 
            onClick={() => launchGame(game.id)}
          >
            <div className="game-thumbnail">
              <img 
                src={`${baseUrl}${game.thumbnail}`} 
                alt={game.title}
                onError={(e) => {
                  e.target.src = `${baseUrl}placeholder-image.png`;
                }}
              />
            </div>
            <div className="game-info">
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              <button className="play-button">Play Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLibrary;