'use client';

import './styles.scss';
import { Roboto } from 'next/font/google';
import { CssBaseline } from '@mui/material';
import { CustomThemeProvider } from '../lib/ThemeContext';
import { ReactQueryClientProvider } from '../lib/QueryClient';
import { Provider } from 'react-redux';
import { store } from './store';

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
    <ReactQueryClientProvider>
      <Provider store={store}>
        <CustomThemeProvider>
          <CssBaseline />
          <html lang='en'>
            <body className={roboto.className}>{children}</body>
          </html>
        </CustomThemeProvider>
      </Provider>
    </ReactQueryClientProvider>
  );
}
