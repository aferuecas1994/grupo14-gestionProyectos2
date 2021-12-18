import { createContext, useContext } from 'react';

export const InsContext = createContext(null);

export const useInsc = () => {
  return useContext(InsContext);
};
