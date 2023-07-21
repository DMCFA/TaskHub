import { Box, Toolbar, Divider, Skeleton, List } from '@mui/material';
import { navItemData } from '../Nav/Components/Drawer';

export default function SideNavSkeleton() {
  const items = navItemData.length;
  return (
    <div className='side-nav-skeleton'>
      <Toolbar sx={{ height: '76px', paddingBlock: '1rem' }}>
        <div className='side-nav-skeleton__logo'>
          <Skeleton width={60} height={60} variant='circular' />
        </div>
      </Toolbar>
      <Divider />
      <List sx={{ paddingBlock: '0.8rem' }}>
        {Array.from({ length: items }, (_, index) => (
          <Box
            key={index}
            height={40}
            width={260}
            sx={{ padding: '0.8rem', display: 'flex', alignItems: 'center' }}
          >
            <Skeleton
              variant='circular'
              height={25}
              width={25}
              sx={{ margin: '0 4rem 0 0' }}
            />
            <Skeleton height={35} width={100} />
          </Box>
        ))}
      </List>
      <Divider />
      <List>
        <Box
          className='side-nav-skeleton__second-heading'
          height={40}
          width={260}
          sx={{
            padding: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Skeleton
            height={35}
            width={100}
            sx={{ marginInlineStart: '1rem' }}
          />
          <Skeleton
            height={20}
            width={20}
            variant='rounded'
            sx={{ margin: '0' }}
          />
        </Box>
        {Array.from({ length: items }, (_, index) => (
          <Box
            key={index}
            height={40}
            width={260}
            sx={{ padding: '0.8rem', display: 'flex', alignItems: 'center' }}
          >
            <Skeleton
              variant='circular'
              height={25}
              width={25}
              sx={{ margin: '0 4rem 0 0' }}
            />
            <Skeleton height={35} width={100} />
          </Box>
        ))}
      </List>
    </div>
  );
}
