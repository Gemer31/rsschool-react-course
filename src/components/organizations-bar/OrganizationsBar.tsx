import { useState } from 'react';
import './OrganizationsBar.scss';
import Search from '../search/Search';
import PagesBar from '../pages-bar/PagesBar';
import OrganizationsList from "../organizations-list/OrganizationsList";

export default function OrganizationsBar() {
  const [boundaryError, setBoundaryError] = useState(false);

  if (boundaryError) {
    throw Error('Boundary Error');
  }

  return (
    <article className="organizations-bar">
      <header className="organizations-bar__header">
        <Search />
        <button
          type="button"
          className="button organizations-bar__error"
          onClick={() => setBoundaryError(true)}
        >
          Throw error
        </button>
      </header>
      <OrganizationsList />
      <PagesBar />
    </article>
  );
}
