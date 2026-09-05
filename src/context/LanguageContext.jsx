'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { content } from '../locales/content';

const LanguageContext = createContext(undefined);

const STORAGE_KEY = 'site-language';

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'es') {
        setLanguageState(stored);
      }
    } catch (e) {
      // localStorage unavailable, keep default
    }
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // localStorage unavailable, ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: content[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
