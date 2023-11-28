import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IOrganization,
  IOrganizationsResponse,
  IPage,
} from '../../models/organization.model';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';

interface IOrganizationsState {
  isLoading: boolean;
  pageState: IPage;
  page: {
    [pageNumber: string]: IOrganization[];
  };
}

export const organizationsSlice = createSlice<
  IOrganizationsState,
  SliceCaseReducers<IOrganizationsState>
>({
  name: 'organizations',
  initialState: {
    isLoading: true,
    pageState: {
      pageNumber: 1,
      pageSize: 10,
      firstPage: true,
      lastPage: false,
    },
    page: {},
  },
  reducers: {
    setOrganizations(
      state: IOrganizationsState,
      action: PayloadAction<IOrganizationsResponse>
    ) {
      if (action.payload) {
        state.page[action.payload.page.pageNumber || 0] =
          action.payload.organizations;
        state.pageState = action.payload.page;
      } else {
        state.page = {};
      }
      state.isLoading = false;
    },
    setOrganizationsLoading(
      state: IOrganizationsState,
      action: PayloadAction<boolean>
    ) {
      state.isLoading = action.payload;
    },
    setPageData(state: IOrganizationsState, action: PayloadAction<IPage>) {
      state.pageState.pageNumber =
        action.payload.pageNumber || state.pageState.pageNumber;
      state.pageState.pageSize =
        action.payload.pageSize || state.pageState.pageSize;
      state.pageState.firstPage = action.payload.firstPage;
      state.pageState.lastPage = action.payload.lastPage;
    },
  },
});

export const { setOrganizations, setOrganizationsLoading, setPageData } =
  organizationsSlice.actions;
