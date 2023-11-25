import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrganization } from '../../models/organization.model';

interface IOrganizationDetailsState {
  details: IOrganization | null;
}

export const organizationDetailsSlice = createSlice<IOrganizationDetailsState>({
  name: 'organizationDetails',
  initialState: {
    details: null,
  },
  reducers: {
    setOrganizationDetails(
      state,
      action: PayloadAction<IOrganization>
    ) {
      state.details = action.payload;
    },
  },
});

export const { setOrganizationDetails, setDetailsUID } = organizationDetailsSlice.actions;
