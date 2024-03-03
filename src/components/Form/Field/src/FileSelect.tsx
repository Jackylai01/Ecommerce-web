/* eslint-disable @next/next/no-img-element */
import { ADMIN_ROUTE } from '@fixtures/constants';
import { dotKeysValue } from '@helpers/object';
import { getMainRoute } from '@helpers/router';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { useRouter } from 'next/router';
import { InnerProps } from '..';

const FileSelect = ({
  register,
  watch,
  setValue,
  setError,
  clearErrors,
  formState: { errors },
  fieldConfig: {
    name,
    type,
    label,
    placeholder,
    required,
    disabled,
    defaultValue,
    accept,
    pattern,
    validate,
    col,
    max,
  },
}: InnerProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    fieldName: adminFieldName,
    file: adminFile,
    status: { uploadLoading: adminUploadLoading },
  } = useAppSelector((state) => state.adminUpload);

  const mainRoute = getMainRoute(router.pathname);
  const isAdmin = mainRoute === ADMIN_ROUTE;
  const currentValue = watch(name) ?? defaultValue;

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList?.length) return;
    const file = fileList[0];

    const notValidSize = Number(max) && file.size > Number(max) * 1024 * 1024;
    if (notValidSize) {
      setError(name, {
        type: 'custom',
        message: `上傳的每個檔案需小於 ${max} MB`,
      });
      return;
    } else {
      clearErrors(name);
    }
  };

  return (
    <section className={`row__col row__col--${col}`}>
      <label className='form__input' htmlFor={name}>
        <b>
          {required && '* '}
          {label}
        </b>
        <article className='file-select'>
          <section className='file-select__container'>
            {type === 'imageSelect' && (
              <img
                className='file-select__img'
                src={currentValue ?? defaultValue}
                alt='上傳的圖片'
              />
            )}
            {type === 'videoSelect' && (
              <video width='100%' controls>
                <source src={currentValue ?? defaultValue} type='video/mp4' />
              </video>
            )}

            {type === 'imageSelect' && <span className='icomoon-image' />}
            {type === 'videoSelect' && <span className='icomoon-film' />}
          </section>

          <section className='file-select__input'>
            <input
              {...register(name, {
                required: required && `${label}為必填欄位`,
                pattern,
                validate,
              })}
              id={name}
              type='text'
              placeholder={placeholder}
              disabled={disabled}
              defaultValue={defaultValue}
            />
          </section>

          <footer className='file-select__footer'>
            <a className='form__file-upload' onClick={() => setValue(name, '')}>
              上傳
              <input
                type='file'
                id={`${name}File`}
                accept={accept}
                onChange={upload}
              />
            </a>
            <a className='text-danger' onClick={() => setValue(name, '')}>
              清除
            </a>
          </footer>
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

export default FileSelect;
