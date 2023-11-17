import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPage } from '../../models/organization.model';

export const currentPageSlice = createSlice<IPage>({
  name: 'currentPage',
  initialState: {
    pageNumber:
      Number(new URLSearchParams(document.location.search).get('pageNumber')) ||
      0,
    pageSize:
      Number(new URLSearchParams(document.location.search).get('pageSize')) ||
      10,
    firstPage: true,
    lastPage: false,
  },
  reducers: {
    setPageData(state, action: PayloadAction<IPage>) {
      state.pageNumber = action.payload.pageNumber || state.pageNumber;
      state.pageSize = action.payload.pageSize || state.pageSize;
      state.firstPage = action.payload.firstPage;
      state.lastPage = action.payload.lastPage;
    },
  },
});

export const { setPageData } = currentPageSlice.actions;
