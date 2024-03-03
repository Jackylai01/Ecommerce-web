import { dotKeysValue } from '@helpers/object';
import { InnerProps } from '..';

const RadioOrCheckbox = ({
  register,
  formState: { errors },
  fieldConfig: {
    name,
    type,
    label,
    required,
    disabled,
    defaultValue,
    pattern,
    validate,
    col,
    options,
    displayOptions,
  },
}: InnerProps) => {
  return (
    <section className={`row__col row__col--${col}`}>
      <label className='form__input' htmlFor={name}>
        <b>
          {required && '* '}
          {label}
        </b>
        <ul>
          {options?.map((option, index) => (
            <li key={option}>
              <label htmlFor={option}>
                <input
                  {...register(name, {
                    required: required && `${label}為必填欄位`,
                    pattern,
                    validate,
                  })}
                  id={option}
                  type={type}
                  value={option}
                  multiple={type === 'checkbox'}
                  disabled={disabled}
                  defaultChecked={option === defaultValue}
                />
                {displayOptions?.[index]}
              </label>
            </li>
          ))}
        </ul>
        {dotKeysValue(errors, name) && (
          <span className='form__error-message'>
            {dotKeysValue(errors, name)?.message}
          </span>
        )}
      </label>
    </section>
  );
};
export default RadioOrCheckbox;
