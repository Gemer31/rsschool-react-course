import './Search.scss';
import { useEffect, useRef } from 'react';
import LOCAL_STORAGE_SEARCH_VALUE from '../../constants/common.constant';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSearchValue } from '../../store/slices/searchSlice';
import {
  fetchOrganizationDetails,
  fetchOrganizations,
  fetchSearch,
} from '../../store/reducers/ActionCreators';

export function Search() {
  const searchValue = useAppSelector((state) => state.search.value);
  const dispatch = useAppDispatch();
  const input = useRef();
  const pageState = useAppSelector((state) => state.currentPage);

  useEffect(() => {
    input.current.value = searchValue;
  }, []);

  const searchClick = (newValue: string): void => {
    localStorage.setItem(LOCAL_STORAGE_SEARCH_VALUE, newValue);
    dispatch(setSearchValue(newValue));
    dispatch(
      newValue
        ? fetchSearch(newValue)
        : fetchOrganizations(pageState.pageNumber, pageState.pageSize)
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
