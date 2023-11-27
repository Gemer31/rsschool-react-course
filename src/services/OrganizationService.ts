import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IOrganizationResponse,
  IOrganizationsResponse,
} from '../models/organization.model';
import { setOrganizations } from '../store/slices/organizationsSlice';
import { setOrganizationDetails } from '../store/slices/organizationDetailsSlice';
import { setSearchResult } from '../store/slices/searchSlice';

export interface IFetchOrganizationsProps {
  pageNumber: number;
  pageSize: number;
  search: string;
}
export const organizationAPI = createApi({
  reducerPath: 'organizationAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stapi.co/api/v1/rest/organization',
  }),
  endpoints: (build) => ({
    fetchOrganizations: build.query<
      IOrganizationsResponse,
      IFetchOrganizationsProps
    >({
      query: (params: IFetchOrganizationsProps) => ({
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
              pageNumber: Number(response.data.page.pageNumber) + 1,
            },
            organizations: response.data.organizations,
          })
        );
      },
    }),
    fetchOrganizationBySearch: build.query<IOrganizationResponse, string>({
      query: (uid: string) => ({
        url: '/',
        params: {
          uid,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const response: { data: IOrganizationResponse } = await queryFulfilled;
        dispatch(setSearchResult(response.data.organization));
      },
    }),
    fetchOrganizationDetails: build.query<IOrganizationResponse, string>({
      query: (uid: string) => ({
        url: '/',
        params: {
          uid,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const response: { data: IOrganizationResponse } = await queryFulfilled;
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
