import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import Pagination from '@components/Pagination';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ShoppingCredit } from '@models/responses/shoppingCredit';
import { resetShoppingCreditsState } from '@reducers/admin/shoppingCredits';
import {
  deleteExpiredShoppingCreditsAsync,
  deleteShoppingCreditAsync,
  getAllShoppingCreditsAsync,
  updateShoppingCreditStatusAsync,
} from '@reducers/admin/shoppingCredits/actions';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAdminColorMode } from 'src/context/colorMode';

const AllShoppingCreditsTab = () => {
  const {
    allCredits,
    allCreditsMetadata,
    status: {
      updateShoppingCreditStatusSuccess,
      updateShoppingCreditStatusFailed,
      deleteShoppingCreditSuccess,
      deleteShoppingCreditLoading,
      deleteShoppingCreditFailed,
      deleteExpiredShoppingCreditsSuccess,
      deleteExpiredShoppingCreditsFailed,
    },
    error: {
      updateShoppingCreditStatusError,
      deleteShoppingCreditError,
      deleteExpiredShoppingCreditsError,
    },
  } = useAppSelector((state) => state.adminShoppingCredits);

  const dispatch = useAppDispatch();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const bgColor = colorMode === 'light' ? 'white' : 'gray.700';

  useEffect(() => {
    dispatch(
      getAllShoppingCreditsAsync({
        page: 1,
        limit: 10,
        search,
        status: statusFilter,
      }),
    );
  }, [dispatch, search, statusFilter]);

  const handleStatusChange = (id: string, newStatus: string) => {
    dispatch(updateShoppingCreditStatusAsync({ id, status: newStatus }));
  };

  const handleDeleteExpiredCredits = () => {
    dispatch(deleteExpiredShoppingCreditsAsync());
  };

  useEffect(() => {
    if (deleteExpiredShoppingCreditsSuccess) {
      toast({
        title: '過期購物金已成功刪除',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (deleteExpiredShoppingCreditsFailed) {
      toast({
        title: '刪除過期購物金失敗',
        description: deleteExpiredShoppingCreditsError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    deleteExpiredShoppingCreditsError,
    deleteExpiredShoppingCreditsFailed,
    deleteExpiredShoppingCreditsSuccess,
  ]);

  useEffect(() => {
    if (updateShoppingCreditStatusSuccess) {
      toast({
        title: '購物金狀態更新成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(
        getAllShoppingCreditsAsync({
          page: 1,
          limit: 10,
          search,
          status: statusFilter,
        }),
      );
    } else if (updateShoppingCreditStatusFailed) {
      toast({
        title: '購物金狀態更新失敗',
        description: updateShoppingCreditStatusError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    dispatch,
    deleteExpiredShoppingCreditsError,
    updateShoppingCreditStatusFailed,
    updateShoppingCreditStatusSuccess,
    statusFilter,
  ]);

  useEffect(() => {
    if (deleteShoppingCreditSuccess) {
      toast({
        title: '購物金刪除成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (deleteShoppingCreditFailed) {
      toast({
        title: '購物金狀態更新失敗',
        description: deleteShoppingCreditError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    dispatch,
    deleteShoppingCreditError,
    deleteShoppingCreditFailed,
    deleteShoppingCreditSuccess,
  ]);

  const handleSearch = () => {
    dispatch(
      getAllShoppingCreditsAsync({
        page: 1,
        limit: 10,
        search,
        status: statusFilter,
      }),
    );
  };

  useEffect(() => {
    return () => {
      dispatch(resetShoppingCreditsState());
    };
  }, [dispatch]);

  return (
    <LoadingLayout isLoading={deleteShoppingCreditLoading}>
      <Box borderRadius='16px' boxShadow='md' overflow='hidden' minH='450px'>
        <Box
          bg={bgColor}
          borderRadius='16px'
          boxShadow='md'
          p='6'
          mb='8'
          className='animate-slide-up'
        >
          <Flex justifyContent='space-between' alignItems='center' mb='4'>
            <Heading
              as='h3'
              fontSize='xl'
              fontWeight='semibold'
              color={textColor}
            >
              購物金列表
            </Heading>
            <Button colorScheme='red' onClick={handleDeleteExpiredCredits}>
              刪除所有過期的購物金
            </Button>
          </Flex>
          <HStack mb='4' spacing='4'>
            <InputGroup>
              <Input
                placeholder='搜尋購物金'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                borderRadius='10px 20px 20px 10px'
              />
              <InputRightElement>
                <Button onClick={handleSearch} colorScheme='teal'>
                  <FaSearch />
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormControl>
              <Select
                placeholder='選擇狀態'
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value='unused'>未使用</option>
                <option value='used'>已使用</option>
              </Select>
            </FormControl>
          </HStack>
          <Box className='tables-container'>
            <Table className='tables-container__table' variant='simple'>
              <Thead bg={bgColor}>
                <Tr>
                  <Th
                    bg={bgColor}
                    color={textColor}
                    className='tables-container__header-cell tables-container__sticky-column'
                  >
                    用戶
                  </Th>
                  <Th bg={bgColor} color={textColor}>
                    電子郵件
                  </Th>
                  <Th bg={bgColor} color={textColor}>
                    金額
                  </Th>
                  <Th bg={bgColor} color={textColor}>
                    類型
                  </Th>
                  <Th bg={bgColor} color={textColor}>
                    狀態
                  </Th>
                  <Th bg={bgColor} color={textColor}>
                    有效期
                  </Th>
                  <Th bg={bgColor} color={textColor}>
                    操作
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {allCredits && allCredits.length > 0 ? (
                  allCredits.map((credit: ShoppingCredit) => (
                    <Tr key={credit?._id} color={textColor}>
                      <Td className='tables-container__header-cell tables-container__sticky-column'>
                        {credit?.user?.username || '未知用戶'}
                      </Td>
                      <Td className='tables-container__body-cell'>
                        {credit?.user?.email || '無電子郵件'}
                      </Td>
                      <Td className='tables-container__body-cell'>
                        {credit?.amount}
                      </Td>
                      <Td className='tables-container__body-cell'>
                        {credit?.creditType?.name || '未知類型'}
                      </Td>
                      <Td className='tables-container__body-cell'>
                        <Badge
                          colorScheme={
                            credit?.status === 'unused' ? 'green' : 'red'
                          }
                        >
                          {credit?.status === 'unused' ? '未使用' : '已使用'}
                        </Badge>
                      </Td>
                      <Td className='tables-container__body-cell'>
                        {credit?.expiryDate
                          ? new Date(credit.expiryDate).toLocaleDateString()
                          : '無'}
                      </Td>
                      <Td className='tables-container__body-cell'>
                        <Flex gap={2}>
                          <Select
                            value={credit?.status}
                            onChange={(e) =>
                              handleStatusChange(credit._id, e.target.value)
                            }
                            width='auto'
                            mr={2}
                          >
                            <option value='unused'>未使用</option>
                            <option value='used'>已使用</option>
                          </Select>
                          <Button
                            onClick={() =>
                              dispatch(deleteShoppingCreditAsync(credit?._id))
                            }
                            colorScheme='red'
                            variant='outline'
                          >
                            刪除
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={7} textAlign='center'>
                      尚無購物金
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        </Box>
        {allCreditsMetadata && <Pagination metadata={allCreditsMetadata} />}
      </Box>
    </LoadingLayout>
  );
};

export default AllShoppingCreditsTab;
