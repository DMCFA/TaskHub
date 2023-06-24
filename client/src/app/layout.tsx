'use client';

import './styles.scss';
import { Roboto } from 'next/font/google';
import { CssBaseline } from '@mui/material';
import { CustomThemeProvider } from '../utils/ThemeContext';

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
        <body className={roboto.className}>{children}</body>
      </html>
    </CustomThemeProvider>
  );
}
