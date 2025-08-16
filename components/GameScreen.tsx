
import React from 'react';
import type { Scene } from '../types';

interface GameScreenProps {
  scene: Scene;
  onChoice: (choice: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ scene, onChoice }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <img
          key={scene.imageUrl}
          src={scene.imageUrl}
          alt="Scene illustration"
          className="w-full h-64 md:h-96 object-cover animate-fade-in"
        />
        <div className="p-6 md:p-8">
          <p className="text-gray-300 font-serif text-lg leading-relaxed whitespace-pre-wrap mb-8">
            {scene.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scene.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => onChoice(choice)}
                className="w-full text-left px-6 py-4 bg-gray-700 text-amber-300 font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
