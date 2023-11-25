import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import OrganizationsBar from '../components/organizations-bar/OrganizationsBar';
import { store, wrapper } from '../store/store';
import { Provider } from 'react-redux';
import {
  fetchOrganizationBySearch,
  fetchOrganizationDetails,
  fetchOrganizations,
  getRunningQueriesThunk,
} from '../services/OrganizationService';
import OrganizationDetails from '../components/organization-details/OrganizationDetails';
import { GlobalContext, IGlobalContext } from '../contexts/LoadingContext';
import { setPageData } from '../store/slices/organizationsSlice';
import { setSearchValue } from '../store/slices/searchSlice';

export const getServerSideProps: GetServerSideProps<unknown> =
  wrapper.getServerSideProps((store) => async (context) => {
    const { pageNumber, pageSize, search, uid } = context.query;

    const initPageNumber: number = +pageNumber > 0 ? +pageNumber : 1;
    const initPageSize: number = +pageSize || 10;

    let state = store.getState();

    if (!state.organizations.page[initPageNumber] && !search) {
      store.dispatch(
        fetchOrganizations.initiate({
          pageNumber: initPageNumber,
          pageSize: initPageSize,
          search: search?.toString() || '',
        })
      );
    }
    if (search) {
      store.dispatch(fetchOrganizationBySearch.initiate(search));
      store.dispatch(setSearchValue(search));
      store.dispatch(
        setPageData({
          pageNumber: 1,
          pageSize: initPageSize,
          firstPage: true,
          lastPage: true,
        })
      );
    }
    if (uid) {
      store.dispatch(fetchOrganizationDetails.initiate(uid));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    state = store.getState();

    return {
      props: {
        data: {
          pageState: state.organizations.pageState,
          organizations:
            state.organizations.page?.[
              state.organizations.pageState.pageNumber
            ] || null,
          details: state.organizationDetails.details,
          search: state.search,
        },
      },
    };
  });

const HomePage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { organizations, details, pageState, search } = data;
  const context: IGlobalContext = {
    isLoadingDetails: !details,
    isLoadingItems: false,
  };

  return (
    <>
      <Head>
        <title>RSS-Next</title>
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <GlobalContext.Provider value={context}>
            <OrganizationsBar
              search={search}
              organizations={organizations}
              pageState={pageState}
              selectedDetailsUid={details?.uid}
            />
            {details ? <OrganizationDetails data={details} /> : <></>}
          </GlobalContext.Provider>
        </Provider>
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
