import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrganization } from '../../models/organization.model';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';

interface IOrganizationDetailsState {
  details: IOrganization | null;
  isLoading: boolean;
}

export const organizationDetailsSlice = createSlice<
  IOrganizationDetailsState,
  SliceCaseReducers<IOrganizationDetailsState>
>({
  name: 'organizationDetails',
  initialState: {
    details: null,
    isLoading: true,
  },
  reducers: {
    setOrganizationDetails(
      state: IOrganizationDetailsState,
      action: PayloadAction<IOrganization>
    ) {
      state.details = action.payload;
      state.isLoading = false;
    },
    setOrganizationDetailsLoading(
      state: IOrganizationDetailsState,
      action: PayloadAction<boolean>
    ) {
      state.isLoading = action.payload;
    },
  },
});

export const { setOrganizationDetails, setOrganizationDetailsLoading } =
  organizationDetailsSlice.actions;
