import { IForm } from "../../types.ts";
import classes from './form-card.module.scss';

interface IFormCardProps {
    data: IForm;
    index: number;
}
export const FormCard = ({ data, index }: IFormCardProps) => {
    return (
        <div key={index} className={classes.formCard}>
            {index === 0 && <span className={classes.formCard__label}>New</span>}
            <img className={classes.formCard__img} src={data.img} alt={data.name}/>
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