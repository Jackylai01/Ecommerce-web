/* eslint-disable @next/next/no-img-element */
import { isBrowser } from '@helpers/util';
import { useEffect, useRef } from 'react';

type Props = {
  title: string;
  currentValue: any | null;
  setCurrentValue: Function;
  buttonFunction?: Function;
  children: React.ReactNode;
};

const Modal = ({
  title,
  currentValue,
  setCurrentValue,
  buttonFunction,
  children,
}: Props) => {
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setCurrentValue(null);
    }
  };

  useEffect(() => {
    if (!isBrowser() || !currentValue) return;
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <article className={`modal${currentValue ? ' active' : ''}`}>
      <main className='modal__main' ref={ref}>
        <header className='modal__header'>
          <h2>{title}</h2>
          <p className='modal__header-actions'>
            <span
              className='icomoon-cancel-circle'
              onClick={() => setCurrentValue(null)}
            ></span>
          </p>
        </header>
        <section className='modal__container'>{children}</section>
      </main>
    </article>
  );
};

export default Modal;
