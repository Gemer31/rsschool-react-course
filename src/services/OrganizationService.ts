import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IOrganization,
  IOrganizationsResponse,
} from '../models/organization.model';
import { setOrganizations } from '../store/slices/organizationsSlice';
import { setOrganizationDetails } from '../store/slices/organizationDetailsSlice';
import { setSearchResult } from '../store/slices/searchSlice';

export const organizationAPI = createApi({
  reducerPath: 'organizationAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stapi.co/api/v1/rest/organization',
  }),
  endpoints: (build) => ({
    fetchOrganizations: build.query<
      IOrganizationsResponse,
      { pageNumber: number; pageSize: number }
    >({
      query: (params: { pageNumber: number; pageSize: number }) => ({
        url: '/search',
        params: {
          pageNumber: params.pageNumber - 1,
          pageSize: params.pageSize,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const response: { data: IOrganizationsResponse } = await queryFulfilled;
        dispatch(
          setOrganizations({
            page: {
              ...response.data.page,
              pageNumber: response.data.page.pageNumber + 1,
            },
            organizations: response.data.organizations,
          })
        );
      },
    }),
    fetchOrganizationBySearch: build.query<IOrganizationsResponse, string>({
      query: (uid: string) => ({
        url: '/',
        params: {
          uid,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const response: { data: { organization: IOrganization } } =
          await queryFulfilled;
        dispatch(setSearchResult(response.data.organization));
      },
    }),
    fetchOrganizationDetails: build.query<IOrganizationsResponse, string>({
      query: (uid: string) => ({
        url: '/',
        params: {
          uid,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const response: { data: { organization: IOrganization } } =
          await queryFulfilled;
        dispatch(setOrganizationDetails(response.data.organization));
      },
    }),
  }),
});

export const {
  util: { getRunningQueriesThunk },
} = organizationAPI;
export const {
  fetchOrganizations,
  fetchOrganizationDetails,
  fetchOrganizationBySearch,
} = organizationAPI.endpoints;
