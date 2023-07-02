'use client';

import './styles.scss';
import { Roboto } from 'next/font/google';
import { CssBaseline } from '@mui/material';
import { CustomThemeProvider } from '../utils/ThemeContext';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { store } from './store';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

const queryClient = new QueryClient();

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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
          <CssBaseline />
          <html lang='en'>
            <body className={roboto.className}>{children}</body>
          </html>
        </CustomThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
