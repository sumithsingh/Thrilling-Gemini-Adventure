
import React from 'react';

interface ErrorScreenProps {
  message: string;
  onRestart: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRestart }) => {
  return (
    <div className="text-center animate-fade-in flex flex-col items-center justify-center h-screen bg-red-900/20 p-8 rounded-lg">
      <h2 className="text-4xl font-bold text-red-400 mb-4">An Error Occurred</h2>
      <p className="text-lg text-gray-300 max-w-lg mb-8 bg-gray-800 p-4 rounded-md border border-red-500">
        {message}
      </p>
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-amber-500 text-gray-900 font-bold text-xl rounded-lg shadow-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorScreen;
