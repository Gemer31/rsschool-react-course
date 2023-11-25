import { createContext, useContext } from 'react';
import { ICommonProps } from '../models/common.model';

export interface IGlobalContext {
  isLoadingDetails: boolean;
  isLoadingItems: boolean;
}

export interface IGlobalContextWithActions extends IGlobalContext {
  setIsLoadingItems: (v: boolean) => void;
  setIsLoadingDetails: (v: boolean) => void;
}

const GlobalContext = createContext({});

export function GlobalContextProvider({ children }: ICommonProps) {
  const context: IGlobalContext = {
    isLoadingDetails: false,
    isLoadingItems: false,
  };
  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

export const useGlobalContext = (): IGlobalContextWithActions => {
  const context: IGlobalContext = useContext(GlobalContext);

  const setIsLoadingDetails = (v: boolean): void => {
    context.isLoadingDetails = v;
  };

  const setIsLoadingItems = (v: boolean): void => {
    context.isLoadingItems = v;
  };

  return {
    ...context,
    setIsLoadingDetails,
    setIsLoadingItems,
  };
};
