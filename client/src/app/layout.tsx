'use client';

import './styles.scss';
import { Roboto } from 'next/font/google';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Nav/Navbar';
import { CustomThemeProvider } from '../utils/ThemeContext';
import { user } from '../store/mock';
import Welcome from './pages/welcome';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata = {
  title: 'TaskHub',
  description: 'Task management app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <html lang='en'>
        {user ? (
          <body className={roboto.className}>
            <header>
              <Navbar />
            </header>
            {children}
          </body>
        ) : (
          <body className={roboto.className}>
            <Welcome />
          </body>
        )}
      </html>
    </CustomThemeProvider>
  );
}
