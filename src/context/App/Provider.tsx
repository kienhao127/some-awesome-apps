import React, { useState } from "react";
import { AppContext } from "./Context";
import useLocalStorage from "@/hooks/useLocalStorage";
import { DEFAULT_LANGUAGE, SELECTED_LANGUAGE_KEY } from "@/utils/const";
import { useRouter } from "next/router";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<string>(
    SELECTED_LANGUAGE_KEY,
    DEFAULT_LANGUAGE
  );
  const router = useRouter();

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    router.push(router.pathname, router.asPath, { locale: newLanguage });
  };

  return (
    <AppContext.Provider value={{ language, changeLanguage }}>
      {children}
    </AppContext.Provider>
  );
};
