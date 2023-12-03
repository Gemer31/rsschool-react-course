import { RHKInputProps } from "../../types.ts";

interface RHKSelectProps extends RHKInputProps {
  data: string[];
}

export const RHKSelect = (props: RHKSelectProps) => {
  const { id, label, placeholder, data, inputKey, error, register } = props;


  return (
    <div className="input">
      <div className="input__content">
        <label className="input__label" htmlFor={id}>
          {label}
        </label>
        <input
          className={`input__input ${error ? 'error' : ''}`}
          list={`${id}-browsers`}
          id={id}
          placeholder={placeholder}
          autoComplete="on"
          {...register(inputKey)}
        />
        <datalist id={`${id}-browsers`}>
          {data.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </datalist>
      </div>
      {error && <p className="input__error">{error.message}</p>}
    </div>
  );
};
