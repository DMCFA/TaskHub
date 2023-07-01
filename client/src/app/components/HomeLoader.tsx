import Image from 'next/image';

export default function HomeLoader() {
  return (
    <div className='home-loader'>
      <figure className='home-loader__logo'>
        <Image
          src='/img/logo-no-background-cropped.svg'
          className='login__web-image login__logo'
          priority
          width={250}
          height={250}
          alt='company logo'
        />
      </figure>
      <div className='home-loader__loading'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
