import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <section className='footer'>
      <div className='footer__container'>
        <figure className='footer__logo'>
          <Image
            src='/img/logo-no-background-cropped.svg'
            className='footer__logo-image'
            priority
            width={90}
            height={90}
            alt='company logo'
          />
        </figure>
        <div className='footer__links'>
          <Link href='/'>About</Link>
          <Link href='/'>Terms and Conditions</Link>
          <Link href='/'>Privacy Policy</Link>
          <Link href='/'>Cookie Policy</Link>
        </div>
        <div className='footer__support'>
          <p>Let&#39;s chat!</p>
          <Link href='/'>hi@taskhub.app</Link>
        </div>
      </div>
    </section>
  );
}
