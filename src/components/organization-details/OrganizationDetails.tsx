import { useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './OrganizationDetails.scss';
import { Loader, LoaderColor } from '../loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchOrganizationDetails } from '../../store/reducers/ActionCreators';

export default function OrganizationDetails() {
  const [searchParams] = useSearchParams();
  let id = searchParams.get('uid');

  const dispatch = useAppDispatch();
  const details = useAppSelector(
    (state) => state.organizationDetails.details[id]
  );
  const isLoading = useAppSelector(
    (state) => state.organizationDetails.isLoading
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOrganizationDetails(id));
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
      className={'organization-details' + (isLoading ? ' _loading' : '')}
    >
      {isLoading ? (
        <Loader color={LoaderColor.SALMON} />
      ) : details ? (
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
            {details.name}
          </div>
          <div className="organization-details__info">
            {Object.keys(details).map((dataKey: string) =>
              ['uid', 'name'].includes(dataKey) ? (
                ''
              ) : (
                <div role="details-param" key={details.uid + dataKey}>
                  {convertKeyToInfoFormat(dataKey)}-
                  <span
                    role="detailsValue"
                    className={
                      'organization-details__info' +
                      (details[dataKey] ? '-true' : '-false')
                    }
                  >
                    {details[dataKey] ? 'Yes' : 'No'}
                  </span>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </article>
  );
}
