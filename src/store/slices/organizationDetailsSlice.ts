import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrganization } from '../../models/organization.model';

interface IOrganizationDetailsState {
  isLoading: boolean;
  details: {
    [uid: string]: IOrganization;
  };
}

export const organizationDetailsSlice = createSlice<IOrganizationDetailsState>({
  name: 'organizationDetails',
  initialState: {
    isLoading: true,
    details: {},
  },
  reducers: {
    organizationDetailsFetching(state) {
      state.isLoading = true;
    },
    organizationDetailsFetchingSuccess(
      state,
      action: PayloadAction<{ uid: string; data: IOrganization }>
    ) {
      state.isLoading = false;
      state.details[action.payload.uid] = action.payload.data;
    },
    organizationDetailsFetchingError(
      state,
      action: PayloadAction<{ uid: string; data: IOrganization }>
    ) {
      state.isLoading = false;
      state.details[action.payload.uid] = action.payload.data;
    },
  },
});

export const {
  organizationDetailsFetching,
  organizationDetailsFetchingSuccess,
  organizationDetailsFetchingError,
} = organizationDetailsSlice.actions;
