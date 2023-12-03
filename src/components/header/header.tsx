import { Link, NavLink } from 'react-router-dom';

import classes from './header.module.scss';
import { RouterPage } from '../../router.tsx';

export const Header = () => {
  const getLinkClass = (isActive: boolean) =>
    [classes.button, isActive ? classes.buttonActive : ''].join(' ');

  return (
    <header className={classes.header}>
      <Link className={classes.logo} to={RouterPage.MAIN} />
      <nav>
        <NavLink
          to={RouterPage.UNCONTROLLED_FORM}
          className={({ isActive }) => getLinkClass(isActive)}
        >
          Uncontrolled Form
        </NavLink>
        <NavLink
          to={RouterPage.REACT_HOOK_FORM}
          className={({ isActive }) => getLinkClass(isActive)}
        >
          React Hook Form
        </NavLink>
      </nav>
    </header>
  );
};
