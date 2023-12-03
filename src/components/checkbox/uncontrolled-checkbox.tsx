import { UncontrolledFieldProps } from '../../types.ts';

export const UncontrolledCheckbox = ({
  name,
  type,
  id,
  label,
  placeholder,
  error,
  fieldRef,
}: UncontrolledFieldProps) => {
  return (
    <div className="checkbox">
      <div className="checkbox-field">
        <input
          id={id}
          ref={fieldRef}
          className="checkbox-input"
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete="on"
        />

        <label htmlFor={id} className="checkbox-label">
          {label}
        </label>
      </div>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};
