import { IOrganization } from '../../models/organization.model';
import classes from './OrganizationsList.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Loader, LoaderColor } from '../loader/Loader';
import { GlobalContext, IGlobalContext } from '../../contexts/LoadingContext';

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
  const loadings: IGlobalContext = useContext(GlobalContext);
  const [selectedUID, setSelectedUID] = useState(selectedOrganizationUid);

  useEffect(() => {
    if (data) {
      loadings.isLoadingItems = false;
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      loadings.isLoadingItems = false;
    }
  }, [data]);

  const linkClick = (item: IOrganization) => {
    loadings.isLoadingDetails = true;
    setSelectedUID(item.uid);
    router.push({
      query: {
        ...query,
        uid: item.uid,
      },
    });
  };

  return (
    <div
      className={
        classes.organizationsList +
        (loadings.isLoadingItems ? ` ${classes.loading}` : '') +
        (!data?.length ? ` ${classes.empty}` : '')
      }
    >
      {loadings.isLoadingItems ? (
        <Loader color={LoaderColor.SALMON} />
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
