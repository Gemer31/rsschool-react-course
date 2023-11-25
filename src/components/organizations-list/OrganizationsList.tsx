import { IOrganization } from '../../models/organization.model';
import classes from './OrganizationsList.module.scss';
import { useAppSelector } from "../../store/redux-hooks";
import Link from "next/link";
import { useRouter } from "next/router";

export default function OrganizationsList({ data }: {data: IOrganization[]}) {
  const router = useRouter();
  const { pathname, query } = router;

  const selectedDetailsUid = useAppSelector(
    (state) => state.organizationDetails.currentUID
  );
  const linkClick = (item: IOrganization) => {
    router.push({
      query: {
        ...query, uid: item.uid,
      }
    })
  };

  return (
    <div
      className={classes.organizationsList  + (!data?.length ? ' _empty' : '')}
    >
      {
        data?.length ? (
            data.map((item: IOrganization) => (
                <Link
                    role="organization-list-item"
                    href={{
                      // 'details/
                      pathname,
                      query: {
                        pageNumber: query.pageNumber,
                        pageSize: query.pageSize,
                        search: query.search,
                        uid: item.uid,
                      }
                    }}
                    className={`${classes.organizationsListItem} ${selectedDetailsUid === item.uid ? '_active' : ''}`}
                    onClick={() => linkClick(item)}
                    key={item.name}
                >
                  {item.name}
                </Link>
            ))
        ) : ('No items')
      }
    </div>
  );
}
