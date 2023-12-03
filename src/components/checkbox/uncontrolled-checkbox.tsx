import { RefObject } from 'react';

interface FormInputProps {
  name: string;
  type: string;
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  inputRef: RefObject<HTMLInputElement>;
}

export const UncontrolledCheckbox = (props: FormInputProps) => {
  const { name, type, id, label, placeholder, error, inputRef } = props;

  return (
    <div className="checkbox">
      <div className="checkbox__content">
        <input
          className="checkbox__input"
          type={type}
          name={name}
          autoComplete="on"
          id={id}
          ref={inputRef}
          placeholder={placeholder}
        />

        <label className="checkbox__label" htmlFor={id}>
          {label}
        </label>
      </div>
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};
