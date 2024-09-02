import {
  Box,
  Button,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardBody from '@components/Card/CardBody';
import CardHeader from '@components/Card/CardHeader';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ConfirmationModal from '@components/Modal/ConfirmationModal';
import MessageModal from '@components/Modal/MessageModal';
import TablesModal from '@components/Modal/TablesModal';
import Pagination from '@components/Pagination';
import { TablesTableRow } from '@components/Tables/TablesTableRow';
import { clientUsersTables } from '@helpers/tables';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ClientUser } from '@models/entities/client-user';
import { resetAdminClientUsers } from '@reducers/admin/client-users';
import {
  adminDeleteClientUserAsync,
  adminGetAllClientUsersAsync,
  adminGetBlocksClientUsersAsync,
  adminGetClientUserAsync, // 新增這行來導入新的 action
  adminUpdateBlacklistStatusAsync,
} from '@reducers/admin/client-users/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface AuthorsProps {
  title: string;
  captions: string[];
}

interface IClientUser {
  _id: string;
  profileImage?: {
    imageUrl: string;
    imageId: string;
  };
  gender: string;
  address: string;
  username: string;
  email: string;
  city: string;
  roles: string[];
  birthday: Date;
  isBlacklisted: boolean;
}

const Members = ({ title, captions }: AuthorsProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const titleColor = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('white', 'white');
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isTablesModalOpen, setIsTablesModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [tablesModalData, setTablesModalData] = useState<ClientUser[]>([]);

  const {
    list,
    detail,
    metadata,
    blocksUsers, // 黑名單用戶列表
    status: {
      deleteClientUserFailed,
      deleteClientUserLoading,
      deleteClientUserSuccess,
      adminDetailClientUserProfileSuccess,
      updateBlacklistStatusFailed,
      updateBlacklistStatusLoading,
      updateBlacklistStatusSuccess,
    },
    error: { deleteClientUserError, updateBlacklistStatusError },
  } = useAppSelector((state) => state.adminClientUsers);

  const renderCell = [
    (user: IClientUser) => <Text>{user.username}</Text>,
    (user: IClientUser) => <Text>{user.email}</Text>,
    (user: IClientUser) => <Text>{user.city}</Text>,
    (user: IClientUser) => <Text>{user.address}</Text>,
    (user: IClientUser) => <Text>{user.gender}</Text>,
    (user: IClientUser) => (
      <Box display='flex' gap='1'>
        <Button
          bg='blue.300'
          size='sm'
          color={textColor}
          onClick={() => handleGetUser(user._id)}
        >
          查看
        </Button>
        <Button
          bg='red.300'
          size='sm'
          color={textColor}
          onClick={() => handleDeleteClick(user._id)}
        >
          刪除
        </Button>
        <Tooltip
          label={user.isBlacklisted ? '移除黑名單' : '加入黑名單'}
          aria-label='黑名單切換'
        >
          <Button
            size='sm'
            colorScheme={user.isBlacklisted ? 'red' : 'green'}
            onClick={() => handleBlacklistToggle(user._id, !user.isBlacklisted)}
          >
            {user.isBlacklisted ? '移除黑名單' : '加入黑名單'}
          </Button>
        </Tooltip>
      </Box>
    ),
  ];

  const handleGetUser = (id: string) => {
    dispatch(adminGetClientUserAsync(id));
  };

  const handleBlacklistToggle = (id: string, isBlacklisted: boolean) => {
    dispatch(adminUpdateBlacklistStatusAsync({ id, isBlacklisted }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setUserIdToDelete(id);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete) {
      dispatch(adminDeleteClientUserAsync(userIdToDelete));
      setUserIdToDelete(null);
      setIsConfirmationModalOpen(false);
    }
  };

  useEffect(() => {
    if (adminDetailClientUserProfileSuccess && detail) {
      setTablesModalData([detail]);
      setIsTablesModalOpen(true);
    }
  }, [adminDetailClientUserProfileSuccess, detail]);

  useEffect(() => {
    if (deleteClientUserSuccess) {
      setIsModalOpen(true);
      setModalContent('刪除會員帳號成功！');
    }

    if (deleteClientUserFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [deleteClientUserSuccess, deleteClientUserFailed]);

  useEffect(() => {
    if (updateBlacklistStatusSuccess) {
      toast({
        title: '黑名單狀態更新成功',
        description: '用戶的黑名單狀態已更新。',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }

    if (updateBlacklistStatusFailed) {
      toast({
        title: '黑名單狀態更新失敗',
        description: updateBlacklistStatusError || '更新黑名單狀態時發生錯誤。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [
    updateBlacklistStatusSuccess,
    updateBlacklistStatusFailed,
    toast,
    updateBlacklistStatusError,
  ]);

  useEffect(() => {
    const page = parseInt(router.query.page as string) || 1;
    dispatch(adminGetAllClientUsersAsync({ page, limit: 10 }));
    dispatch(adminGetBlocksClientUsersAsync({ page, limit: 10 })); // 新增這行來獲取黑名單用戶
  }, [dispatch, router.query.page]);

  useEffect(() => {
    setIsModalOpen(false);
    setIsTablesModalOpen(false);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetAdminClientUsers());
    };
  }, [dispatch]);

  return (
    <>
      <LoadingLayout
        isLoading={deleteClientUserLoading || updateBlacklistStatusLoading}
      >
        <Card>
          <CardHeader p='6px 0px 22px 0px'>
            <Text fontSize='xl' color={titleColor} fontWeight='bold'>
              {title}
            </Text>
          </CardHeader>
          <CardBody>
            <Box overflowX='auto' w='full'>
              <Table
                variant='simple'
                color={titleColor}
                size='sm'
                className='tables-container__table'
              >
                <Thead>
                  <Tr>
                    {captions.map((caption, idx) => (
                      <Th
                        key={idx}
                        className={`tables-container__header-cell ${
                          idx === 0 ? 'tables-container__sticky-column' : ''
                        }`}
                      >
                        {caption}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {list?.map((user, index) => (
                    <TablesTableRow
                      key={index}
                      row={user}
                      renderCell={renderCell}
                    />
                  ))}
                </Tbody>
              </Table>
            </Box>
          </CardBody>
          {metadata && list?.length !== 0 && <Pagination metadata={metadata} />}
        </Card>
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          title='確認刪除'
          onConfirm={handleConfirmDelete}
        >
          您確定要刪除這個帳號？
        </ConfirmationModal>
        <MessageModal
          title='刪除會員帳號'
          isActive={isModalOpen}
          error={deleteClientUserError}
          onClose={handleCloseModal}
        >
          {modalContent}
        </MessageModal>
        <TablesModal
          isOpen={isTablesModalOpen}
          onClose={() => setIsTablesModalOpen(false)}
          data={tablesModalData}
          title='會員詳細資訊'
          renderFields={clientUsersTables}
        />
      </LoadingLayout>
    </>
  );
};

export default Members;
