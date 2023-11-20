import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrganizationsResponse } from '../../models/organization.model';

interface IOrganizationsState {
  page: {
    [pageNumber: string]: unknown;
  };
}

export const organizationsSlice = createSlice<IOrganizationsState>({
  name: 'organizations',
  initialState: {
    page: {},
  },
  reducers: {
    setOrganizations(state, action: PayloadAction<IOrganizationsResponse>) {
      if (action.payload) {
        state.page[action.payload.page.pageNumber] =
          action.payload.organizations;
      } else {
        state.page = {};
      }
    },
  },
});

export const { setOrganizations } = organizationsSlice.actions;
