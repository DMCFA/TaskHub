import { styled } from '@mui/material/styles';
import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { BsSearch } from 'react-icons/bs';
import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { useUserResults } from '../../../../hooks/useUserResults';

interface SearchBarInterface {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  handleClick: () => void;
}

interface SearchResult {
  id: number;
  tableName: string;
  username?: string;
  title?: string;
  name?: string;
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
  setIsOpened,
  handleClick,
}: SearchBarInterface) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState(searchQuery);
  const handle = useRef<NodeJS.Timeout | null>(null);
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    handle.current = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, 1000);

    return () => {
      if (handle.current) {
        clearTimeout(handle.current);
      }
    };
  }, [searchQuery]);

  const { data: results, isLoading, isError } = useUserResults(debouncedValue);

  const getPrimaryResultText = (result: SearchResult) => {
    switch (result.tableName) {
      case 'User':
        return result.username;
      case 'Task':
        return result.title;
      case 'Team' || 'Project':
        return result.name;
      default:
        return '';
    }
  };

  const searchResults = (results: SearchResult[]) => {
    return (
      <List disablePadding>
        {results.map((result) => (
          <ListItemButton key={result.id} divider>
            <ListItemText
              primary={result.tableName}
              secondary={getPrimaryResultText(result)}
            />
          </ListItemButton>
        ))}
      </List>
    );
  };

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        event.target instanceof Node &&
        !searchBarRef.current.contains(event.target)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBarRef]);

  return (
    <div className='search-bar' ref={searchBarRef}>
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
          onChange={(e) => handleSearch(e)}
        />
      </div>
      {isOpened && isLoading && searchQuery.length > 3 && (
        <div className='search-bar__results--loading'>
          <List>
            <ListItem>
              <ListItemText primary='Results loading...' />
            </ListItem>
          </List>
        </div>
      )}
      {isOpened && isError && (
        <div className='search-bar__results--error'>
          <List>
            <ListItem>
              <ListItemText primary='Error occurred while fetching data' />
            </ListItem>
          </List>
        </div>
      )}
      {isOpened && !isLoading && !isError && results.length === 0 && (
        <div className='search-bar__results--no-results'>
          <List>
            <ListItem>
              <ListItemText primary='No results found' />
            </ListItem>
          </List>
        </div>
      )}
      {isOpened && !isLoading && !isError && results.length > 0 && (
        <div className='search-bar__results'>{searchResults(results)}</div>
      )}
    </div>
  );
}
