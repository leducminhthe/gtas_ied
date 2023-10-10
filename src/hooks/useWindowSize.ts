import { useLayoutEffect, useState } from 'react';
import useDebounce from './useDebounce';

export default function useWindowSize(debounce = 150, isOpenSideBar:boolean) {
  const [size, setSize] = useState([0, 0]);
  const debounceSize = useDebounce(size, debounce, isOpenSideBar);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return debounceSize;
}
