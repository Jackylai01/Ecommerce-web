import {
  Box,
  Button,
  Flex,
  Switch,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
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

import { profileUsers } from '@helpers/tables';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ProfileResponse } from '@models/responses/user.res';
import {
  adminDeleteUserAsync,
  adminGetAllUsersAsync,
  adminGetUserProfileAsync,
  adminToggleUserRoleAsync,
} from '@reducers/admin/auth/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';

interface AuthorsProps {
  title: string;
  captions: string[];
  data?: any[];
}

interface IUser {
  _id: string;
  profileImage?: {
    imageUrl: string;
    imageId: string;
  };
  username: string;
  email: string;
  city: string;
  roles: string[];
}

const roleMapping: { [key: string]: string } = {
  admin: '管理員',
  staff: '員工',
};

const roleOptions = {
  admin: '管理員',
  staff: '員工',
};

const Authors = ({ title, captions }: AuthorsProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [isTablesModalOpen, setIsTablesModalOpen] = useState(false);
  const [tablesModalData, setTablesModalData] = useState<ProfileResponse[]>([]);

  const {
    list,
    userProfile,
    metadata,
    status: {
      deleteUserFailed,
      deleteUserLoading,
      deleteUserSuccess,
      adminDetailUserProfileSuccess,
    },
    error: { deleteUserError },
  } = useAppSelector((state) => state.adminAuth);

  const renderCell = [
    (user: IUser) => <Text>{user.username}</Text>,
    (user: IUser) => <Text>{user.email}</Text>,
    (user: IUser) => (
      <Flex align='center' justify='flex-start' gap='2' textAlign='center'>
        <Text>
          {user.roles.map((role) => roleMapping[role] || role).join(', ')}
        </Text>
        <Switch
          isChecked={user.roles.includes('admin')}
          onChange={() =>
            handleRoleChange(
              user._id,
              user.roles.includes('admin') ? 'staff' : 'admin',
            )
          }
          sx={{
            '.chakra-switch__track': {
              boxShadow: colorMode === 'light' ? '0 0 0 1px #afafaf' : 'none',
            },
            '.chakra-switch__thumb': {
              bg: user.roles.includes('admin') ? 'white' : 'gray.300',
            },
          }}
        />
      </Flex>
    ),
    (user: IUser) => <Text>{user.city}</Text>,
    (user: IUser) => (
      <Box display='flex' gap='1'>
        <Button
          bg='red.300'
          size='sm'
          onClick={() => handleDeleteClick(user._id)}
        >
          刪除
        </Button>
        <Button bg='blue.300' size='sm' onClick={() => handleGetUser(user._id)}>
          查看
        </Button>
      </Box>
    ),
  ];

  const handleGetUser = (id: string) => {
    dispatch(adminGetUserProfileAsync(id));
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    dispatch(adminToggleUserRoleAsync({ userId, newRole: newRole }));
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
      dispatch(adminDeleteUserAsync(userIdToDelete));
      setUserIdToDelete(null);
      setIsConfirmationModalOpen(false);
    }
  };

  useEffect(() => {
    if (adminDetailUserProfileSuccess && userProfile) {
      setTablesModalData([userProfile]);
      setIsTablesModalOpen(true);
    }
  }, [adminDetailUserProfileSuccess, userProfile]);

  useEffect(() => {
    const page = parseInt(router.query.page as string) || 1;
    dispatch(adminGetAllUsersAsync({ page, limit: 10 }));
  }, [dispatch, router.query.page]);

  useEffect(() => {
    if (deleteUserSuccess) {
      setIsModalOpen(true);
      setModalContent('刪除帳號成功！');
    }

    if (deleteUserFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [deleteUserFailed, deleteUserLoading, deleteUserSuccess]);

  useEffect(() => {
    setIsModalOpen(false);
    setIsTablesModalOpen(false);
  }, []);

  return (
    <>
      <LoadingLayout isLoading={deleteUserLoading}>
        <Card>
          <CardHeader p='6px 0px 22px 0px'>
            <Text fontSize='xl' color={textColor} fontWeight='bold'>
              {title}
            </Text>
          </CardHeader>
          <CardBody>
            <Box overflowX='auto' w='full'>
              <Table variant='simple' color={textColor} size='sm'>
                <Thead>
                  <Tr>
                    {captions.map((caption, idx) => (
                      <Th key={idx} minWidth='200px'>
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
          title='刪除帳號'
          isActive={isModalOpen}
          error={deleteUserError}
          onClose={handleCloseModal}
        >
          {modalContent}
        </MessageModal>
        <TablesModal
          isOpen={isTablesModalOpen}
          onClose={() => setIsTablesModalOpen(false)}
          data={tablesModalData}
          title='帳號資訊'
          renderFields={profileUsers}
        />
      </LoadingLayout>
    </>
  );
};

export default Authors;
