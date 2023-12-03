import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { IStateForm } from '../types.ts';

interface IDataState {
  forms: IStateForm[];
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
      forms: [],
      countries: {
        values: [],
        loading: false,
        error: false,
      },
    },
    reducers: {
      addNewForm(state, action: PayloadAction<IStateForm>) {
        state.forms.unshift(action.payload);
      },
      setFormIsNew(state, action: PayloadAction<IStateForm>) {
        const formData = state.forms.find(
          (item) => item.id === action.payload.id
        );
        if (formData) {
          formData.isNew = action.payload.isNew;
        }
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

export const { addNewForm, setFormIsNew } = dataSlice.actions;
