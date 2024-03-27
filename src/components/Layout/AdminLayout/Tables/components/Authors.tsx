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
  useColorModeValue,
} from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardBody from '@components/Card/CardBody';
import CardHeader from '@components/Card/CardHeader';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ConfirmationModal from '@components/Modal/ConfirmationModal';
import MessageModal from '@components/Modal/MessageModal';
import TablesModal from '@components/Modal/TablesModal';
import TablesTableRow from '@components/Tables/TablesTableRow';
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

interface AuthorsProps {
  title: string;
  captions: string[];
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
  const textColor = useColorModeValue('gray.700', 'white');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [isTablesModalOpen, setIsTablesModalOpen] = useState(false);
  const [tablesModalData, setTablesModalData] = useState<ProfileResponse[]>([]);

  const {
    list,
    userProfile,
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
          colorScheme='teal'
        />
      </Flex>
    ),
    (user: IUser) => <Text>{user.city}</Text>,
    (user: IUser) => (
      <Button
        colorScheme='red'
        size='sm'
        onClick={() => handleDeleteClick(user._id)}
      >
        刪除
      </Button>
    ),
    (user: IUser) => (
      <Button
        colorScheme='blue'
        size='sm'
        onClick={() => handleGetUser(user._id)}
      >
        查看
      </Button>
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
