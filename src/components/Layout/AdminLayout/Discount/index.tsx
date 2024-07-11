import {
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Card from '@components/Card/Card';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ConfirmationModal from '@components/Modal/ConfirmationModal';
import Pagination from '@components/Pagination';
import { TablesTableRow } from '@components/Tables/TablesTableRow';
import { dateTime } from '@helpers/date';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  setDiscountList,
  setEditingDiscountId,
} from '@reducers/admin/discount';
import {
  deleteDiscountAsync,
  getAllDiscountsAsync,
  updateDiscountPriorityAsync,
  updateDiscountStatusAsync,
} from '@reducers/admin/discount/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdOutlineSort } from 'react-icons/md';
import { useAdminColorMode } from 'src/context/colorMode';

interface DiscountRowData {
  _id: any;
  name: string;
  type: string;
  value: number;
  calculationMethod: string;
  startDate: string;
  endDate: string;
  minimumAmount?: number;
  isActive: boolean;
  priority: number;
}

const DiscountTableContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const bgColor = colorMode === 'light' ? 'white' : 'gray.700';
  const borderColor = colorMode === 'light' ? 'black' : 'white';
  const { editingDiscountId, list } = useAppSelector(
    (state) => state.adminDiscount,
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [sort, setSort] = useState('-createdAt');

  const {
    list: DiscountList,
    metadata,
    status: {
      getAllDiscountsLoading,
      deleteDiscountLoading,
      updateDiscountLoading,
      updateDiscountPrioritySuccess,
      updateDiscountPriorityFailed,
    },
    error: {
      deleteDiscountError,
      updateDiscountError,
      updateDiscountPriorityError,
    },
  } = useAppSelector((state) => state.adminDiscount);

  const [localPriority, setLocalPriority] = useState<{ [key: string]: number }>(
    {},
  );

  const captions = [
    '名稱',
    '類型',
    '折扣值',
    '計算方式',
    '開始日期',
    '結束日期',
    '最低金額',
    '狀態',
    '優先順序',
    '操作',
  ];

  const discountTypeTranslation = (type: string) => {
    const typeMap: { [key: string]: string } = {
      orderDiscount: '訂單折扣',
      productDiscount: '產品折扣',
      orderFreeShipping: '訂單免運費',
      productFreeShipping: '產品免運費',
      productCodeDiscount: '產品代碼折扣',
      orderCodeDiscount: '訂單代碼折扣',
    };
    return typeMap[type] || type;
  };

  const calculationMethodTranslation = (method: string) => {
    const methodMap: { [key: string]: string } = {
      percentage: '百分比',
      fixedAmount: '固定金額',
    };
    return methodMap[method] || method;
  };

  const renderCell = [
    (row: DiscountRowData) => <Box>{row.name}</Box>,
    (row: DiscountRowData) => <Box>{discountTypeTranslation(row.type)}</Box>,
    (row: DiscountRowData) => <Box>{row.value || 0}</Box>,
    (row: DiscountRowData) => (
      <Box>
        {calculationMethodTranslation(row.calculationMethod) || '固定金額'}
      </Box>
    ),
    (row: DiscountRowData) => <Box>{dateTime(row.startDate)}</Box>,
    (row: DiscountRowData) => <Box>{dateTime(row.endDate)}</Box>,
    (row: DiscountRowData) => <Box>{row.minimumAmount || '-'}</Box>,
    (row: DiscountRowData) => (
      <Badge bg='none' color={row.isActive ? 'green.300' : 'red.300'}>
        {row.isActive ? '啟用' : '停用'}
      </Badge>
    ),
    (row: DiscountRowData) => (
      <FormControl>
        <Input
          type='number'
          value={localPriority[row._id] || 0}
          onChange={(e) =>
            setLocalPriority({
              ...localPriority,
              [row._id]: parseInt(e.target.value),
            })
          }
          onBlur={() => handlePriorityChange(row._id, localPriority[row._id])}
          width='60px'
        />
      </FormControl>
    ),
    (row: DiscountRowData) => (
      <Box display='flex' gap={2}>
        <Button
          bg='blue.500'
          color='white'
          size='sm'
          onClick={() => handleEdit(row._id)}
        >
          編輯
        </Button>
        <Button
          bg='red.300'
          size='sm'
          color='white'
          onClick={() => requestDelete(row._id)}
        >
          刪除
        </Button>
      </Box>
    ),
    (row: DiscountRowData) => (
      <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor={`status-switch-${row._id}`} mb='0'>
          {row.isActive ? '啟用' : '停用'}
        </FormLabel>
        <Switch
          id={`status-switch-${row._id}`}
          isChecked={row.isActive}
          onChange={(e) => handleStatusChange(row._id, e.target.checked)}
          size='sm'
          sx={{
            '.chakra-switch__track': {
              boxShadow: colorMode === 'light' ? '0 0 0 1px #afafaf' : 'none',
            },
            '.chakra-switch__thumb': {
              bg: row.isActive ? 'white' : 'gray.300',
            },
          }}
        />
      </FormControl>
    ),
  ];

  const handlePriorityChange = (id: string, priority: number) => {
    dispatch(updateDiscountPriorityAsync({ id, priority })).then(() => {
      const updatedList = list?.map((discount) =>
        discount._id === id ? { ...discount, priority } : discount,
      );

      if (updatedList) {
        dispatch(setDiscountList(updatedList));
      }
    });
  };

  const handleStatusChange = async (id: string, isChecked: boolean) => {
    const newStatus = isChecked;
    dispatch(updateDiscountStatusAsync({ id, isActive: newStatus }));
  };

  const handleEdit = (discountId: string) => {
    router.push(`/zigong/discounts/${discountId}`);
  };

  const requestDelete = (id: any) => {
    dispatch(setEditingDiscountId(id));
    onOpen();
  };

  const deleteRow = async () => {
    if (editingDiscountId) {
      dispatch(deleteDiscountAsync(editingDiscountId));
      onClose();
    }
  };

  const handleSortChange = (sortOption: string) => {
    setSort(sortOption);
  };

  useEffect(() => {
    if (updateDiscountPrioritySuccess) {
      toast({
        title: '建立順序更新',
        description: '更新成功',
        status: 'success',
        isClosable: true,
      });
    }
    if (updateDiscountPriorityFailed) {
      toast({
        title: '建立訂單失敗',
        description: updateDiscountPriorityError,
        status: 'error',
        isClosable: true,
      });
    }
  }, [
    updateDiscountPrioritySuccess,
    updateDiscountPriorityFailed,
    updateDiscountPriorityError,
    toast,
  ]);

  useEffect(() => {
    if (DiscountList) {
      const initialPriorities = DiscountList.reduce((acc, discount) => {
        if (discount.priority !== undefined) {
          acc[discount._id] = discount.priority;
        }
        return acc;
      }, {} as { [key: string]: number });
      setLocalPriority(initialPriorities);
    }
  }, [DiscountList]);

  useEffect(() => {
    const fetchData = async () => {
      const page = parseInt(router.query.page as string, 10) || 1;
      const limit = 10;
      dispatch(getAllDiscountsAsync({ page, limit, sort }));
    };
    fetchData();
  }, [dispatch, router.query.page, sort]);

  const modalContent = '您確定要刪除這個折扣？';

  return (
    <>
      <LoadingLayout
        isLoading={getAllDiscountsLoading || deleteDiscountLoading}
      >
        <Card>
          <Box as='main' overflowX='auto' w='full'>
            <Table variant='simple' color={bgColor} size='sm'>
              <Thead>
                <Tr>
                  {captions.map((caption, idx) => (
                    <Th
                      color='gray.400'
                      key={idx}
                      minWidth='120px'
                      whiteSpace='nowrap'
                    >
                      {caption}
                    </Th>
                  ))}
                  <Th>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<MdOutlineSort color={borderColor} size='20px' />}
                        variant='outline'
                      />
                      <MenuList shadow='md' bg={bgColor}>
                        <MenuItem
                          bg={bgColor}
                          color={textColor}
                          onClick={() => handleSortChange('-createdAt')}
                        >
                          創建時間 (最新)
                        </MenuItem>
                        <MenuItem
                          bg={bgColor}
                          color={textColor}
                          onClick={() => handleSortChange('createdAt')}
                        >
                          創建時間 (最舊)
                        </MenuItem>
                        <MenuItem
                          bg={bgColor}
                          color={textColor}
                          onClick={() => handleSortChange('-value')}
                        >
                          折扣值 (高到低)
                        </MenuItem>
                        <MenuItem
                          bg={bgColor}
                          color={textColor}
                          onClick={() => handleSortChange('value')}
                        >
                          折扣值 (低到高)
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {DiscountList && DiscountList.length > 0 ? (
                  DiscountList.map((discount) => (
                    <TablesTableRow
                      key={discount._id}
                      row={discount}
                      renderCell={renderCell}
                    />
                  ))
                ) : (
                  <Tr>
                    <Td
                      colSpan={captions.length + 1}
                      textAlign='center'
                      border='none'
                      color='gray.700'
                    >
                      沒有找到折扣，請新增折扣。
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>

          <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            title='確認要刪除?'
            onConfirm={deleteRow}
          >
            {modalContent}
          </ConfirmationModal>

          {metadata && DiscountList?.length !== 0 && (
            <Pagination metadata={metadata} />
          )}
        </Card>
      </LoadingLayout>
    </>
  );
};

export default DiscountTableContainer;
