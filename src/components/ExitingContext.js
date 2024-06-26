"use client"

import { createContext, useContext, useState } from 'react';

const ExitingContext = createContext();

export const ExitingProvider = ({ children }) => {
  const [isExiting, setIsExiting] = useState(false);

  return (
    <ExitingContext.Provider value={{ isExiting, setIsExiting }}>
      {children}
    </ExitingContext.Provider>
  );
};

export const useExiting = () => {
  const context = useContext(ExitingContext);
  return context;
};