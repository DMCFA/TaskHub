'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useContext } from 'react';
import { ThemeContext } from '../../lib/ThemeContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { autoLogin } from '../pages/api/users';

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (!user.user) {
      autoLogin(dispatch, router);
    }
  }, [user, dispatch, router]);

  if (user.user) {
    return (
      <section className='dashboard'>
        <h1>{user.user.fname}</h1>
        <Link href='/dashboard/add-task'>Add task</Link>
      </section>
    );
  } else {
    return <h1>Loading placeholder</h1>;
  }
}
