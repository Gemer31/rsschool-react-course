import { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { IOrganization } from '../../models/organization.model';
import { Loader, LoaderColor } from '../loader/Loader';
import './OrganizationsList.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setPageData } from '../../store/slices/currentPageSlice';
import { fetchOrganizations } from '../../store/reducers/ActionCreators';

export function OrganizationsList() {
  const [searchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<IOrganization>();
  const location = useLocation();
  const pageState = useAppSelector((state) => state.currentPage);
  const organizations = useAppSelector(
    (state) => state.organizations.page[pageState.pageNumber]
  );
  const isLoading = useAppSelector((state) => state.organizations.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const queryPageNumberParam: number = searchParams.get(
      'pageNumber'
    ) as number;
    const queryPageSizeParam: number = searchParams.get('pageSize') as number;

    const initPageNumber: number =
      queryPageNumberParam && queryPageNumberParam > 0
        ? queryPageNumberParam - 1
        : 0;
    const initPageSize: number = queryPageSizeParam || 10;

    if (!pageState?.pageNumber) {
      dispatch(
        setPageData({
          pageNumber: initPageNumber,
          pageSize: initPageSize,
          firstPage: true,
          lastPage: true,
        })
      );
    }

    if (!organizations && !isLoading) {
      dispatch(fetchOrganizations(pageState.pageNumber, pageState.pageSize));
    }
  }, []);

  const getLinkUrl = (uid): string => {
    return (
      'details/?' +
      `pageNumber=${searchParams.get('pageNumber')}` +
      `&pageSize=${searchParams.get('pageSize')}` +
      `&search=${searchParams.get('search')}` +
      `&uid=${uid}`
    );
  };

  return (
    <div
      className={
        'organizations-list' +
        (isLoading ? ' _loading' : '') +
        (!organizations?.length ? ' _empty' : '')
      }
    >
      {isLoading ? (
        <Loader color={LoaderColor.SALMON} />
      ) : organizations?.length ? (
        organizations?.map((item: IOrganization) => (
          <NavLink
            role="organization-list-item"
            to={getLinkUrl(item.uid)}
            className={`organizations-list-item ${
              selectedItem?.name === item.name ? '_active' : ''
            }`}
            onClick={() => setSelectedItem(item)}
            key={item.name}
          >
            {item.name}
          </NavLink>
        ))
      ) : (
        'No items'
      )}
    </div>
  );
}
