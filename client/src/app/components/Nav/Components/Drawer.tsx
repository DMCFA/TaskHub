import Link from 'next/link';
import Image from 'next/image';
import {
  Collapse,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { IoPeopleOutline } from 'react-icons/io5';
import { TbReportSearch } from 'react-icons/tb';
import { GrHome, GrChat, GrProjects } from 'react-icons/gr';
import { AiOutlineCheckSquare, AiOutlineCalendar } from 'react-icons/ai';
import { MdExpandMore, MdExpandLess, MdOutlineWork } from 'react-icons/md';

interface DrawerProps {
  handleClick: () => void;
  open: boolean;
}

export const navItemData = [
  { text: 'Home', href: '/dashboard', icon: <GrHome /> },
  {
    text: 'My Tasks',
    href: '/dashboard/tasks',
    icon: <AiOutlineCheckSquare />,
  },
  {
    text: 'My Plan',
    href: '/dashboard/plan',
    icon: <AiOutlineCalendar />,
  },
  {
    text: 'Inbox',
    href: '/dashboard/inbox',
    icon: <GrChat />,
  },
  {
    text: 'People',
    href: '/dashboard/team',
    icon: <IoPeopleOutline />,
  },
  {
    text: 'Reporting',
    href: '/dashboard/reports',
    icon: <TbReportSearch />,
  },
];

const favoritesNavList = ['Web Development', 'Microservices', 'Maps'];

export default function CustomDrawer({ handleClick, open }: DrawerProps) {
  return (
    <div className='drawer'>
      <Toolbar>
        <div className='drawer__logo'>
          <Link href='/dashboard'>
            <figure className='drawer__logo'>
              <Image
                src='/img/logo-no-background-cropped.svg'
                className='drawer-image'
                priority
                width={60}
                height={60}
                alt='company logo'
              />
            </figure>
          </Link>
        </div>
      </Toolbar>
      <Divider />
      <List>
        {navItemData.map((item) => (
          <ListItem key={item.text} disablePadding>
            <IconButton
              color='inherit'
              className='drawer__icon-button'
              sx={{
                borderRadius: '0.3rem',
                width: '100%',
                textAlign: 'initial',
              }}
            >
              <Link href={item.href}>
                <ListItemIcon sx={{ color: 'rgba(0,0,0,1)' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  className='drawer__text'
                  primary={item.text}
                  primaryTypographyProps={{ fontSize: '1.1rem' }}
                />
              </Link>
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemText
            primary='Projects'
            primaryTypographyProps={{ fontWeight: '600', fontSize: '1.2rem' }}
          />
          {open ? <MdExpandLess /> : <MdExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {favoritesNavList.map((item, index) => (
              <ListItem key={item} disablePadding>
                <IconButton
                  color='inherit'
                  sx={{
                    borderRadius: '0.3rem',
                    width: '100%',
                    textAlign: 'initial',
                  }}
                >
                  <Link href='/dashboard'>
                    <ListItemIcon
                      color={index % 2 === 0 ? 'primary' : 'secondary'}
                    >
                      {index % 2 === 0 ? <MdOutlineWork /> : <GrProjects />}
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ fontSize: '1.1rem' }}
                    />
                  </Link>
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
}
