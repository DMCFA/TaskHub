import { usePathname } from 'next/navigation';
import { useCallback, useContext } from 'react';
import { ThemeContext } from '../../../lib/ThemeContext';
import { IconButton } from '@mui/material';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import Image from 'next/image';
import { removeSymbolsFromPath } from '../../../lib/stringManipulation';
import Link from 'next/link';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const path = usePathname();

  const formatPathname = useCallback(() => {
    return removeSymbolsFromPath(path);
  }, [path]);

  return (
    <nav className='nav'>
      <div className='nav__container'>
        <div className='nav__container-left'>
          <Link href='/dashboard'>
            <figure className='nav__logo'>
              <Image
                src='/img/logo-no-background-cropped.svg'
                className='nav__logo-image'
                priority
                width={80}
                height={80}
                alt='company logo'
              />
            </figure>
          </Link>
          <h2 className='nav__heading'>{formatPathname()}</h2>
        </div>
        <div className='nav__container-right'>
          <IconButton
            sx={{ fontSize: '2rem' }}
            onClick={toggleTheme}
            color='inherit'
            className='nav__icon-btn'
            data-theme={theme}
          >
            {theme === 'dark' ? <MdDarkMode /> : <MdOutlineLightMode />}
          </IconButton>
          <IconButton
            className='nav__btn'
            sx={{ fontSize: '2rem' }}
            color='inherit'
          >
            <FaRegUser />
          </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
