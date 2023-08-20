import { useState } from 'react';
import { Box, Drawer, Theme, useMediaQuery } from '@mui/material';
import CustomDrawer from './Components/Drawer';
import useDrawerWidth from '../../../hooks/useDrawerWidth';

interface SideNavInterface {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}

export default function SideNav({
  mobileOpen,
  handleDrawerToggle,
}: SideNavInterface) {
  const [open, setOpen] = useState(true);

  const isPermanent = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md')
  );

  const drawerWidth = useDrawerWidth();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <nav className='side-nav'>
      <div className='side-nav__container'>
        <Box
          component='nav'
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label='side navigation'
        >
          <Drawer
            variant={isPermanent ? 'permanent' : 'temporary'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: isPermanent ? 'block' : 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <CustomDrawer handleClick={handleClick} open={open} />
          </Drawer>
        </Box>
      </div>
    </nav>
  );
}
