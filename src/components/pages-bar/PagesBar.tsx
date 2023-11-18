import './PagesBar.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import LOCAL_STORAGE_SEARCH_VALUE from '../../constants/common.constant';
import { useSearchParams } from 'react-router-dom';
import { setPageData } from '../../store/slices/currentPageSlice';
import { useFetchOrganizationDetailsQuery, useFetchOrganizationsQuery } from "../../services/OrganizationService";
import { setOrganizations } from "../../store/slices/organizationsSlice";
import { IPage } from "../../models/organization.model";
import { setSearchResult } from "../../store/slices/searchSlice";

export function PagesBar() {
    const dispatch = useAppDispatch();

    const searchValue = useAppSelector((state) => state.search.value);
    const pageState = useAppSelector((state) => state.currentPage);
    const [size, setSize] = useState(pageState?.pageSize);
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        data: organizationsData,
        isFetching: isOrganizationsFetching,
    } = useFetchOrganizationsQuery({pageNumber: pageState.pageNumber, pageSize: pageState.pageSize});
    const {
        data: organizationDetailsData,
        isFetching: isOrganizationDetailsFetching,
    } = useFetchOrganizationDetailsQuery(searchValue);

    useEffect(() => {
        const queryPageNumberParam: number = searchParams.get(
            'pageNumber'
        ) as number;
        const queryPageSizeParam: number = searchParams.get('pageSize') as number;

        const initPageNumber: number = queryPageNumberParam > 0 ? queryPageNumberParam : 1;
        const initPageSize: number = queryPageSizeParam || 10;

        if (!pageState?.pageNumber) {
            dispatch(
                setPageData({
                    pageNumber: initPageNumber,
                    pageSize: initPageSize,
                    firstPage: true,
                    lastPage: true,
                })
            );
        }
    }, []);

    useEffect(() => {
        if (organizationDetailsData || (!organizationDetailsData && searchValue)) {
            const pageData: IPage = {
                pageSize: pageState.pageSize,
                pageNumber: 1,
                firstPage: true,
                lastPage: true,
            };
            dispatch(setPageData(pageData));
            dispatch(setSearchResult(organizationDetailsData?.organization));
            dispatch(setOrganizations(null));
        }
    }, [organizationDetailsData]);

    useEffect(() => {
        if (organizationsData && !searchValue) {
            const pageData: IPage = {
                ...organizationsData.page,
                pageNumber: organizationsData.page.pageNumber,
            };
            dispatch(setPageData(pageData));
            dispatch(setSearchResult(null));
            dispatch(setOrganizations({
                organizations: organizationsData.organizations,
                page: pageData,
            }));
        }
    }, [organizationsData, searchValue]);

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
        if (!isOrganizationsFetching && !isOrganizationDetailsFetching) {
            const pageData: IPage = {
                ...pageState,
                pageNumber: newPage,
            };
            dispatch(setPageData(pageData));
        }
    };

    const changeSize = () => {
        if (!isOrganizationsFetching && !isOrganizationDetailsFetching) {
            const pageData: IPage = {
                ...pageState,
                pageNumber: 1,
                pageSize: size,
            };
            dispatch(setPageData(pageData));
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
                    <div className="pages-bar__icon _arrow"/>
                </button>
                <span className="pages-bar__page">{pageState?.pageNumber}</span>
                <button
                    role="prevPageButton"
                    type="button"
                    className={
                        'button pages-bar__button' +
                        (pageState?.lastPage ? ' _disable' : '')
                    }
                    onClick={() => changePage('+')}
                >
                    <div className="pages-bar__icon _arrow _rotate"/>
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
                    <div className="pages-bar__icon _reload"/>
                </button>
            </form>
        </div>
    );
}
