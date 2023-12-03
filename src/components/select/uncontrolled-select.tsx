import { RefObject } from 'react';

interface FormInputProps {
  name: string;
  id: string;
  label: string;
  placeholder: string;
  data: string[];
  error?: string;
  inputRef: RefObject<HTMLInputElement>;
}

export const UncontrolledSelect = (props: FormInputProps) => {
  const { name, id, label, placeholder, data, error, inputRef } = props;

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
          name={name}
          placeholder={placeholder}
          autoComplete="on"
          ref={inputRef}
        />
        <datalist id={`${id}-browsers`}>
          {data.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </datalist>
      </div>
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};
