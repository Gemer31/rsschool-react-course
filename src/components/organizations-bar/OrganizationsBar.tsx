import { useState } from 'react';
import classes from './OrganizationsBar.module.scss';
import Search from '../search/Search';
import PagesBar from '../pages-bar/PagesBar';
import OrganizationsList from '../organizations-list/OrganizationsList';
import { IOrganization, IPage } from "../../models/organization.model";

interface IOrganizationBarProps {
    organizations: IOrganization[];
    details: IOrganization;
    pageState: IPage;
}

export default function OrganizationsBar({ organizations, details, pageState }: IOrganizationBarProps) {
  const [boundaryError, setBoundaryError] = useState(false);

  if (boundaryError) {
    throw Error('Boundary Error');
  }

  return (
    <article className={classes.organizationsBar}>
      <header className={classes.organizationsBar__header}>
        <Search />
        <button
          type="button"
          className={"button " + classes.organizationsBar__error}
          onClick={() => setBoundaryError(true)}
        >
          Throw error
        </button>
      </header>
      <OrganizationsList data={organizations}/>
      <PagesBar pageState={pageState}/>
    </article>
  );
}
