import { createContext, useContext } from 'react';
import { IStorage, IStorageMethods } from '../models/storage.model';
import {
  IOrganization,
  IOrganizationsResponse,
} from '../models/organization.model';
import { ICommonProps } from '../models/common.model';

const GlobalContext = createContext({});

export function StorageProvider({ children }: ICommonProps) {
  const storage: IStorage = {
    details: {},
    pages: {},
  };
  return (
    <GlobalContext.Provider value={storage}>{children}</GlobalContext.Provider>
  );
}

export const useStorage = (): IStorageMethods => {
  const storage: IStorage = useContext(GlobalContext);

  const getItems = (page: number, size: number): IOrganizationsResponse => {
    if (!storage.pages[size]) {
      storage.pages[size] = {};
    }
    return storage.pages[size][page];
  };

  const setItems = (
    data: IOrganizationsResponse,
    page: number,
    size: number
  ): void => {
    storage.pages[size][page] = data;
  };

  const getDetails = (uid: string): IOrganization => {
    return storage.details[uid];
  };

  const setDetails = (uid: string, item: IOrganization): void => {
    storage.details[uid] = item;
  };

  return {
    getItems,
    getDetails,
    setItems,
    setDetails,
  };
};
