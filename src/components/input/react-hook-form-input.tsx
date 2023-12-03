import { ReackHookFieldProps } from '../../types';

export function ReactHookFormInput({
  type,
  id,
  label,
  placeholder,
  formKey,
  error,
  register,
}: ReackHookFieldProps) {
  return (
    <div className="input">
      <div className="input-field">
        {type !== 'checkbox' && (
          <label className="input-label" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          className={`input-input ${error ? 'error' : ''}`}
          type={type}
          autoComplete="on"
          placeholder={placeholder}
          {...register(formKey)}
        />
        {type === 'checkbox' && (
          <label className="input-label" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      {error && <p className="input-error">{error.message}</p>}
    </div>
  );
}
