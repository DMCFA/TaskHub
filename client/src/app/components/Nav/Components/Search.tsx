import { styled } from '@mui/material/styles';
import { FormControl, IconButton, InputBase, InputLabel } from '@mui/material';
import { BsSearch } from 'react-icons/bs';

interface SearchBarInterface {
  isOpened: boolean;
  handleClick: () => void;
}

const StyledInputBase = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    transition: 'all 0.2s ease-out',
    width: '1px',
    borderRadius: '0',
    boxShadow: 'none',
    outline: 'none',
    padding: '0',
    margin: '0',
    border: '0',
    backgroundColor: 'transparent',
    opacity: '0',
  },
}));

export default function SearchBar({
  isOpened,
  handleClick,
}: SearchBarInterface) {
  return (
    <div className='search-bar'>
      <div
        className={`search-bar__container ${
          isOpened ? 'search-bar__container--opened' : ''
        }`}
      >
        <IconButton
          className='search-bar__btn'
          onClick={handleClick}
          sx={{ fontSize: '2rem', cursor: 'pointer' }}
          color='inherit'
        >
          <BsSearch />
        </IconButton>
        <StyledInputBase
          className='search-bar__search'
          id='search-bar-input'
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </div>
  );
}
