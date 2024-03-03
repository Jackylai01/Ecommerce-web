import { dotKeysValue } from '@helpers/object';
import { InnerProps } from '..';

const BooleanField = ({
  register,
  formState: { errors },
  watch,
  fieldConfig: {
    name,
    label,
    required,
    disabled,
    defaultValue,
    pattern,
    validate,
    col,
  },
}: InnerProps) => {
  const defaultChecked = defaultValue?.toString() === 'true';
  const currentValue = watch(name) ?? defaultChecked;

  return (
    <section className={`row__col row__col--${col}`}>
      <label className='form__input' htmlFor={name}>
        <b>
          {required && '* '}
          {label}
        </b>
        <article className='form__radio'>
          <input
            {...register(name, {
              // required: required && `${label}為必填欄位`,
              pattern,
              validate,
            })}
            id={name}
            type='checkbox'
            disabled={disabled}
            defaultChecked={defaultChecked}
          />
          <span aria-hidden={currentValue}></span>
          {currentValue ? '是' : '否'}
        </article>
        {dotKeysValue(errors, name) && (
          <span className='form__error-message'>
            {dotKeysValue(errors, name)?.message}
          </span>
        )}
      </label>
    </section>
  );
};

export default BooleanField;
