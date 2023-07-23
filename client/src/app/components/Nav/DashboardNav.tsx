import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';

type ActiveTab = 'projects' | 'favorites' | 'worked-on';

interface DashNavProps {
  active: ActiveTab;
  setActive: React.Dispatch<React.SetStateAction<ActiveTab>>;
}

export default function DashNav({ active, setActive }: DashNavProps) {
  const handleMobileClick = (tab: ActiveTab) => {
    setActive(tab);
  };

  const handleDesktopChange = (event: SelectChangeEvent<ActiveTab>) => {
    setActive(event.target.value as ActiveTab);
  };

  return (
    <div className='dashboard-nav'>
      <div className='dashboard-nav__container'>
        <div className='dashboard-nav__mobile-options'>
          <ul>
            <li>
              <button
                className={`dashboard-nav__option dashboard-nav__option--projects ${
                  active === 'projects' ? 'dashboard-nav__option--active' : ''
                }`}
                aria-label='select recent projects'
                onClick={() => handleMobileClick('projects')}
              >
                Recent Projects
              </button>
            </li>
            <li>
              <button
                className={`dashboard-nav__option dashboard-nav__favorites ${
                  active === 'favorites' ? 'dashboard-nav__option--active' : ''
                }`}
                aria-label='select favorites'
                onClick={() => handleMobileClick('favorites')}
              >
                Favorites
              </button>
            </li>
            <li>
              <button
                className={`dashboard-nav__option dashboard-nav__worked-on ${
                  active === 'worked-on' ? 'dashboard-nav__option--active' : ''
                }`}
                aria-label='select worked on'
                onClick={() => handleMobileClick('worked-on')}
              >
                Worked On
              </button>
            </li>
          </ul>
        </div>
        <div className='dashboard-nav__desktop'>
          <Select
            autoWidth
            className='dashboard-nav__select'
            value={active}
            onChange={handleDesktopChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              '&::before, &::after': {
                content: 'none',
              },
              paddingBottom: '0.5rem',
            }}
            variant='standard'
          >
            <MenuItem value='projects' className='dashboard-nav__web-option'>
              Recent Projects
            </MenuItem>
            <MenuItem value='favorites' className='dashboard-nav__web-option'>
              Favorites
            </MenuItem>
            <MenuItem value='worked-on' className='dashboard-nav__web-option'>
              Worked On
            </MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
}
