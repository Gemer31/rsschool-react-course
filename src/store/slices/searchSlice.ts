import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrganization } from '../../models/organization.model';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';

export interface ISearchState {
  value: string;
  result: IOrganization | null;
}

export const searchSlice = createSlice<
  ISearchState,
  SliceCaseReducers<ISearchState>
>({
  name: 'search',
  initialState: {
    value: '',
    result: null,
  },
  reducers: {
    setSearchValue(state: ISearchState, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setSearchResult(state: ISearchState, action: PayloadAction<IOrganization>) {
      state.result = action.payload;
    },
  },
});

export const { setSearchValue, setSearchResult } = searchSlice.actions;
