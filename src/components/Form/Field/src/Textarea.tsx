import { dotKeysValue } from '@helpers/object';
import { InnerProps } from '..';

const Textarea = ({
  register,
  formState: { errors },
  fieldConfig: {
    name,
    label,
    placeholder,
    required,
    disabled,
    defaultValue,
    pattern,
    validate,
    col,
  },
}: InnerProps) => {
  return (
    <section className={`row__col row__col--${col}`}>
      <label className='form__input' htmlFor={name}>
        <b>
          {required && '* '}
          {label}
        </b>
        <textarea
          {...register(name, {
            required: required && `${label}為必填欄位`,
            pattern,
            validate,
          })}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          cols={20}
          rows={10}
        />
        {dotKeysValue(errors, name) && (
          <span className='form__error-message'>
            {dotKeysValue(errors, name)?.message}
          </span>
        )}
      </label>
    </section>
  );
};

export default Textarea;
