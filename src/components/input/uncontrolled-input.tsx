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

export const UncontrolledInput = (props: FormInputProps) => {
  const { name, type, id, label, placeholder, error, inputRef } = props;

  return (
    <div className="input">
      <div className="input__content">
        {type !== 'checkbox' && (
          <label className="input__label" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          className={`input__input ${error ? 'error' : ''}`}
          type={type}
          name={name}
          autoComplete="on"
          id={id}
          ref={inputRef}
          placeholder={placeholder}
        />
        {type === 'checkbox' && (
          <label className="input__label" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};
