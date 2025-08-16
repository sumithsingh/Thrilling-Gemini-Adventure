
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center animate-fade-in flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl md:text-7xl font-bold font-serif text-amber-300 mb-4 tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
        Gemini Adventure
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        An epic journey awaits. Every choice you make crafts a new world, a new story, and a new destiny, with visuals brought to life by AI.
      </p>
      <button
        onClick={onStart}
        className="px-8 py-4 bg-amber-500 text-gray-900 font-bold text-xl rounded-lg shadow-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
      >
        Begin Your Adventure
      </button>
    </div>
  );
};

export default StartScreen;
