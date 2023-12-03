import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { countriesAPI } from '../services/countriesAPI.ts';
import { dataSlice } from './slice.ts';
import { countriesSlice } from './countriesSlice.ts';

export const rootReducer = combineReducers({
  data: dataSlice.reducer,
  countries: countriesSlice.reducer,
  [countriesAPI.reducerPath]: countriesAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(countriesAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
