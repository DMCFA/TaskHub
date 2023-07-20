import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useContext,
  useState,
  MouseEvent,
} from 'react';
import { ThemeContext } from '../../../lib/ThemeContext';
import {
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Typography,
} from '@mui/material';
import {
  MdDarkMode,
  MdOutlineLightMode,
  MdNotificationsNone,
  MdOutlineNotificationsActive,
  MdPostAdd,
  MdDoneAll,
} from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { removeSymbolsFromPath } from '../../../lib/stringManipulation';
import HamburgerMenu from './Components/HamburgerMenu';
import SearchBar from './Components/Search';
import SideNav from './SideNav';
import { logout } from '../../pages/api/users';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { readNotification } from '../../pages/api/notifications';

const Navbar = () => {
  const [hamburgerOpened, setHamburgerOpened] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
  const userOpen = Boolean(userAnchorEl);
  const notificationsOpen = Boolean(notificationsAnchorEl);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const path = usePathname();
  const router = useRouter();
  const notifications = useSelector((state: RootState) => state.notifications);
  const isMobile = useMediaQuery('(max-width: 991px)');

  const formatPathname = useCallback(() => {
    return removeSymbolsFromPath(path);
  }, [path]);

  const handleHamburgerClick = () => {
    setHamburgerOpened(!hamburgerOpened);
  };

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleUserClick = (event: MouseEvent<HTMLButtonElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => setUserAnchorEl(null);

  const handleNotificationsClick = (event: MouseEvent<HTMLButtonElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => setNotificationsAnchorEl(null);

  const handleLogout = () => {
    logout(router);
  };

  useEffect(() => {
    if (notifications.hasNotifications) {
      setHasNotifications(true);
    }
  }, [notifications]);

  return (
    <nav className='nav'>
      <div className='nav__container'>
        <div className='nav__container-left'>
          <div className='nav__mobile'>
            <HamburgerMenu
              isOpened={hamburgerOpened}
              handleClick={handleHamburgerClick}
            />
          </div>
          <SideNav
            mobileOpen={hamburgerOpened}
            handleDrawerToggle={handleHamburgerClick}
            isMobile={isMobile}
          />
        </div>
        <div className='nav__container-right'>
          <SearchBar isOpened={searchOpen} handleClick={handleSearchClick} />
          <Link href='/dashboard/add-task'>
            <IconButton
              color='inherit'
              sx={{
                fontSize: '2rem',
                padding: '0.8rem',
                borderRadius: '50%',
                backgroundColor: '#bde0fe',
              }}
              className='nav__add-task'
            >
              <MdPostAdd />
            </IconButton>
          </Link>
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
            color='inherit'
            sx={{ fontSize: '2rem' }}
            onClick={handleNotificationsClick}
            aria-controls={userOpen ? 'notifications-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={notificationsOpen ? 'true' : undefined}
          >
            {hasNotifications ? (
              <Badge
                sx={{ fontSize: '2rem', marginBottom: '0' }}
                badgeContent={
                  notifications.notifications?.filter(
                    (notification) => notification.read_status === 'unread'
                  ).length
                }
                color='error'
              >
                <MdOutlineNotificationsActive />
              </Badge>
            ) : (
              <MdNotificationsNone />
            )}
          </IconButton>
          <Menu
            id='notification-menu'
            anchorEl={notificationsAnchorEl}
            open={notificationsOpen}
            onClose={handleNotificationsClose}
            MenuListProps={{
              'aria-labelledby': 'notifications-menu',
            }}
          >
            {notifications.notifications?.map((notification) => (
              <MenuItem
                key={notification.notification_id}
                className='nav__notification-container'
              >
                <Typography
                  color='inherit'
                  component='p'
                  className={`nav__notification ${
                    notification.read_status === 'unread'
                      ? 'nav__notification--unread'
                      : ''
                  }`}
                >
                  {notification.message}
                </Typography>
                <IconButton
                  edge='end'
                  aria-label='mark as read'
                  onClick={() =>
                    readNotification(
                      notification.notification_id,
                      notification.user_id
                    )
                  }
                >
                  <MdDoneAll />
                </IconButton>
              </MenuItem>
            ))}
          </Menu>
          <IconButton
            className='nav__btn'
            sx={{ fontSize: '2rem' }}
            color='inherit'
            aria-controls={userOpen ? 'user-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={userOpen ? 'true' : undefined}
            onClick={handleUserClick}
          >
            <FaRegUser />
          </IconButton>
          <Menu
            id='user-menu'
            anchorEl={userAnchorEl}
            open={userOpen}
            onClose={handleUserClose}
            MenuListProps={{
              'aria-labelledby': 'user-menu',
            }}
          >
            <MenuItem onClick={handleUserClose}>
              <Link href='/profile'>Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleUserClose}>
              <Link href='/my-account'>My account</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
