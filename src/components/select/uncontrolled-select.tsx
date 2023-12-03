import { UncontrolledFieldProps } from '../../types.ts';

interface FormInputProps extends UncontrolledFieldProps {
  data: string[];
}

export const UncontrolledSelect = (props: FormInputProps) => {
  const { name, id, label, placeholder, data, error, ref } = props;

  return (
    <div className="input">
      <div className="input-field">
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`input-input ${error ? 'error' : ''}`}
          list={`${id}-browsers`}
          name={name}
          placeholder={placeholder}
          autoComplete="on"
        />
        <datalist id={`${id}-browsers`}>
          {data.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </datalist>
      </div>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};
