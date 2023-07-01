'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Welcome from './components/Welcome';
import HomeLoader from './components/HomeLoader';
import { loginSuccess } from '../services/features/userSlice';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function autoLogin() {
      try {
        const response = await fetch(
          'http://localhost:3001/api/users/newuser-auth',
          {
            method: 'POST',
            credentials: 'include',
          }
        );
        if (response.status === 200) {
          const userResponse = await response.json();
          const user = userResponse.user;
          dispatch(loginSuccess(user));
          router.push('/dashboard');
        } else {
          console.error('Auto-login failed:', response.status);
        }
      } catch (error) {
        console.error('Error trying to authenticate', error);
      } finally {
        setIsLoading(false);
      }
    }
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='landing'>{isLoading ? <HomeLoader /> : <Welcome />}</div>
  );
}
