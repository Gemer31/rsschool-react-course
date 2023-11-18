import { useState } from 'react';
import { OrganizationsList } from '../organizations-list/OrganizationsList';
import './OrganizationsBar.scss';
import Search from '../search/Search';
import PagesBar from '../pages-bar/PagesBar';

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
