'use client';
import { useEffect } from 'react';
import useThemeStore from '@/store/themeStore';

export const ThemeSync = () => {
  const { theme } = useThemeStore();
  
  useEffect(() => {
    const root = window.document.documentElement;
    // classList.toggle පාවිච්චි කිරීම වඩාත් ආරක්ෂිතයි
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null;
};