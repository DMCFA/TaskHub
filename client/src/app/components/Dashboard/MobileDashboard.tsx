import { Tooltip, MenuItem, SelectChangeEvent } from '@mui/material';

type ActiveTab = 'projects' | 'favorites' | 'time-sensitive';

interface DashNavProps {
  active: ActiveTab;
  setActive: React.Dispatch<React.SetStateAction<ActiveTab>>;
}

export default function MobileDashboard({ active, setActive }: DashNavProps) {
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
                  active === 'time-sensitive'
                    ? 'dashboard-nav__option--active'
                    : ''
                }`}
                aria-label='select worked on'
                onClick={() => handleMobileClick('time-sensitive')}
              >
                Time Sensitive
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
