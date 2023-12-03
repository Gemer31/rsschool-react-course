import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ICountry {
  name: {
    common: string;
  };
}

export const countriesAPI = createApi({
  reducerPath: 'countriesReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1' }),
  endpoints: (builder) => {
    return {
      getCountries: builder.query<ICountry[], object>({
        query: () => ({
          url: '/all',
        }),
      }),
    };
  },
});

export const { useGetCountriesQuery } = countriesAPI;
