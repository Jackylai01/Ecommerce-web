/* eslint-disable @next/next/no-img-element */
import { icons } from '@fixtures/icons';
import { isBrowser } from '@helpers/util';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { iconSelectReset, selectIconClass } from '@reducers/icon-select';
import { useEffect, useRef } from 'react';

const AdminFileSelect = () => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLElement>(null);

  const { currentIconClass, active } = useAppSelector(
    (store) => store.iconSelect,
  );

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatch(iconSelectReset());
    }
  };

  useEffect(() => {
    if (!isBrowser() || !active) return;
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <article className={`modal${active ? ' active' : ''}`}>
      <main className='modal__main' ref={ref}>
        <header className='modal__header'>
          <h2>圖示選擇</h2>
          <p className='modal__header-actions'>
            <span
              className='icomoon-clear'
              onClick={() => dispatch(iconSelectReset())}
            ></span>
          </p>
        </header>
        <section className='modal__container icons'>
          <ul className='grid-4'>
            {icons.map((name) => (
              <li
                key={name}
                onClick={() => dispatch(selectIconClass(name))}
                style={{ cursor: 'pointer', justifyContent: 'center' }}
              >
                <span className={name}></span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </article>
  );
};

export default AdminFileSelect;
