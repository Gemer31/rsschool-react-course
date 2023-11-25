import { useState } from 'react';
import { IPage } from '../../models/organization.model';
import { useRouter } from 'next/router';
import classes from './PagesBar.module.scss';

interface IPageBarProps {
  pageState: IPage;
}

export default function PagesBar({ pageState }: IPageBarProps) {
  const [size, setSize] = useState(pageState?.pageSize);

  const router = useRouter();
  const { query } = router;

  const changePage = (type: '+' | '-'): void => {
    const newPage: number =
      type === '+' ? pageState.pageNumber + 1 : pageState.pageNumber - 1;
    router.push({
      query: {
        ...query,
        pageNumber: newPage,
        pageSize: pageState.pageSize as string,
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
          role="nextPageButton"
          type="button"
          disabled={pageState?.firstPage}
          className="button"
          onClick={() => changePage('-')}
        >
          <div className={classes.pagesBar__icon + ' arrow'} />
        </button>
        <span className={classes.pagesBar__page}>{pageState?.pageNumber}</span>
        <button
          role="prevPageButton"
          type="button"
          disabled={pageState?.firstPage}
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
            setSize((event.target as HTMLInputElement).value as number)
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
