import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './OrganizationDetails.scss';
import organizationApi from '../../api/organization.api';
import { Loader, LoaderColor } from '../loader/Loader';

export default function OrganizationDetails() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState(null);
  const id = searchParams.get('uid');

  useEffect(() => {
    if (id) {
      setLoading(true);
      try {
        organizationApi
          .getDetails(id)
          .then((response) => {
            if (response) {
              setOrganization(response);
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
    <article className={'organization-details' + (loading ? ' _loading' : '')}>
      {loading ? (
        <Loader color={LoaderColor.SALMON} />
      ) : (
        <>
          <NavLink className="organization-details__cross" to={getLinkUrl()} />
          <div className="organization-details__title">{organization.name}</div>
          <div className="organization-details__info">
            {Object.keys(organization).map((dataKey: string) =>
              ['uid', 'name'].includes(dataKey) ? (
                ''
              ) : (
                <div key={organization.uid + dataKey}>
                  {convertKeyToInfoFormat(dataKey)}-
                  <span
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
