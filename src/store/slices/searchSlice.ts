import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LOCAL_STORAGE_SEARCH_VALUE from '../../constants/common.constant';
import { IOrganization, IOrganizationsResponse } from "../../models/organization.model";

interface ISearchState {
  value: string;
  result: IOrganization;
}

export const searchSlice = createSlice<ISearchState>({
  name: 'search',
  initialState: {
    value: localStorage.getItem(LOCAL_STORAGE_SEARCH_VALUE),
    result: null,
  },
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setSearchResult(state, action: PayloadAction<IOrganization>) {
      state.result = action.payload;
    },
  },
});

export const { setSearchValue, setSearchResult } = searchSlice.actions;
