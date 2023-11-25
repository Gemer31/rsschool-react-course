import { useEffect, useState } from 'react';
import { setPageData } from '../../store/slices/currentPageSlice';
import { IPage } from '../../models/organization.model';
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import LOCAL_STORAGE_SEARCH_VALUE from "../../constants/common.constant";
import { useRouter } from "next/router";
import classes from './PagesBar.module.scss';


export default function PagesBar({ pageState }: { pageState: IPage }) {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector((state) => state.search.value);
  const [size, setSize] = useState(pageState?.pageSize);

  const router = useRouter();
  const { query } = router;

  // useEffect(() => {
  //   // const queryPageNumberParam: number = searchParams.get(
  //   //   'pageNumber'
  //   // ) as number;
  //   const queryPageNumberParam: number = 1;
  //   // const queryPageSizeParam: number = searchParams.get('pageSize') as number;
  //   const queryPageSizeParam: number = 10;
  //
  //   const initPageNumber: number =
  //     queryPageNumberParam > 0 ? queryPageNumberParam : 1;
  //   const initPageSize: number = queryPageSizeParam || 10;
  //
  //   if (!pageState?.pageNumber) {
  //     dispatch(
  //       setPageData({
  //         pageNumber: initPageNumber,
  //         pageSize: initPageSize,
  //         firstPage: true,
  //         lastPage: true,
  //       })
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   if (organizationDetailsData || (!organizationDetailsData && searchValue)) {
  //     const pageData: IPage = {
  //       pageSize: pageState.pageSize,
  //       pageNumber: 1,
  //       firstPage: true,
  //       lastPage: true,
  //     };
  //     dispatch(setPageData(pageData));
  //     dispatch(setSearchResult(organizationDetailsData?.organization));
  //     dispatch(setOrganizations(null));
  //   }
  // }, [organizationDetailsData]);

  // useEffect(() => {
  //   if (organizationsData && !searchValue) {
  //     const pageData: IPage = {
  //       ...organizationsData.page,
  //       pageNumber: organizationsData.page.pageNumber,
  //     };
  //     dispatch(setPageData(pageData));
  //     dispatch(setSearchResult(null));
  //     dispatch(
  //       setOrganizations({
  //         organizations: organizationsData.organizations,
  //         page: pageData,
  //       })
  //     );
  //   }
  // }, [organizationsData, searchValue]);

  const changePage = (type: '+' | '-'): void => {
    const newPage: number =
      type === '+' ? pageState.pageNumber + 1 : pageState.pageNumber - 1;
    // if (!isOrganizationsFetching && !isOrganizationDetailsFetching) {
    //   const pageData: IPage = {
    //     ...pageState,
    //     pageNumber: newPage,
    //   };
    //   dispatch(setPageData(pageData));
    // }

    router.push({
      query: {
        ...query,
        pageNumber: newPage,
        pageSize: pageState.pageSize as string,
        search: localStorage.getItem(LOCAL_STORAGE_SEARCH_VALUE) || '',
      }
    });
  };

  const changeSize = () => {
    // if (!isOrganizationsFetching && !isOrganizationDetailsFetching) {
    //   const pageData: IPage = {
    //     ...pageState,
    //     pageNumber: 1,
    //     pageSize: size,
    //   };
    //   dispatch(setPageData(pageData));
    // }
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
          <div className={classes.pagesBar__icon + " arrow"} />
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
          className={"input " + classes.pagesBar__formField}
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
          <div className={classes.pagesBar__icon + " reload"} />
        </button>
      </form>
    </div>
  );
}
