import './Search.scss';
import { useEffect, useRef } from 'react';
import LOCAL_STORAGE_SEARCH_VALUE from '../../constants/common.constant';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSearchValue } from '../../store/slices/searchSlice';
import { setPageData } from '../../store/slices/currentPageSlice';

export default function Search() {
  const searchValue = useAppSelector((state) => state.search.value);
  const dispatch = useAppDispatch();
  const input = useRef();

  useEffect(() => {
    input.current.value = searchValue;
  }, []);

  const searchClick = (newValue: string): void => {
    localStorage.setItem(LOCAL_STORAGE_SEARCH_VALUE, newValue);
    dispatch(setSearchValue(newValue));
    dispatch(
      setPageData({
        pageNumber: 1,
        firstPage: true,
        lastPage: true,
      })
    );
  };

  return (
    <form className="search__form">
      <input
        ref={input}
        role="search-input"
        type="text"
        className="search__form__input"
        placeholder="Type UID. Example: ORMA0000278954"
      />
      <button
        role="search-button"
        type="submit"
        className="search__form__button button"
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
