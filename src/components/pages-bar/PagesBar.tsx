import { useState } from 'react';
import { IPage } from '../../models/organization.model';
import { useRouter } from 'next/router';
import classes from './PagesBar.module.scss';

interface IPageBarProps {
  pageState: IPage;
  changePageClickCallback: () => void;
}

export default function PagesBar({
  pageState,
  changePageClickCallback,
}: IPageBarProps) {
  const router = useRouter();
  const { query } = router;
  const [size, setSize] = useState(pageState?.pageSize);

  const changePage = (type: '+' | '-'): void => {
    changePageClickCallback();
    const newPage: number =
      type === '+'
        ? Number(pageState.pageNumber) + 1
        : Number(pageState.pageNumber) - 1;
    router.push({
      query: {
        ...query,
        pageNumber: newPage,
        pageSize: String(pageState.pageSize),
      },
    });
  };

  const changeSize = () => {
    router.push({
      query: {
        ...query,
        pageNumber: 1,
        pageSize: size,
      },
    });
  };

  return (
    <div className={classes.pagesBar}>
      <div className={classes.pagesBar__state}>
        <button
          role="prev-page-button"
          type="button"
          disabled={pageState?.firstPage}
          className="button"
          onClick={() => changePage('-')}
        >
          <div className={classes.pagesBar__icon + ' arrow'} />
        </button>
        <span role="page-number" className={classes.pagesBar__page}>
          {pageState?.pageNumber}
        </span>
        <button
          role="next-page-button"
          type="button"
          disabled={pageState?.lastPage}
          className="button"
          onClick={() => changePage('+')}
        >
          <div className={classes.pagesBar__icon + ' arrow rotate'} />
        </button>
      </div>
      <form className={classes.pagesBar__form}>
        <input
          className={'input ' + classes.pagesBar__formField}
          type="number"
          max={100}
          min={1}
          value={size}
          onInput={(event) =>
            setSize(Number((event.target as HTMLInputElement).value))
          }
        />
        <button
          type="submit"
          className="button"
          onClick={(event) => {
            event.preventDefault();
            changeSize();
          }}
        >
          <div className={classes.pagesBar__icon + ' reload'} />
        </button>
      </form>
    </div>
  );
}
