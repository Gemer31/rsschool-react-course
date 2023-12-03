import { Link, NavLink } from 'react-router-dom';

import classes from './header.module.scss';
import { RouterPage } from "../../utils/router.tsx";

export const Header = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} to={RouterPage.MAIN} />
      <nav>
        <NavLink
          to={RouterPage.UNCONTROLLED_FORM}
          className={({ isActive }) =>
            [isActive ? classes.buttonActive : '', classes.button].join(' ')
          }
        >
          Uncontrolled Form
        </NavLink>
        <NavLink
          to={RouterPage.REACT_HOOK_FORM}
          className={({ isActive }) =>
            [isActive ? classes.buttonActive : '', classes.button].join(' ')
          }
        >
          React Hook Form
        </NavLink>
      </nav>
    </header>
  );
};
