import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Inicializa el estado con el valor guardado en localStorage si existe, de lo contrario false
  const [darkMode, setDarkMode] = useState(() => {
    const localDarkMode = localStorage.getItem('darkMode');
    return localDarkMode !== null ? JSON.parse(localDarkMode) : false;
  });

  // Efecto para guardar el estado del modo oscuro en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};