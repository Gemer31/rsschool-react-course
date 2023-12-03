import { Link } from 'react-router-dom';
import { CommonReactProps } from '../../types.ts';
import { RouterPage } from '../../utils/router.tsx';
import classes from './form-layout.module.scss';

type IFormLayoutProps = { title: string } & CommonReactProps;
export const FormLayout = ({ title, children }: IFormLayoutProps) => {
  return (
    <section className={classes.formLayout}>
      <div className={classes.formLayoutHeader}>
        <Link className={classes.formLayoutBackLink} to={RouterPage.MAIN}>
          ← Back to main page
        </Link>
        <h1>{title}</h1>
      </div>
      {children}
    </section>
  );
};
