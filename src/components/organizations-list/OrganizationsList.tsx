import { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { IOrganization } from '../../models/organization.model';
import { Loader, LoaderColor } from '../loader/Loader';
import './OrganizationsList.scss';

export interface IOrganizationsListProps {
  loading: boolean;
  items: IOrganization[];
}

export function OrganizationsList({ loading, items }: IOrganizationsListProps) {
  const [searchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<IOrganization>();
  const location = useLocation();

  useEffect(() => {
    const urlUid: string = searchParams.get('uid');
    setSelectedItem(items.find((item) => item.uid === urlUid) as IOrganization);
  }, [items, location]);

  const getLinkUrl = (uid): string => {
    return (
      'details/?' +
      `pageNumber=${searchParams.get('pageNumber')}` +
      `&pageSize=${searchParams.get('pageSize')}` +
      `&search=${searchParams.get('search')}` +
      `&uid=${uid}`
    );
  };
  return (
    <div
      className={
        'organizations-list' +
        (loading ? ' _loading' : '') +
        (!items?.length ? ' _empty' : '')
      }
    >
      {loading ? (
        <Loader color={LoaderColor.SALMON} />
      ) : items?.length ? (
        items?.map((item: IOrganization) => (
          <NavLink
            to={getLinkUrl(item.uid)}
            className={`organizations-list-item ${
              selectedItem?.name === item.name ? '_active' : ''
            }`}
            onClick={() => setSelectedItem(item)}
            key={item.name}
          >
            {item.name}
          </NavLink>
        ))
      ) : (
        'No items'
      )}
    </div>
  );
}
