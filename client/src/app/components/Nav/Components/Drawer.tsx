import Link from 'next/link';
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

const navItemData = [
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
    <div>
      <Toolbar />
      <Divider />
      <List>
        {navItemData.map((item) => (
          <ListItem key={item.text} disablePadding>
            <IconButton color='inherit'>
              <Link href={item.href}>
                <ListItemIcon color='inherit'>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </Link>
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary='Projects' />
          {open ? <MdExpandLess /> : <MdExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {favoritesNavList.map((item, index) => (
              <ListItem key={item} disablePadding>
                <IconButton color='inherit'>
                  <Link href='/dashboard'>
                    <ListItemIcon
                      color={index % 2 === 0 ? 'primary' : 'secondary'}
                    >
                      {index % 2 === 0 ? <MdOutlineWork /> : <GrProjects />}
                    </ListItemIcon>
                    <ListItemText primary={item} />
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
