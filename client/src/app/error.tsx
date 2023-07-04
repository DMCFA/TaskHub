'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error later to error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='error'>
      <h2 className='error__heading'>
        Couldn&apos;t find the page you&apos;re looking for
      </h2>
      <Image
        width={300}
        height={300}
        className='error__image'
        src='/img/error-animation.gif'
        priority
        alt=''
      />
      <div className='error__btn-container'>
        <button className='error__reset-btn' onClick={() => reset()}>
          Try again
        </button>
        <button className='error__home-link'>
          <Link href='/'>Back to homepage</Link>
        </button>
      </div>
    </div>
  );
}
