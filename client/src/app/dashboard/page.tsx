'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useContext } from 'react';
import { ThemeContext } from '../../lib/ThemeContext';

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <h1 style={{ marginBlock: '10rem', textAlign: 'center' }}>
      {user.user?.fname}
    </h1>
  );
}
