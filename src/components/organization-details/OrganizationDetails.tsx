import { IOrganization } from '../../models/organization.model';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classes from './OrganizationDetails.module.scss';
import Loader from '../loader/Loader';
import { useGlobalContext } from '../../contexts/GlobalContext';

interface IOrganizationDetailsProps {
  data: IOrganization;
}

export default function OrganizationDetails({
  data,
}: IOrganizationDetailsProps) {
  const router = useRouter();
  const { query } = router;
  const { isLoadingDetails } = useGlobalContext();

  const convertKeyToInfoFormat = (key: string): string => {
    const copyKey = key[0].toUpperCase() + key.slice(1);
    let result = '';
    [...copyKey].forEach((char: string) => {
      result += char === char.toUpperCase() ? ' ' + char : char;
    });
    return result.trim();
  };

  return (
    <article
      role="organization-details"
      className={
        classes.organizationDetails +
        (isLoadingDetails ? ` ${classes.loading}` : '')
      }
    >
      {isLoadingDetails ? (
        <Loader />
      ) : (
        <>
          <Link
            role="organization-details-close-button"
            className={classes.organizationDetails__cross}
            href="/"
            onClick={() => {
              delete query.uid;
              router.push({ query });
            }}
          />
          <div
            role="organization-details-title"
            className={classes.organizationDetails__title}
          >
            {data.name}
          </div>
          <div className={classes.organizationDetails__info}>
            {Object.keys(data).map((dataKey: string) =>
              ['uid', 'name'].includes(dataKey) ? (
                ''
              ) : (
                <div role="details-param" key={data.uid + dataKey}>
                  {convertKeyToInfoFormat(dataKey)}-
                  <span
                    role="detailsValue"
                    className={
                      data[dataKey] ? classes.organizationDetails__infoTrue : ''
                    }
                  >
                    {data[dataKey] ? 'Yes' : 'No'}
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
