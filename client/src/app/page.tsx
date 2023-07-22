'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Welcome from './components/Misc/Welcome';
import { autoLogin } from './pages/api/users';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    autoLogin(dispatch, router);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='landing'>
      <Welcome />
    </div>
  );
}
