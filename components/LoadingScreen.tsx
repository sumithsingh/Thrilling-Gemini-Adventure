
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "The mists of fate are swirling...",
  "Forging your path in the digital ether...",
  "Painting your world with pixels and light...",
  "Consulting the ancient algorithms...",
  "The AI Dungeon Master is thinking...",
];

interface LoadingScreenProps {
  lastImage?: string | null;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ lastImage }) => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full relative">
       {lastImage && (
         <div 
          className="absolute inset-0 bg-cover bg-center filter blur-md scale-110"
          style={{ backgroundImage: `url(${lastImage})`}}
         ></div>
       )}
       <div className="relative z-10 flex flex-col items-center justify-center bg-black/60 p-8 rounded-lg">
          <svg className="animate-spin h-12 w-12 text-amber-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl font-semibold text-gray-200 animate-pulse-slow">{message}</p>
       </div>
    </div>
  );
};

export default LoadingScreen;
