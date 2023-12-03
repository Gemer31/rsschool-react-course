import { ReackHookFieldProps } from '../../types';

export const ReactHookFormCheckbox = ({
  type,
  id,
  label,
  placeholder,
  formKey,
  error,
  register,
}: ReackHookFieldProps) => {
  return (
    <div className="checkbox">
      <div className="checkbox-field">
        <input
          id={id}
          className="checkbox-input"
          type={type}
          placeholder={placeholder}
          {...register(formKey)}
        />
        <label htmlFor={id} className="checkbox-label">
          {label}
        </label>
      </div>
      {error && <p className="input-error">{error.message}</p>}
    </div>
  );
};
