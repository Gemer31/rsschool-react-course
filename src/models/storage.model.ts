import { IOrganization, IOrganizationsResponse } from './organization.model';

export interface IStorage {
  details?: {
    [uid: string]: IOrganization;
  };
  pages?: {
    [pageSize: string]: {
      [pageNumber: string]: IOrganizationsResponse;
    };
  };
}

export interface IStorageMethods {
  getItems: (page: number, size: number) => IOrganizationsResponse;
  getDetails: (uid: string) => IOrganization;
  setItems: (data: IOrganizationsResponse, page: number, size: number) => void;
  setDetails: (uid: string, item: IOrganization) => void;
}
