import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './OrganizationDetails.scss';
import organizationApi from '../../api/organization.api';
import { Loader, LoaderColor } from '../loader/Loader';
import { IOrganization } from '../../models/organization.model';
import { useStorage } from '../../context/StorageContext';

export default function OrganizationDetails() {
  const { getDetails, setDetails } = useStorage();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState(null);
  const id = searchParams.get('uid');

  useEffect(() => {
    if (id) {
      setLoading(true);
      try {
        const detailsItem: IOrganization = getDetails(id);
        (detailsItem
          ? Promise.resolve(detailsItem)
          : organizationApi.getDetails(id)
        )
          .then((response: IOrganization) => {
            if (response) {
              setOrganization(response);
              !detailsItem && setDetails(id, response);
            } else {
              throw new Error(`Can not find organization with uid=${id}`);
            }
          })
          .finally(() => setLoading(false));
      } catch {
        throw new Error(`Can not find organization with uid=${id}`);
      }
    }
  }, [id]);

  const convertKeyToInfoFormat = (key: string): string => {
    const copyKey = key[0].toUpperCase() + key.slice(1);
    let result = '';
    [...copyKey].forEach((char: string) => {
      result += char === char.toUpperCase() ? ' ' + char : char;
    });
    return result.trim();
  };

  const getLinkUrl = (): string => {
    return (
      `/?pageNumber=${searchParams.get('pageNumber')}` +
      `&pageSize=${searchParams.get('pageSize')}` +
      `&search=${searchParams.get('search')}`
    );
  };

  return (
    <article
      role="organization-details"
      className={'organization-details' + (loading ? ' _loading' : '')}
    >
      {loading ? (
        <Loader color={LoaderColor.SALMON} />
      ) : (
        <>
          <NavLink
            role="organization-details-close-button"
            className="organization-details__cross"
            to={getLinkUrl()}
          />
          <div
            role="organization-details-title"
            className="organization-details__title"
          >
            {organization.name}
          </div>
          <div className="organization-details__info">
            {Object.keys(organization).map((dataKey: string) =>
              ['uid', 'name'].includes(dataKey) ? (
                ''
              ) : (
                <div role="details-param" key={organization.uid + dataKey}>
                  {convertKeyToInfoFormat(dataKey)}-
                  <span
                    role="detailsValue"
                    className={
                      'organization-details__info' +
                      (organization[dataKey] ? '-true' : '-false')
                    }
                  >
                    {organization[dataKey] ? 'Yes' : 'No'}
                  </span>
                </div>
              )
            )}
          </div>
        </>
      )}
    </article>
  );
}
