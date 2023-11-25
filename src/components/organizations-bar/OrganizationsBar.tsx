import { useEffect, useState } from 'react';
import classes from './OrganizationsBar.module.scss';
import Search from '../search/Search';
import PagesBar from '../pages-bar/PagesBar';
import OrganizationsList from '../organizations-list/OrganizationsList';
import { IOrganization, IPage } from '../../models/organization.model';
import { ISearchState } from '../../store/slices/searchSlice';

interface IOrganizationBarProps {
  organizations: IOrganization[];
  search: ISearchState;
  pageState: IPage;
  selectedDetailsUid: string;
  setIsLoadingDetails: (v: boolean) => void;
}

export default function OrganizationsBar({
  organizations,
  search,
  pageState,
  setIsLoadingDetails,
  selectedDetailsUid,
}: IOrganizationBarProps) {
  const [boundaryError, setBoundaryError] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  useEffect(() => setIsLoadingItems(false), [organizations]);

  if (boundaryError) {
    throw new Error('Boundary Error');
  }

  return (
    <article className={classes.organizationsBar}>
      <header className={classes.organizationsBar__header}>
        <Search data={search} />
        <button
          type="button"
          className={'button ' + classes.organizationsBar__error}
          onClick={() => setBoundaryError(true)}
        >
          Throw error
        </button>
      </header>
      <OrganizationsList
        data={
          search.value ? (search.result ? [search.result] : []) : organizations
        }
        isLoading={isLoadingItems}
        selectedOrganizationUid={selectedDetailsUid}
        linkClickCallback={() => setIsLoadingDetails(true)}
      />
      <PagesBar
        pageState={pageState}
        changePageClickCallback={() => setIsLoadingItems(true)}
      />
    </article>
  );
}
