import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Provider } from 'react-redux';
import Head from 'next/head';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import OrganizationsBar from '../components/organizations-bar/OrganizationsBar';
import { store, wrapper } from '../store/store';
import {
  fetchOrganizationBySearch,
  fetchOrganizationDetails,
  fetchOrganizations,
  getRunningQueriesThunk,
} from '../services/OrganizationService';
import OrganizationDetails from '../components/organization-details/OrganizationDetails';
import { setPageData } from '../store/slices/organizationsSlice';
import {ISearchState, setSearchValue} from '../store/slices/searchSlice';
import { useEffect, useState } from 'react';
import {IOrganization, IPage} from "../models/organization.model";

interface SSPropsData {
  pageState: IPage;
  organizations: IOrganization[]
  details: IOrganization,
  search: ISearchState,
}
export const getServerSideProps: GetServerSideProps<{
  [key: string]: unknown;
}> = wrapper.getServerSideProps((storeProp) => async (context) => {
  const pageNumber: number = Number(context.query.pageNumber);
  const pageSize: number = Number(context.query.pageSize);
  const search: string = context.query.search as string;
  const uid: string = context.query.uid as string;

  const initPageNumber: number = +pageNumber > 0 ? +pageNumber : 1;
  const initPageSize: number = +pageSize || 10;

  let state = storeProp.getState();

  if (!state.organizations.page[initPageNumber] && !search) {
    storeProp.dispatch(
      fetchOrganizations.initiate({
        pageNumber: initPageNumber,
        pageSize: initPageSize,
        search: search?.toString() || '',
      })
    );
  }
  if (search) {
    storeProp.dispatch(fetchOrganizationBySearch.initiate(search));
    storeProp.dispatch(setSearchValue(search));
    storeProp.dispatch(
      setPageData({
        pageNumber: 1,
        pageSize: initPageSize,
        firstPage: true,
        lastPage: true,
      })
    );
  }
  if (uid) {
    storeProp.dispatch(fetchOrganizationDetails.initiate(uid));
  }

  await Promise.all(storeProp.dispatch(getRunningQueriesThunk()));

  state = storeProp.getState();

  return {
    props: {
      data: {
        pageState: state.organizations.pageState,
        organizations:
          state.organizations.page?.[
            state.organizations.pageState.pageNumber || 0
          ] || null,
        details: state.organizationDetails.details,
        search: state.search,
      },
    },
  };
});

export default function HomePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const sspData: SSPropsData = data as SSPropsData;
  const organizations: IOrganization[] = sspData.organizations;
  const details: IOrganization = sspData.details;
  const pageState: IPage = sspData.pageState;
  const search: ISearchState = sspData.search;
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  useEffect(() => setIsLoadingDetails(false), [details]);

  return (
    <>
      <Head>
        <title>RSS-Next</title>
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <OrganizationsBar
            search={search}
            organizations={organizations}
            pageState={pageState}
            selectedDetailsUid={details?.uid}
            setIsLoadingDetails={setIsLoadingDetails}
          />
          {details || isLoadingDetails ? (
            <OrganizationDetails isLoading={isLoadingDetails} data={details} />
          ) : (
            <></>
          )}
        </Provider>
      </ErrorBoundary>
    </>
  );
}
