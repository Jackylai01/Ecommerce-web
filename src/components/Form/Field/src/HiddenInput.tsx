import { InnerProps } from '..';

const HiddenInput = ({
  register,
  fieldConfig: { name, defaultValue },
}: InnerProps) => {
  if (!defaultValue) return <></>;

  return (
    <section>
      <label className='form__input' htmlFor={name}>
        <input
          {...register(name)}
          id={name}
          type='hidden'
          defaultValue={defaultValue}
        />
      </label>
    </section>
  );
};

export default HiddenInput;
