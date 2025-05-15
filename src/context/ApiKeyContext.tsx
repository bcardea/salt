import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType>({
  apiKey: '',
  setApiKey: () => {},
});

interface ApiKeyProviderProps {
  children: ReactNode;
}

export const ApiKeyProvider: React.FC<ApiKeyProviderProps> = ({ children }) => {
  const [apiKey] = useState<string>(import.meta.env.VITE_OPENAI_API_KEY || '');
  
  // Since we're using env variables, this is now a no-op
  const setApiKey = () => {
    console.warn('API key is set via environment variables and cannot be changed at runtime');
  };
  
  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => useContext(ApiKeyContext);