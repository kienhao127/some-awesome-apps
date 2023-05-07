import { DEFAULT_LANGUAGE } from '@/utils/const';
import React from 'react';

interface AppContextType {
  language: string;
  changeLanguage: (newLanguage: string) => void;
}

export const AppContext = React.createContext<AppContextType>({
  language: DEFAULT_LANGUAGE,
  changeLanguage: () => {},
});
