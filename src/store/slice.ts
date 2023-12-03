import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { IStateForm } from '../types.ts';
import { countriesAPI } from '../services/countriesAPI.ts';

interface IDataState {
  forms: IStateForm[];
  countries: string[];
}

export const dataSlice = createSlice<IDataState, SliceCaseReducers<IDataState>>(
  {
    name: 'dataSlice',
    initialState: {
      forms: [],
      countries: [],
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
    extraReducers: (builder) => {
      builder.addMatcher(
        countriesAPI.endpoints.getCountries.matchPending,
        (state) => {
          state.countries = [];
        }
      );
      builder.addMatcher(
        countriesAPI.endpoints.getCountries.matchFulfilled,
        (state, action) => {
          state.countries = action.payload.map((item) => item.name.common);
        }
      );
      builder.addMatcher(
        countriesAPI.endpoints.getCountries.matchRejected,
        (state) => {
          state.countries = [];
        }
      );
    },
  }
);

export const { addNewForm, setFormIsNew } = dataSlice.actions;
