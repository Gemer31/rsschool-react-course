import { RHKInputProps } from '../../types';

export const RHKCheckbox = (props: RHKInputProps) => {
  const { type, id, label, placeholder, inputKey, error, register } = props;

  return (
    <div className="checkbox">
      <div className="checkbox__content">
        <input
          className="checkbox__input"
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(inputKey)}
        />

        <label className="checkbox__label" htmlFor={id}>
          {label}
        </label>
      </div>
      {error && <p className="input__error">{error.message}</p>}
    </div>
  );
};
