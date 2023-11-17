import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { organizationsSlice } from './slices/organizationsSlice';
import { currentPageSlice } from './slices/currentPageSlice';
import { organizationDetailsSlice } from './slices/organizationDetailsSlice';
import { searchSlice } from './slices/searchSlice';

export const rootReducer = combineReducers({
  organizationDetails: organizationDetailsSlice.reducer,
  organizations: organizationsSlice.reducer,
  currentPage: currentPageSlice.reducer,
  search: searchSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
