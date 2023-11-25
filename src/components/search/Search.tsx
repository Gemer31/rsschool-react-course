import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { ISearchState } from '../../store/slices/searchSlice';
import classes from './Search.module.scss';

interface ISearchProps {
  data: ISearchState;
}

export default function Search({ data }: ISearchProps) {
  const router = useRouter();
  const { query } = router;
  const input = useRef();

  useEffect(() => {
    if (data?.value) {
      input.current.value = data.value;
    }
  });

  const searchClick = (newValue: string): void => {
    router.push({
      query: {
        ...query,
        search: newValue,
        pageNumber: 1,
      },
    });
  };

  return (
    <form className={classes.search__form}>
      <input
        ref={input}
        role="search-input"
        type="text"
        className={classes.search__formInput}
        placeholder="Search by UID: Example: ORMA0000278954"
      />
      <button
        role="search-button"
        type="submit"
        className={`${classes.search__formButton} button`}
        onClick={(event) => {
          event.preventDefault();
          searchClick(input.current.value);
        }}
      >
        Search
      </button>
    </form>
  );
}
