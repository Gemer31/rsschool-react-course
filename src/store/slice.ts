import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { IForm } from '../types.ts';
import { STUB_FORMS_DATA } from '../data/common.ts';

interface IDataState {
  forms: IForm[];
  countries: {
    values: string[];
    loading: boolean;
    error: boolean;
  };
}

export const dataSlice = createSlice<IDataState, SliceCaseReducers<IDataState>>(
  {
    name: 'dataSlice',
    initialState: {
      forms: STUB_FORMS_DATA,
      countries: {
        values: [],
        loading: false,
        error: false,
      },
    },
    reducers: {
      addNewForm(state, action: PayloadAction<IForm>) {
        state.forms.unshift(action.payload);
      },
    },
    // extraReducers: (builder) => {
    //     builder.addMatcher(
    //         countriesAPI.endpoints.getCountries.matchPending,
    //         (state) => {
    //             state.countries.values = [];
    //             state.countries.loading = true;
    //         }
    //     );
    //     builder.addMatcher(
    //         countriesAPI.endpoints.getCountries.matchFulfilled,
    //         (state, action) => {
    //             state.countries.values = (action.payload as ICountry);
    //             state.countries.error = false;
    //             state.countries.loading = false;
    //         }
    //     );
    //     builder.addMatcher(
    //         countriesAPI.endpoints.getCountries.matchRejected,
    //         (state) => {
    //             state.countries.values = [];
    //             state.countries.error = true;
    //             state.countries.loading = false;
    //         }
    //     );
    // },
  }
);

export const { addNewForm } = dataSlice.actions;
