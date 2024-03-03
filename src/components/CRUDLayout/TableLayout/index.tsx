import { Button, IconButton, useBreakpointValue } from '@chakra-ui/react';
import Modal from '@components/Modal';
import { CRUDConfig } from '@fixtures/crud-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetCrudLayoutStatus } from '@reducers/crud-layout';
import {
  crudLayoutDeleteAsync,
  crudLayoutListAsync,
} from '@reducers/crud-layout/actions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import TableLayoutUI from './TableLayoutUI';

type Props = {
  moduleName: string;
  config: CRUDConfig;
  isLoading?: boolean;
};

const TableLayout = ({
  moduleName,
  config: {
    title,
    apiModuleName,
    actions,
    listExtraActions,
    tableExtraActions,
    tableConfigs,
  },
  isLoading,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const buttonSize = useBreakpointValue({ base: 'xs', md: 'md', lg: 'lg' });
  const { query } = router;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [deleteData, setDeleteData] = useState<{ _id: string }>();

  const {
    list: listData,
    status: { deleteSuccess, listLoading, deleteLoading },
    error: { deleteError },
  } = useAppSelector((state) => state.crudLayout);

  useEffect(() => {
    if (!router.isReady || listLoading) return;
    dispatch(crudLayoutListAsync({ apiModuleName, query }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, apiModuleName, router.isReady]);

  useEffect(() => {
    if (!deleteSuccess) return;
    dispatch(crudLayoutListAsync({ apiModuleName, query }));
    dispatch(resetCrudLayoutStatus());
    setDeleteData(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSuccess]);

  const deleteAction = () => {
    dispatch(
      crudLayoutDeleteAsync({ apiModuleName, id: `${deleteData?._id}` }),
    );
  };

  return (
    <>
      <TableLayoutUI
        title={title}
        listData={listData}
        tableConfigs={tableConfigs}
        isLoading={listLoading || deleteLoading}
        actions={
          <>
            {listExtraActions?.map(({ label, color, href, onClick }) =>
              href ? (
                <Link key={label} href={href}>
                  <Button
                    className={`container__action container__action--${color}`}
                    bg={color}
                    color={color}
                    m='0rem 0.5rem'
                  >
                    {label}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={label}
                  className={`container__action${
                    color ? `container__action--${color}` : ''
                  }`}
                  onClick={onClick}
                >
                  {label}
                </Button>
              ),
            )}
            {actions?.includes('create') &&
              (isMobile ? (
                <Link href={`${moduleName}/create`}>
                  <IconButton
                    icon={<FaPlus />}
                    aria-label='新增'
                    variant='ghost'
                    color='white'
                  />
                </Link>
              ) : (
                <Link href={`${moduleName}/create`}>
                  <Button colorScheme='blue' color='white'>
                    新增
                  </Button>
                </Link>
              ))}
          </>
        }
        tableActions={(item) => (
          <>
            {actions?.includes('delete') && (
              <Button
                onClick={() => setDeleteData(item)}
                bg='red.500'
                color='white'
                size={buttonSize}
                m='0.5rem'
              >
                刪除
              </Button>
            )}
            {actions?.includes('update') && (
              <Link href={`${moduleName}/${item._id}`}>
                <Button
                  bg='orange.500'
                  color='white'
                  m='0.5rem'
                  size={buttonSize}
                >
                  編輯
                </Button>
              </Link>
            )}
            {tableExtraActions?.map(({ label, href, onClick }) =>
              href ? (
                <Link key={label} href={`${moduleName}/${item._id}/${href}`}>
                  <Button>{label}</Button>
                </Link>
              ) : (
                <a key={label} className='btn' onClick={onClick}>
                  {label}
                </a>
              ),
            )}
          </>
        )}
      />
      <Modal
        title='確認刪除'
        currentValue={deleteData}
        setCurrentValue={setDeleteData}
      >
        <p>{deleteError}</p>
        <button
          className='simple-btn'
          style={{ marginRight: 10 }}
          type='button'
          onClick={() => setDeleteData(undefined)}
        >
          取消
        </button>
        <button
          className='simple-btn simple-btn--danger'
          type='button'
          onClick={deleteAction}
        >
          確定
        </button>
      </Modal>
    </>
  );
};

export default TableLayout;
