import { createContext } from 'react';

export const ThemeContext = createContext({
    darkMode: true,
    setDarkMode: (mode: Boolean) => {},
    theme: 'DarkTheme'
});