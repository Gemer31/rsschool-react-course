import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { IOrganization } from '../../models/organization.model';
import { Loader, LoaderColor } from '../loader/Loader';
import './OrganizationsList.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setDetailsUID } from '../../store/slices/organizationDetailsSlice';
import {
  useFetchOrganizationDetailsQuery,
  useFetchOrganizationsQuery,
} from '../../services/OrganizationService';

export default function OrganizationsList() {
  const dispatch = useAppDispatch();
  const [displayItems, setDisplayItems] = useState([]);
  const [searchParams] = useSearchParams();
  const selectedDetailsUid = useAppSelector(
    (state) => state.organizationDetails.currentUID
  );
  const pageState = useAppSelector((state) => state.currentPage);
  const organizations = useAppSelector(
    (state) => state.organizations.page[pageState.pageNumber]
  );
  const searchResult = useAppSelector((state) => state.search.result);
  const searchValue = useAppSelector((state) => state.search.value);

  const { isFetching: isOrganizationsFetching } = useFetchOrganizationsQuery({
    pageNumber: pageState.pageNumber,
    pageSize: pageState.pageSize,
  });
  const { isFetching: isOrganizationDetailsFetching } =
    useFetchOrganizationDetailsQuery(searchValue);

  const getLinkUrl = (uid): string => {
    return (
      'details/?' +
      `pageNumber=${searchParams.get('pageNumber')}` +
      `&pageSize=${searchParams.get('pageSize')}` +
      `&search=${searchParams.get('search')}` +
      `&uid=${uid}`
    );
  };

  const linkClick = (item: IOrganization) => {
    dispatch(setDetailsUID(item.uid));
  };

  useEffect(() => {
    setDisplayItems(
      searchValue ? (searchResult ? [searchResult] : []) : organizations
    );
  }, [searchValue, searchResult, organizations]);

  return (
    <div
      className={
        'organizations-list' +
        (isOrganizationsFetching || isOrganizationDetailsFetching
          ? ' _loading'
          : '') +
        (!displayItems?.length ? ' _empty' : '')
      }
    >
      {isOrganizationsFetching || isOrganizationDetailsFetching ? (
        <Loader color={LoaderColor.SALMON} />
      ) : displayItems?.length ? (
        displayItems.map((item: IOrganization) => (
          <NavLink
            role="organization-list-item"
            to={getLinkUrl(item.uid)}
            className={`organizations-list-item ${
              selectedDetailsUid === item.uid ? '_active' : ''
            }`}
            onClick={() => linkClick(item)}
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
