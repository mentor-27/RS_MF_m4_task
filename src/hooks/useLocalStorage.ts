import { useEffect, useRef, useState } from 'react';

const getStoragedValue = (key: string, initialState: unknown) => {
  const savedValue = JSON.parse(localStorage.getItem(key) || 'null');

  if (savedValue) return savedValue;

  return initialState;
};

export const useLocalStorage = (key: string, initialState: unknown) => {
  const [value, setValue] = useState(getStoragedValue(key, initialState));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
