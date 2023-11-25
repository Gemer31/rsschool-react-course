import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrganization } from '../../models/organization.model';

interface IOrganizationDetailsState {
  details: IOrganization | null;
  isLoading: boolean;
}

export const organizationDetailsSlice = createSlice<IOrganizationDetailsState>({
  name: 'organizationDetails',
  initialState: {
    details: null,
    isLoading: true,
  },
  reducers: {
    setOrganizationDetails(state, action: PayloadAction<IOrganization>) {
      state.details = action.payload;
      state.isLoading = false;
    },
    setOrganizationDetailsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setOrganizationDetails, setOrganizationDetailsLoading } =
  organizationDetailsSlice.actions;
