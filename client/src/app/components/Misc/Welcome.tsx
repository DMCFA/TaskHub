import Link from 'next/link';
import Image from 'next/image';

export default function Welcome() {
  return (
    <section className='welcome'>
      <div className='welcome__container'>
        <figure className='welcome__hero'>
          <Image
            src='/img/homepage-hero.svg'
            alt=''
            width={250}
            height={250}
            priority
            className='welcome__img'
          />
        </figure>
        <div className='welcome__message'>
          <h1>Welcome to TaskHub</h1>
          <p>
            We deliver a great task management experience directly to your door.
          </p>
        </div>
        <div className='welcome__btn-container'>
          <Link href='/sign-up' className='welcome__link'>
            <button className='welcome__btn welcome__btn--sign-up'>
              Get Started
            </button>
          </Link>
          <Link href='/login' className='welcome__link'>
            <button className='welcome__btn welcome__btn--sign-in'>
              I already have an account
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
