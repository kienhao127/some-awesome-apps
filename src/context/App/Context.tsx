import React from 'react';

interface AppContextType {
  language: string;
  changeLanguage: (newLanguage: string) => void;
}

export const AppContext = React.createContext<AppContextType>({
  language: 'en',
  changeLanguage: () => {},
});
