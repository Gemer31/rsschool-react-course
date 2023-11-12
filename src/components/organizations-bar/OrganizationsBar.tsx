import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OrganizationsList } from '../organizations-list/OrganizationsList';
import { PagesBar } from '../pages-bar/PagesBar';
import './OrganizationsBar.scss';
import organizationApi from '../../api/organization.api';
import {
  IOrganization,
  IOrganizationsResponse,
  IPage,
} from '../../models/organization.model';
import { Search } from '../search/Search';
import { useStorage } from '../../context/StorageContext';
import LOCAL_STORAGE_SEARCH_VALUE from '../../constants/common.constant';

export default function OrganizationsBar() {
  const { setItems, getItems, getDetails, setDetails } = useStorage();
  const [boundaryError, setBoundaryError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [organizations, setOrganizations] = useState([]);
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );
  const [pageState, setPageState] = useState<IPage>(() => {
    const queryPageNumberParam: number = searchParams.get(
      'pageNumber'
    ) as number;
    const queryPageSizeParam: number = searchParams.get('pageSize') as number;
    return {
      pageNumber:
        queryPageNumberParam && queryPageNumberParam > 0
          ? queryPageNumberParam - 1
          : 0,
      pageSize: queryPageSizeParam || 10,
      firstPage: true,
      lastPage: true,
    };
  });
  let loading: boolean = false;

  useEffect(() => {
    if (!loading) {
      loading = true;
      if (searchValue?.length) {
        loadItem();
      } else {
        loadList();
      }
    }
  }, [pageState.pageNumber, pageState.pageSize, searchValue]);

  const loadList = (): void => {
    const storageItems: IOrganizationsResponse = getItems(
      pageState.pageNumber,
      pageState.pageSize
    );
    (storageItems
      ? Promise.resolve(storageItems)
      : organizationApi.getItems(pageState.pageNumber, pageState.pageSize)
    )
      .then((response: IOrganizationsResponse) => {
        setOrganizations(response.organizations);
        !storageItems &&
          setItems(response, pageState.pageNumber, pageState.pageSize);
        setPageState(response.page);
        setSearchParams((prev) => {
          const newParams: {
            pageNumber: string;
            pageSize: string;
            search: string;
            uid?: string;
          } = {
            pageNumber: (response.page.pageNumber + 1) as string,
            pageSize: response.page.pageSize as string,
            search: localStorage.getItem(LOCAL_STORAGE_SEARCH_VALUE) || '',
          };
          if (prev.get('uid')) {
            newParams.uid = prev.get('uid');
          }
          return newParams;
        });
      })
      .finally(() => {
        loading = false;
      });
  };

  const loadItem = () => {
    const savedItem: IOrganization = getDetails(searchValue);
    (savedItem
      ? Promise.resolve(savedItem)
      : organizationApi.getDetails(searchValue)
    )
      .then((organization: IOrganization) => {
        setOrganizations(organization ? [organization] : []);
        !savedItem && setDetails(searchValue, organization);
      })
      .catch(() => setOrganizations([]))
      .finally(() => {
        setPageState((prev) => {
          return {
            ...prev,
            pageNumber: 0,
            firstPage: true,
            lastPage: true,
          };
        });
        setSearchParams((prev) => {
          const newParams: {
            pageNumber: string;
            pageSize: string;
            search: string;
            uid?: string;
          } = {
            pageNumber: '1',
            pageSize: prev.get('pageSize'),
            search: localStorage.getItem(LOCAL_STORAGE_SEARCH_VALUE) || '',
          };
          if (prev.get('uid')) {
            newParams.uid = prev.get('uid');
          }
          return newParams;
        });
        loading = false;
      });
  };

  if (boundaryError) {
    throw Error('Boundary Error');
  }

  return (
    <article className="organizations-bar">
      <header className="organizations-bar__header">
        <Search
          searchValue={searchValue}
          updateItemsCallback={(newSearchValue) =>
            setSearchValue(newSearchValue)
          }
        />
        <button
          type="button"
          className="button organizations-bar__error"
          onClick={() => setBoundaryError(true)}
        >
          Throw error
        </button>
      </header>
      <OrganizationsList items={organizations} loading={loading} />
      <PagesBar
        loading={loading}
        data={pageState}
        updatePagesData={(newPage, newSize) => {
          setPageState((prevState) => ({
            ...prevState,
            pageNumber: newPage,
            pageSize: newSize,
          }));
        }}
      />
    </article>
  );
}
