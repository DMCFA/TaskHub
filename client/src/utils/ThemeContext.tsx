import { createContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const lightTheme = createTheme();
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

export const CustomThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const activeTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
