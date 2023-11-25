import { useState } from 'react';
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
}

export default function OrganizationsBar({
  organizations,
  search,
  pageState,
  setLoading,
  selectedDetailsUid,
}: IOrganizationBarProps) {
  const [boundaryError, setBoundaryError] = useState(false);

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
          search.value ? (search.result ? search.result : []) : organizations
        }
        selectedOrganizationUid={selectedDetailsUid}
        setLoading={setLoading}
      />
      <PagesBar pageState={pageState} />
    </article>
  );
}
