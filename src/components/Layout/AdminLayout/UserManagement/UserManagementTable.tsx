import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardBody from '@components/Card/CardBody';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ConfirmationModal from '@components/Modal/ConfirmationModal';
import TablesModal from '@components/Modal/TablesModal';
import { profileUsers } from '@helpers/tables';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ProfileResponse } from '@models/responses/user.res';
import {
  adminDeleteUserAsync,
  adminGetAllUsersAsync,
  adminGetUserProfileAsync,
} from '@reducers/admin/auth/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';
import PaginationFooter from './PaginationFooter';

interface IUser {
  _id: string;
  profileImage?: {
    imageUrl: string;
    imageId: string;
  };
  username: string;
  email: string;
  city: string;
}

const UserManagementTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();
  const { colorMode } = useAdminColorMode();

  // 顏色配置
  const bgColor = colorMode === 'light' ? 'white' : 'gray.800';
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.600';
  const hoverBg = colorMode === 'light' ? 'gray.50' : 'gray.700';

  // 狀態管理
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [isTablesModalOpen, setIsTablesModalOpen] = useState(false);
  const [tablesModalData, setTablesModalData] = useState<ProfileResponse[]>([]);

  const {
    list,
    userProfile,
    metadata,
    status: {
      deleteUserLoading,
      deleteUserSuccess,
      adminDetailUserProfileSuccess,
    },
    error: { deleteUserError },
  } = useAppSelector((state) => state.adminAuth);

  // 全選/取消全選
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(list?.map((user) => user._id) || []);
      setSelectedUsers(allIds);
    } else {
      setSelectedUsers(new Set());
    }
  };

  // 單選
  const handleSelectUser = (userId: string, checked: boolean) => {
    const newSelected = new Set(selectedUsers);
    if (checked) {
      newSelected.add(userId);
    } else {
      newSelected.delete(userId);
    }
    setSelectedUsers(newSelected);
  };

  // 查看用戶詳情
  const handleViewUser = (id: string) => {
    dispatch(adminGetUserProfileAsync(id));
  };

  // 刪除單個用戶
  const handleDeleteClick = (id: string) => {
    setUserIdToDelete(id);
    setIsConfirmationModalOpen(true);
  };

  // 確認刪除
  const handleConfirmDelete = () => {
    if (userIdToDelete) {
      dispatch(adminDeleteUserAsync(userIdToDelete));
      setUserIdToDelete(null);
      setIsConfirmationModalOpen(false);
    }
  };

  // 批量刪除
  const handleBatchDelete = () => {
    if (selectedUsers.size === 0) {
      toast({
        title: '請先選擇要刪除的用戶',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // TODO: 實作批量刪除 API
    toast({
      title: `將刪除 ${selectedUsers.size} 個用戶`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  // 將 ProfileResponse 轉換為 IUser
  const convertToIUser = (profile: ProfileResponse): IUser => ({
    _id: profile._id,
    profileImage: profile.profileImage,
    username: profile.username,
    email: profile.email,
    city: profile.city,
  });

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
      toast({
        title: '刪除成功',
        description: '用戶已成功刪除',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // 清除選中狀態
      setSelectedUsers(new Set());
      // 重新載入列表
      const page = parseInt(router.query.page as string) || 1;
      dispatch(adminGetAllUsersAsync({ page, limit: 10 }));
    }

    if (deleteUserError) {
      toast({
        title: '刪除失敗',
        description: deleteUserError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [deleteUserSuccess, deleteUserError, toast, dispatch, router.query.page]);

  const isAllSelected = Boolean(
    list && list.length > 0 && selectedUsers.size === list.length,
  );
  const isSomeSelected = Boolean(selectedUsers.size > 0 && !isAllSelected);

  return (
    <LoadingLayout isLoading={deleteUserLoading}>
      <Box>
        <Card bg={bgColor}>
          <CardBody p={0}>
            {/* 批量操作工具列 */}
            {selectedUsers.size > 0 && (
              <Flex
                px={6}
                py={4}
                bg='blue.50'
                borderBottom='1px'
                borderColor={borderColor}
                align='center'
                justify='space-between'
              >
                <HStack spacing={4}>
                  <Text fontWeight='medium' color='blue.700'>
                    已選擇 {selectedUsers.size} 個用戶
                  </Text>
                  <Button
                    size='sm'
                    colorScheme='red'
                    variant='ghost'
                    leftIcon={<DeleteIcon />}
                    onClick={handleBatchDelete}
                  >
                    批量刪除
                  </Button>
                </HStack>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => setSelectedUsers(new Set())}
                >
                  取消選擇
                </Button>
              </Flex>
            )}

            {/* 表格 */}
            <Box overflowX='auto' width='100%'>
              <Table variant='simple' size='md'>
                <Thead bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}>
                  <Tr>
                    <Th width='50px' borderRight='none'>
                      <Checkbox
                        isChecked={isAllSelected}
                        isIndeterminate={isSomeSelected}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        colorScheme='blue'
                        sx={{
                          '.chakra-checkbox__control': {
                            border: 'none',
                            bg: colorMode === 'light' ? 'white' : 'gray.600',
                            _checked: {
                              bg: 'blue.500',
                              borderColor: 'blue.500',
                            },
                          },
                        }}
                      />
                    </Th>
                    <Th>用戶</Th>
                    <Th>信箱</Th>
                    <Th>城市</Th>
                    <Th textAlign='right'>操作</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {list?.map((profile) => {
                    const user = convertToIUser(profile);
                    const isSelected = selectedUsers.has(user._id);

                    return (
                      <Tr
                        key={user._id}
                        bg={isSelected ? 'blue.50' : 'transparent'}
                        _hover={{ bg: hoverBg }}
                        transition='background 0.2s'
                      >
                        <Td borderRight='none'>
                          <Checkbox
                            isChecked={isSelected}
                            onChange={(e) =>
                              handleSelectUser(user._id, e.target.checked)
                            }
                            colorScheme='blue'
                            sx={{
                              '.chakra-checkbox__control': {
                                border: 'none',
                                bg:
                                  colorMode === 'light' ? 'white' : 'gray.600',
                                _checked: {
                                  bg: 'blue.500',
                                  borderColor: 'blue.500',
                                },
                              },
                            }}
                          />
                        </Td>
                        <Td>
                          <HStack spacing={3}>
                            <Avatar
                              size='sm'
                              name={user.username}
                              src={user.profileImage?.imageUrl}
                            />
                            <VStack align='flex-start' spacing={0}>
                              <Text
                                fontWeight='medium'
                                color={textColor}
                                fontSize='sm'
                              >
                                {user.username}
                              </Text>
                            </VStack>
                          </HStack>
                        </Td>
                        <Td>
                          <Text fontSize='sm' color={textColor}>
                            {user.email}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize='sm' color={textColor}>
                            {user.city || '-'}
                          </Text>
                        </Td>
                        <Td>
                          <HStack spacing={2} justify='flex-end'>
                            <IconButton
                              aria-label='查看'
                              icon={<ViewIcon />}
                              size='sm'
                              colorScheme='blue'
                              variant='ghost'
                              onClick={() => handleViewUser(user._id)}
                            />
                            <IconButton
                              aria-label='編輯'
                              icon={<EditIcon />}
                              size='sm'
                              colorScheme='gray'
                              variant='ghost'
                            />
                            <IconButton
                              aria-label='刪除'
                              icon={<DeleteIcon />}
                              size='sm'
                              colorScheme='red'
                              variant='ghost'
                              onClick={() => handleDeleteClick(user._id)}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>

            {/* 空狀態 */}
            {(!list || list.length === 0) && (
              <Flex
                direction='column'
                align='center'
                justify='center'
                py={12}
                color='gray.500'
              >
                <Text fontSize='lg' mb={2}>
                  沒有找到用戶
                </Text>
                <Text fontSize='sm'>請嘗試調整搜尋條件或新增用戶</Text>
              </Flex>
            )}
          </CardBody>
        </Card>

        {/* 分頁區域 - 獨立在 Card 外部 */}
        {metadata && list && list.length > 0 && (
          <PaginationFooter metadata={metadata} />
        )}
      </Box>

      {/* 確認刪除對話框 */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title='確認刪除'
        onConfirm={handleConfirmDelete}
      >
        您確定要刪除這個用戶嗎？此操作無法撤銷。
      </ConfirmationModal>

      {/* 用戶詳情對話框 */}
      <TablesModal
        isOpen={isTablesModalOpen}
        onClose={() => setIsTablesModalOpen(false)}
        data={tablesModalData}
        title='用戶詳細資訊'
        renderFields={profileUsers}
      />
    </LoadingLayout>
  );
};

export default UserManagementTable;
