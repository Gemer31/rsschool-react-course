import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrganization, IOrganizationsResponse, IPage } from '../../models/organization.model';

interface IOrganizationsState {
  pageState: IPage,
  page: {
    [pageNumber: string]: IOrganization[];
  };
}

export const organizationsSlice = createSlice<IOrganizationsState>({
  name: 'organizations',
  initialState: {
    pageState: {
      pageNumber: 1,
      pageSize: 10,
      firstPage: true,
      lastPage: false,
    },
    page: {},
  },
  reducers: {
    setOrganizations(state, action: PayloadAction<IOrganizationsResponse>) {
      if (action.payload) {
        state.page[action.payload.page.pageNumber] = action.payload.organizations;
        state.pageState = action.payload.page;
      } else {
        state.page = {};
      }
    },
    setPageData(state, action: PayloadAction<IPage>) {
      state.pageNumber = action.payload.pageNumber || state.pageNumber;
      state.pageSize = action.payload.pageSize || state.pageSize;
      state.firstPage = action.payload.firstPage;
      state.lastPage = action.payload.lastPage;
    },
  },
});

export const { setOrganizations, setPageData } = organizationsSlice.actions;
