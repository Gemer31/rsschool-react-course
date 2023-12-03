import { IStateForm } from '../../types.ts';
import classes from './form-card.module.scss';

interface IFormCardProps {
  data: IStateForm;
}
export const FormCard = ({ data }: IFormCardProps) => {
  return (
    <div className={classes.formCard}>
      {data.isNew && <span className={classes.formCard__label}>New</span>}
      <img className={classes.formCard__img} src={data.img} alt={data.name} />
      <div className={classes.formCardContent}>
        <p>
          <span>Name:</span> {data.name}
        </p>
        <p>
          <span>Age:</span> {data.age}
        </p>
        <p>
          <span>Email:</span> {data.email}
        </p>
        <p>
          <span>Gender:</span> {data.gender}
        </p>
        <p>
          <span>Country:</span> {data.country}
        </p>
        <p>
          <span>Password:</span> {data.password}
        </p>
        <p>
          <span>{'T&C:'}</span> {String(data.acceptTC)}
        </p>
      </div>
    </div>
  );
};
