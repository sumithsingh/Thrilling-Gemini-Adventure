
import React, { useState, useCallback } from 'react';
import type { GameState, Scene } from './types';
import { GameStatus } from './types';
import { generateAdventureStep } from './services/geminiService';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: GameStatus.START,
    history: [],
    currentScene: null,
    error: null,
  });

  const handleStartGame = useCallback(async () => {
    setGameState(prev => ({ ...prev, status: GameStatus.LOADING, error: null }));
    try {
      const firstScene = await generateAdventureStep([], 'Start a new adventure.');
      setGameState({
        status: GameStatus.PLAYING,
        history: [],
        currentScene: firstScene,
        error: null,
      });
    } catch (err) {
      console.error('Failed to start game:', err);
      setGameState(prev => ({
        ...prev,
        status: GameStatus.ERROR,
        error: err instanceof Error ? err.message : 'An unknown error occurred.',
      }));
    }
  }, []);

  const handleChoice = useCallback(async (choice: string) => {
    if (!gameState.currentScene) return;

    const newHistory = [...gameState.history, gameState.currentScene];
    setGameState(prev => ({
      ...prev,
      status: GameStatus.LOADING,
      history: newHistory,
    }));

    try {
      const nextScene = await generateAdventureStep(
        newHistory.map(s => s.description),
        choice
      );
      setGameState({
        status: GameStatus.PLAYING,
        history: newHistory,
        currentScene: nextScene,
        error: null,
      });
    } catch (err) {
      console.error('Failed to process choice:', err);
      setGameState(prev => ({
        ...prev,
        status: GameStatus.ERROR,
        error: err instanceof Error ? err.message : 'Failed to generate the next step.',
      }));
    }
  }, [gameState.currentScene, gameState.history]);

  const handleRestart = () => {
     setGameState({
        status: GameStatus.START,
        history: [],
        currentScene: null,
        error: null,
     });
  };

  const renderContent = () => {
    switch (gameState.status) {
      case GameStatus.START:
        return <StartScreen onStart={handleStartGame} />;
      case GameStatus.LOADING:
        return <LoadingScreen lastImage={gameState.currentScene?.imageUrl} />;
      case GameStatus.PLAYING:
        return gameState.currentScene ? (
          <GameScreen scene={gameState.currentScene} onChoice={handleChoice} />
        ) : (
          <ErrorScreen message="No scene data available." onRestart={handleRestart} />
        );
      case GameStatus.ERROR:
        return <ErrorScreen message={gameState.error || 'An unexpected error occurred.'} onRestart={handleRestart} />;
      default:
        return <StartScreen onStart={handleStartGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
