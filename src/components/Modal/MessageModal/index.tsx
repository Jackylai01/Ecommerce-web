import { ADMIN_ROUTE } from '@fixtures/constants';
import Link from 'next/link';
import Modal from '..';

type Props = {
  title: string;
  active: boolean;
  error: string | null;
  close: React.MouseEventHandler;
  children?: React.ReactNode;
};

const MessageModal = ({ title, active, error, close, children }: Props) => {
  return (
    <Modal
      title={`${title}${error ? '失敗' : '成功'}`}
      currentValue={active}
      setCurrentValue={close}
    >
      {error && <p className='form__error-message margin-bottom'>{error}</p>}
      {children ? (
        <>{children}</>
      ) : (
        <>
          <button className='simple-btn' type='button' onClick={close}>
            關閉
          </button>
          <Link href={`/${ADMIN_ROUTE}`}>返回</Link>
        </>
      )}
    </Modal>
  );
};

export default MessageModal;
