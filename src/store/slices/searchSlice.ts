import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LOCAL_STORAGE_SEARCH_VALUE from '../../constants/common.constant';

interface ISearchState {
  value: string;
}

export const searchSlice = createSlice<ISearchState>({
  name: 'search',
  initialState: {
    value: localStorage.getItem(LOCAL_STORAGE_SEARCH_VALUE),
  },
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
