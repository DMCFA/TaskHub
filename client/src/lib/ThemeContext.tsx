import { createContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    lp: true;
  }
}

interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const overrideProperties = createTheme({
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBlockStart: '1.5rem',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 480,
      sm: 768,
      md: 991,
      lp: 1200,
      lg: 1366,
      xl: 1600,
    },
  },
});

const lightTheme = createTheme(overrideProperties);
const darkTheme = createTheme(overrideProperties, {
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
  const getInitialTheme = () => {
    if (typeof localStorage !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      return newTheme;
    });
  };

  const activeTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
