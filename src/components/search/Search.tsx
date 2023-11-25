import classes from './Search.module.scss';
import { useEffect, useRef } from 'react';
import { setSearchValue } from '../../store/slices/searchSlice';
import { setPageData } from '../../store/slices/currentPageSlice';
import {useAppDispatch, useAppSelector} from "../../store/redux-hooks";
import LOCAL_STORAGE_SEARCH_VALUE from "../../constants/common.constant";

export default function Search() {
  const searchValue = useAppSelector((state) => state.search.value);
  const dispatch = useAppDispatch();
  const input = useRef();

  useEffect(() => {
    input.current.value = searchValue;
  }, []);

  // const searchClick = (newValue: string): void => {
  //   localStorage.setItem(LOCAL_STORAGE_SEARCH_VALUE, newValue);
  //   dispatch(setSearchValue(newValue));
  //   dispatch(
  //     setPageData({
  //       pageNumber: 1,
  //       firstPage: true,
  //       lastPage: true,
  //     })
  //   );
  // };

  return (
    <form className={classes.search__form}>
      <input
        ref={input}
        role="search-input"
        type="text"
        className={classes.search__formInput}
        placeholder="Type UID. Example: ORMA0000278954"
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
