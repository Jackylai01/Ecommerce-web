import { DeleteIcon, InfoIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
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
  Tooltip,
  Tr,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardBody from '@components/Card/CardBody';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ConfirmationModal from '@components/Modal/ConfirmationModal';
import TablesModal from '@components/Modal/TablesModal';
import { clientUsersTables } from '@helpers/tables';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ClientUser } from '@models/entities/client-user';
import {
  adminDeleteClientUserAsync,
  adminGetAllClientUsersAsync,
  adminGetClientUserAsync,
  adminUpdateBlacklistStatusAsync,
} from '@reducers/admin/client-users/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';
import PaginationFooter from '../UserManagement/PaginationFooter';

const MemberManagementTable = () => {
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
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
    new Set(),
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [memberIdToDelete, setMemberIdToDelete] = useState<string | null>(null);
  const [isTablesModalOpen, setIsTablesModalOpen] = useState(false);
  const [tablesModalData, setTablesModalData] = useState<ClientUser[]>([]);

  const {
    list,
    detail,
    metadata,
    status: {
      deleteClientUserLoading,
      deleteClientUserSuccess,
      adminDetailClientUserProfileSuccess,
      updateBlacklistStatusLoading,
      updateBlacklistStatusSuccess,
      updateBlacklistStatusFailed,
    },
    error: { deleteClientUserError, updateBlacklistStatusError },
  } = useAppSelector((state) => state.adminClientUsers);

  // 全選/取消全選
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(
        list
          ?.map((member) => member._id)
          .filter((id): id is string => id !== undefined) || [],
      );
      setSelectedMembers(allIds);
    } else {
      setSelectedMembers(new Set());
    }
  };

  // 單選
  const handleSelectMember = (memberId: string, checked: boolean) => {
    const newSelected = new Set(selectedMembers);
    if (checked) {
      newSelected.add(memberId);
    } else {
      newSelected.delete(memberId);
    }
    setSelectedMembers(newSelected);
  };

  // 查看會員詳情
  const handleViewMember = (id: string) => {
    dispatch(adminGetClientUserAsync(id));
  };

  // 刪除單個會員
  const handleDeleteClick = (id: string) => {
    setMemberIdToDelete(id);
    setIsConfirmationModalOpen(true);
  };

  // 確認刪除
  const handleConfirmDelete = () => {
    if (memberIdToDelete) {
      dispatch(adminDeleteClientUserAsync(memberIdToDelete));
      setMemberIdToDelete(null);
      setIsConfirmationModalOpen(false);
    }
  };

  // 黑名單切換
  const handleBlacklistToggle = (id: string, isBlacklisted: boolean) => {
    dispatch(adminUpdateBlacklistStatusAsync({ id, isBlacklisted }));
  };

  // 批量刪除
  const handleBatchDelete = () => {
    if (selectedMembers.size === 0) {
      toast({
        title: '請先選擇要刪除的會員',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: `將刪除 ${selectedMembers.size} 個會員`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (adminDetailClientUserProfileSuccess && detail) {
      setTablesModalData([detail]);
      setIsTablesModalOpen(true);
    }
  }, [adminDetailClientUserProfileSuccess, detail]);

  useEffect(() => {
    const page = parseInt(router.query.page as string) || 1;
    dispatch(adminGetAllClientUsersAsync({ page, limit: 10 }));
  }, [dispatch, router.query.page]);

  useEffect(() => {
    if (deleteClientUserSuccess) {
      toast({
        title: '刪除成功',
        description: '會員已成功刪除',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setSelectedMembers(new Set());
      const page = parseInt(router.query.page as string) || 1;
      dispatch(adminGetAllClientUsersAsync({ page, limit: 10 }));
    }

    if (deleteClientUserError) {
      toast({
        title: '刪除失敗',
        description: deleteClientUserError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [
    deleteClientUserSuccess,
    deleteClientUserError,
    toast,
    dispatch,
    router.query.page,
  ]);

  useEffect(() => {
    if (updateBlacklistStatusSuccess) {
      toast({
        title: '黑名單狀態更新成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      const page = parseInt(router.query.page as string) || 1;
      dispatch(adminGetAllClientUsersAsync({ page, limit: 10 }));
    }

    if (updateBlacklistStatusFailed) {
      toast({
        title: '黑名單狀態更新失敗',
        description: updateBlacklistStatusError || '更新黑名單狀態時發生錯誤',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [
    updateBlacklistStatusSuccess,
    updateBlacklistStatusFailed,
    updateBlacklistStatusError,
    toast,
    dispatch,
    router.query.page,
  ]);

  const isAllSelected = Boolean(
    list && list.length > 0 && selectedMembers.size === list.length,
  );
  const isSomeSelected = Boolean(selectedMembers.size > 0 && !isAllSelected);

  return (
    <LoadingLayout
      isLoading={deleteClientUserLoading || updateBlacklistStatusLoading}
    >
      <Box>
        <Card bg={bgColor}>
          <CardBody p={0}>
            {/* 批量操作工具列 */}
            {selectedMembers.size > 0 && (
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
                    已選擇 {selectedMembers.size} 個會員
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
                  onClick={() => setSelectedMembers(new Set())}
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
                    <Th>會員</Th>
                    <Th>信箱</Th>
                    <Th>性別</Th>
                    <Th>城市</Th>
                    <Th>地址</Th>
                    <Th textAlign='center'>黑名單</Th>
                    <Th textAlign='right'>操作</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {list?.map((member) => {
                    const isSelected = member._id
                      ? selectedMembers.has(member._id)
                      : false;

                    return (
                      <Tr
                        key={member._id}
                        bg={isSelected ? 'blue.50' : 'transparent'}
                        _hover={{ bg: hoverBg }}
                        transition='background 0.2s'
                      >
                        <Td borderRight='none'>
                          <Checkbox
                            isChecked={isSelected}
                            onChange={(e) =>
                              member._id &&
                              handleSelectMember(member._id, e.target.checked)
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
                              name={member.username}
                              src={(member as any).profileImage?.imageUrl}
                            />
                            <VStack align='flex-start' spacing={0}>
                              <Text
                                fontWeight='medium'
                                color={textColor}
                                fontSize='sm'
                              >
                                {member.username}
                              </Text>
                            </VStack>
                          </HStack>
                        </Td>
                        <Td>
                          <Text fontSize='sm' color={textColor}>
                            {member.email}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize='sm' color={textColor}>
                            {member.gender || '-'}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize='sm' color={textColor}>
                            {member.city || '-'}
                          </Text>
                        </Td>
                        <Td>
                          <Tooltip label={member.address || '無地址資料'}>
                            <Text
                              fontSize='sm'
                              color={textColor}
                              noOfLines={1}
                              maxW='150px'
                            >
                              {member.address || '-'}
                            </Text>
                          </Tooltip>
                        </Td>
                        <Td textAlign='center'>
                          <Badge
                            colorScheme={member.isBlacklisted ? 'red' : 'green'}
                            borderRadius='full'
                            px={2}
                          >
                            {member.isBlacklisted ? '是' : '否'}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2} justify='flex-end'>
                            <Tooltip label='查看詳情'>
                              <IconButton
                                aria-label='查看'
                                icon={<ViewIcon />}
                                size='sm'
                                colorScheme='blue'
                                variant='ghost'
                                onClick={() =>
                                  member._id && handleViewMember(member._id)
                                }
                              />
                            </Tooltip>
                            <Tooltip
                              label={
                                member.isBlacklisted
                                  ? '移除黑名單'
                                  : '加入黑名單'
                              }
                            >
                              <IconButton
                                aria-label='黑名單'
                                icon={<InfoIcon />}
                                size='sm'
                                colorScheme={
                                  member.isBlacklisted ? 'red' : 'orange'
                                }
                                variant='ghost'
                                onClick={() =>
                                  member._id &&
                                  handleBlacklistToggle(
                                    member._id,
                                    !member.isBlacklisted,
                                  )
                                }
                              />
                            </Tooltip>
                            <Tooltip label='刪除會員'>
                              <IconButton
                                aria-label='刪除'
                                icon={<DeleteIcon />}
                                size='sm'
                                colorScheme='red'
                                variant='ghost'
                                onClick={() =>
                                  member._id && handleDeleteClick(member._id)
                                }
                              />
                            </Tooltip>
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
                  沒有找到會員
                </Text>
                <Text fontSize='sm'>請嘗試調整搜尋條件</Text>
              </Flex>
            )}
          </CardBody>
        </Card>

        {/* 分頁區域 */}
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
        您確定要刪除這個會員嗎？此操作無法撤銷。
      </ConfirmationModal>

      {/* 會員詳情對話框 */}
      <TablesModal
        isOpen={isTablesModalOpen}
        onClose={() => setIsTablesModalOpen(false)}
        data={tablesModalData}
        title='會員詳細資訊'
        renderFields={clientUsersTables}
      />
    </LoadingLayout>
  );
};

export default MemberManagementTable;
