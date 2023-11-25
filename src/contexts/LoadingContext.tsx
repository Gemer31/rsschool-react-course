import { createContext } from 'react';

export interface IGlobalContext {
  isLoadingDetails: boolean;
  isLoadingItems: boolean;
}

export const GlobalContext = createContext({});
