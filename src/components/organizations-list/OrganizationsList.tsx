import { IOrganization } from '../../models/organization.model';
import classes from './OrganizationsList.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loader from '../loader/Loader';

interface IOrganizationListProps {
  selectedOrganizationUid: string;
  data: IOrganization[];
  isLoading: boolean;
  linkClickCallback: () => void;
}

export default function OrganizationsList({
  data,
  selectedOrganizationUid,
  isLoading,
  linkClickCallback,
}: IOrganizationListProps) {
  const router = useRouter();
  const { pathname, query } = router;
  const [selectedUID, setSelectedUID] = useState(selectedOrganizationUid);

  const linkClick = (item: IOrganization) => {
    linkClickCallback();
    setSelectedUID(item.uid);
  };

  return (
    <div
      className={
        classes.organizationsList +
        (isLoading ? ` ${classes.loading}` : '') +
        (!data?.length ? ` ${classes.empty}` : '')
      }
    >
      {isLoading ? (
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
