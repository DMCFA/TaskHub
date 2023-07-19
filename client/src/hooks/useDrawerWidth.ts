import { useState, useEffect } from 'react';

export default function useDrawerWidth() {
  const [drawerWidth, setDrawerWidth] = useState(270);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth >= 1366 ? 300 : 270;
      setDrawerWidth(width);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return drawerWidth;
}
