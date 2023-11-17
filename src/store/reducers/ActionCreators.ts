import { AppDispatch } from '../store';
import {
  organizationsFetching,
  organizationsFetchingError,
  organizationsFetchingSuccess,
} from '../slices/organizationsSlice';
import {
  IOrganization,
  IOrganizationsResponse,
} from '../../models/organization.model';
import { setPageData } from '../slices/currentPageSlice';
import {
  organizationDetailsFetching,
  organizationDetailsFetchingError,
  organizationDetailsFetchingSuccess,
} from '../slices/organizationDetailsSlice';

const baseUrl: string = 'https://stapi.co/api/v1/rest/organization';

export const fetchOrganizations =
  (page: number, size: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(organizationsFetching());
      const response = await fetch(
        `${baseUrl}/search?pageNumber=${page}&pageSize=${size}`
      );
      const data: IOrganizationsResponse = await response.json();
      dispatch(setPageData(data.page));
      dispatch(organizationsFetchingSuccess(data));
    } catch (e) {
      dispatch(organizationsFetchingError(e.message));
    }
  };

export const fetchOrganizationDetails =
  (uid: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(organizationDetailsFetching());
      const response = await fetch(`${baseUrl}?uid=${uid}`);
      const data: { organization: IOrganization } = await response.json();
      dispatch(
        organizationDetailsFetchingSuccess({ uid, data: data.organization })
      );
    } catch (e) {
      dispatch(organizationDetailsFetchingError(e.message));
    }
  };

export const fetchSearch =
  (searchValue: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(organizationsFetching());
      const response = await fetch(`${baseUrl}?uid=${searchValue}`);
      const data: { organization: IOrganization } = await response.json();
      dispatch(
        setPageData({
          pageNumber: 0,
          firstPage: true,
          lastPage: true,
        })
      );
      dispatch(
        organizationsFetchingSuccess({
          page: {
            pageNumber: 0,
          },
          organizations: data.organization ? [data.organization] : [],
        })
      );
    } catch (e) {
      dispatch(
        organizationsFetchingSuccess({
          page: {
            pageNumber: 0,
          },
          organizations: [],
        })
      );
    }
  };
