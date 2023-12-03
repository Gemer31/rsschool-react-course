import { UncontrolledFieldProps } from '../../types.ts';

export const UncontrolledInput = ({
  name,
  type,
  id,
  label,
  placeholder,
  error,
  fieldRef,
}: UncontrolledFieldProps) => {
  return (
    <div className="input">
      <div className="input-field">
        {type !== 'checkbox' && (
          <label className="input-label" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          className={`input-input ${error ? 'error' : ''}`}
          type={type}
          name={name}
          autoComplete="on"
          id={id}
          ref={fieldRef}
          placeholder={placeholder}
        />
        {type === 'checkbox' && (
          <label className="input-label" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};
