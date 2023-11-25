import { IOrganization } from '../../models/organization.model';
import classes from './OrganizationsList.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import { useGlobalContext } from '../../contexts/GlobalContext';

interface IOrganizationListProps {
  selectedOrganizationUid: string;
  data: IOrganization[];
}

export default function OrganizationsList({
  data,
  selectedOrganizationUid,
}: IOrganizationListProps) {
  const router = useRouter();
  const { pathname, query } = router;
  const { isLoadingItems, setIsLoadingItems, setIsLoadingDetails } =
    useGlobalContext();
  const [selectedUID, setSelectedUID] = useState(selectedOrganizationUid);

  useEffect(() => {
    console.log('!!!!!!!!!!!');
  }, [isLoadingItems]);

  useEffect(() => {
    data && setIsLoadingItems(false);
  }, [data]);

  const linkClick = (item: IOrganization) => {
    setIsLoadingDetails(true);
    setSelectedUID(item.uid);
  };

  return (
    <div
      className={
        classes.organizationsList +
        (isLoadingItems ? ` ${classes.loading}` : '') +
        (!data?.length ? ` ${classes.empty}` : '')
      }
    >
      {isLoadingItems ? (
        <Loader />
      ) : data?.length ? (
        data.map((item: IOrganization) => (
          <Link
            role="organization-list-item"
            href={{
              pathname,
              query: {
                pageNumber: query.pageNumber,
                pageSize: query.pageSize,
                search: query.search,
                uid: item.uid,
              },
            }}
            className={`${classes.organizationsListItem} ${
              selectedUID === item.uid ? ` ${classes.active}` : ''
            }`}
            onClick={() => linkClick(item)}
            key={item.name}
          >
            {item.name}
          </Link>
        ))
      ) : (
        'No items'
      )}
    </div>
  );
}
