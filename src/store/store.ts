import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { organizationsSlice } from './slices/organizationsSlice';
import { organizationDetailsSlice } from './slices/organizationDetailsSlice';
import { searchSlice } from './slices/searchSlice';
import { organizationAPI } from '../services/OrganizationService';
import { createWrapper } from "next-redux-wrapper";
import { setupListeners } from "@reduxjs/toolkit/query";

export const rootReducer = combineReducers({
  organizationDetails: organizationDetailsSlice.reducer,
  organizations: organizationsSlice.reducer,
  search: searchSlice.reducer,
  [organizationAPI.reducerPath]: organizationAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(organizationAPI.middleware),
  });
};

export const store = setupStore();
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
