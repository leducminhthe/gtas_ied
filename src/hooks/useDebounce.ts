import React, { useState, useEffect, useRef } from 'react';

export default function useDebounce<T>(value: T, delay = 150, isOpenSideBar:boolean) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, isOpenSideBar]);

  return debouncedValue;
}

// Hook
export const useDebounceV2 = (value:any, delay:any) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );

  return debouncedValue;
};

export const useComponentWillMount = (func:any) => {
  const willMount = useRef(true);

  if (willMount.current) {
    func();
  }

  willMount.current = false;
};
