import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrganization } from '../../models/organization.model';

interface IOrganizationDetailsState {
  currentUID?: string;
  details: {
    [uid: string]: IOrganization;
  };
}

export const organizationDetailsSlice = createSlice<IOrganizationDetailsState>({
  name: 'organizationDetails',
  initialState: {
    details: {},
  },
  reducers: {
    setOrganizationDetails(
      state,
      action: PayloadAction<{ uid: string; data: IOrganization }>
    ) {
      state.isLoading = false;
      state.details[action.payload.uid] = action.payload.data;
    },
    setDetailsUID(state, action: PayloadAction<string>) {
      state.currentUID = action.payload;
    },
  },
});

export const { setOrganizationDetails, setDetailsUID } =
  organizationDetailsSlice.actions;
