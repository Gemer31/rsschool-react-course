import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrganizationsResponse } from '../../models/organization.model';

interface IOrganizationsState {
  page: {
    [pageNumber: string]: unknown;
  };
  isLoading: boolean;
}

export const organizationsSlice = createSlice<IOrganizationsState>({
  name: 'organizations',
  initialState: {
    page: {},
    isLoading: false,
  },
  reducers: {
    organizationsFetching(state) {
      state.isLoading = true;
    },
    organizationsFetchingSuccess(
      state,
      action: PayloadAction<IOrganizationsResponse>
    ) {
      state.isLoading = false;
      state.page[action.payload.page.pageNumber] = action.payload.organizations;
    },
    organizationsFetchingError(state) {
      state.isLoading = false;
    },
  },
});

export const {
  organizationsFetching,
  organizationsFetchingSuccess,
  organizationsFetchingError,
} = organizationsSlice.actions;
