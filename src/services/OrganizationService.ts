import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOrganizationsResponse } from '../models/organization.model';

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
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
        },
      }),
    }),
    fetchOrganizationDetails: build.query<IOrganizationsResponse, string>({
      query: (uid: string) => ({
        url: '/',
        params: {
          uid,
        },
      }),
    }),
  }),
});

export const { useFetchOrganizationsQuery, useFetchOrganizationDetailsQuery } =
  organizationAPI;
