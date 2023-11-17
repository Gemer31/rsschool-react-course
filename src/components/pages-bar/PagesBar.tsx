import './PagesBar.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchOrganizations,
  fetchSearch,
} from '../../store/reducers/ActionCreators';
import LOCAL_STORAGE_SEARCH_VALUE from '../../constants/common.constant';
import { useSearchParams } from 'react-router-dom';
import { setPageData } from '../../store/slices/currentPageSlice';

export function PagesBar() {
  const isLoading = useAppSelector((state) => state.organizations.isLoading);
  const pageState = useAppSelector((state) => state.currentPage);
  const [size, setSize] = useState(pageState?.pageSize);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const organizations = useAppSelector(
    (state) => state.organizations.page[pageState.pageNumber]
  );
  const searchValue = useAppSelector((state) => state.search.value);

  useEffect(() => {
    const queryPageNumberParam: number = searchParams.get(
      'pageNumber'
    ) as number;
    const queryPageSizeParam: number = searchParams.get('pageSize') as number;

    const initPageNumber: number =
      queryPageNumberParam && queryPageNumberParam > 0
        ? queryPageNumberParam - 1
        : 0;
    const initPageSize: number = queryPageSizeParam || 10;

    if (!pageState.pageNumber) {
      dispatch(
        setPageData({
          pageNumber: initPageNumber,
          pageSize: initPageSize,
          firstPage: true,
          lastPage: true,
        })
      );
    }

    if (!organizations && !isLoading) {
      dispatch(
        searchValue
          ? fetchSearch(searchValue)
          : fetchOrganizations(pageState.pageNumber, pageState.pageSize)
      );
    }
  }, []);

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams: {
        pageNumber: string;
        pageSize: string;
        search: string;
        uid?: string;
      } = {
        pageNumber: pageState.pageNumber as string,
        pageSize: pageState.pageSize as string,
        search: localStorage.getItem(LOCAL_STORAGE_SEARCH_VALUE) || '',
      };
      if (prev.get('uid')) {
        newParams.uid = prev.get('uid');
      }
      return newParams;
    });
  }, [pageState]);

  const changePage = (type: '+' | '-'): void => {
    const newPage: number =
      type === '+' ? pageState.pageNumber + 1 : pageState.pageNumber - 1;
    if (!isLoading) {
      dispatch(fetchOrganizations(newPage, pageState.pageSize));
    }
  };

  const changeSize = () => {
    if (!isLoading) {
      dispatch(fetchOrganizations(0, size));
    }
  };

  return (
    <div className="pages-bar">
      <div className="pages-bar__state">
        <button
          role="nextPageButton"
          type="button"
          disabled={pageState?.firstPage}
          className="button pages-bar__button"
          onClick={() => changePage('-')}
        >
          <div className="pages-bar__icon _arrow" />
        </button>
        <span className="pages-bar__page">{pageState?.pageNumber + 1}</span>
        <button
          role="prevPageButton"
          type="button"
          className={
            'button pages-bar__button' +
            (pageState?.lastPage ? ' _disable' : '')
          }
          onClick={() => changePage('+')}
        >
          <div className="pages-bar__icon _arrow _rotate" />
        </button>
      </div>
      <form className="pages-bar__form">
        <input
          className="input pages-bar__form-field"
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
          <div className="pages-bar__icon _reload" />
        </button>
      </form>
    </div>
  );
}
