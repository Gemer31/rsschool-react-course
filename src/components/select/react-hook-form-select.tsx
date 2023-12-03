import { ReackHookFieldProps } from '../../types.ts';

interface IReactHookFormSelectProps extends ReackHookFieldProps {
  data: string[];
}

export function ReactHookFormSelect({
  id,
  label,
  placeholder,
  data,
  formKey,
  error,
  register,
}: IReactHookFormSelectProps) {
  return (
    <div className="input">
      <div className="input-field">
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
        <input
          className={`input-input ${error ? 'error' : ''}`}
          list={`${id}-browsers`}
          id={id}
          placeholder={placeholder}
          autoComplete="on"
          {...register(formKey)}
        />
        <datalist id={`${id}-browsers`}>
          {data.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </datalist>
      </div>
      {error && <p className="input-error">{error.message}</p>}
    </div>
  );
}
