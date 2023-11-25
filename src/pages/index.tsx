import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import OrganizationsBar from "../components/organizations-bar/OrganizationsBar";
import { store, wrapper } from "../store/store";
import { Provider } from "react-redux";
import { fetchOrganizationDetails, fetchOrganizations, getRunningQueriesThunk } from "../services/OrganizationService";
import OrganizationDetails from "../components/organization-details/OrganizationDetails";

export const getServerSideProps: GetServerSideProps<unknown> =
    wrapper.getServerSideProps((store) => async (context) => {
        const {pageNumber, pageSize, search, uid} = context.query;

        const initPageNumber: number = (+pageNumber) > 0 ? (+pageNumber) : 1;
        const initPageSize: number = (+pageSize) || 10;

        let state = store.getState();

        if (!state.organizations.page[initPageNumber]) {
            store.dispatch(
                fetchOrganizations.initiate({
                    pageNumber: initPageNumber,
                    pageSize: initPageSize,
                    search: search?.toString() || '',
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
                    organizations: state.organizations.page[state.organizations.pageState.pageNumber] || null,
                    details: state.organizationDetails.details,
                },
            },
        };
    });

const HomePage = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const {organizations, details, pageState} = data;

    return (
        <>
            <Head>
                <title>REACT-Next</title>
            </Head>
            <ErrorBoundary>
                <Provider store={store}>
                    <OrganizationsBar organizations={organizations} pageState={pageState}/>
                    {details ? <OrganizationDetails data={details}/> : <></>}
                </Provider>
            </ErrorBoundary>
        </>
    );
};

export default HomePage;
