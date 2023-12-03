import { UncontrolledFieldProps } from '../../types.ts';

export const UncontrolledCheckbox = ({
  name,
  type,
  id,
  label,
  placeholder,
  error,
  ref,
}: UncontrolledFieldProps) => {
  return (
    <div className="checkbox">
      <div className="checkbox-field">
        <input
          id={id}
          ref={ref}
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
