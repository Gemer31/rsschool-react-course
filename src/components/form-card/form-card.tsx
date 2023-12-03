import { IStateForm } from '../../types.ts';
import classes from './form-card.module.scss';

interface IFormCardProps {
  data: IStateForm;
  index: number;
}
export const FormCard = ({ data, index }: IFormCardProps) => {
  return (
    <div className={classes.formCard}>
      {index === 0 && (
        <span
          className={`${classes.formCard__label} ${
            data.isNew ? '' : classes.labelHide
          }`}
        >
          New
        </span>
      )}
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
