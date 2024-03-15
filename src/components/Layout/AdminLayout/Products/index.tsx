import {
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ConfirmationModal from '@components/Modal/ConfirmationModal';
import MessageModal from '@components/Modal/MessageModal';
import Pagination from '@components/Pagination';
import TablesTableRow from '@components/Tables/TablesTableRow';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  deleteProductAsync,
  getAllProductsAsync,
  updateProductStatusAsync,
} from '@reducers/admin/products/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ProductRowData {
  _id: any;
  logo: string;
  name: string;
  description: string;
  status: 'onSale' | 'offSale';
  date: string;
}

const ProductTableContainer = () => {
  const dispatch = useAppDispatch();
  const textColor = useColorModeValue('gray.700', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMessageModalOpen,
    onOpen: onMessageModalOpen,
    onClose: onMessageModalClose,
  } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const {
    list: ProductList,
    metadata,
    productDetails,
    status: {
      getAllProductsLoading,
      deleteProductLoading,
      deleteProductSuccess,
      updateProductStatusSuccess,
      updateProductStatusFailed,
    },
    error: { deleteProductError, updateProductStatusError },
  } = useAppSelector((state) => state.adminProducts);

  const captions = ['Logo', 'Name', 'Description', 'Status'];

  const renderCell = [
    (row: any) => (
      <Avatar src={row.coverImage?.imageUrl} w='50px' borderRadius='12px' />
    ),
    (row: ProductRowData) => <Box>{row.name}</Box>,
    (row: ProductRowData) => <Box>{row.description}</Box>,
    (row: ProductRowData) => (
      <Badge colorScheme={row.status === 'onSale' ? 'green' : 'red'}>
        {row.status}
      </Badge>
    ),
    (row: ProductRowData) => (
      <Button colorScheme='blue' size='sm' onClick={() => editRow(row._id)}>
        編輯
      </Button>
    ),
    (row: ProductRowData) => (
      <Button
        colorScheme='red'
        size='sm'
        onClick={() => requestDelete(row._id)}
      >
        刪除
      </Button>
    ),
    (row: ProductRowData) => (
      <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor={`status-switch-${row._id}`} mb='0'>
          {row.status.includes('onSale') ? '上架' : '下架'}
        </FormLabel>
        <Switch
          id={`status-switch-${row._id}`}
          isChecked={row.status.includes('onSale')}
          onChange={(e) => handleStatusChange(row._id, e.target.checked)}
          size='sm'
        />
      </FormControl>
    ),
  ];

  const handleStatusChange = async (id: string, isChecked: boolean) => {
    const newStatus = isChecked ? 'onSale' : 'offShelf';
    dispatch(updateProductStatusAsync({ id, status: newStatus }));
  };

  const editRow = (row: ProductRowData) => {
    console.log('Editing row:', row);
  };

  const requestDelete = (id: any) => {
    setSelectedProductId(id);
    onOpen();
  };

  const deleteRow = async () => {
    if (selectedProductId) {
      dispatch(deleteProductAsync(selectedProductId));
      onClose();
    }
  };

  useEffect(() => {
    if (deleteProductSuccess || deleteProductError) {
      onMessageModalOpen();
    }
  }, [deleteProductSuccess, deleteProductError, onMessageModalOpen]);

  useEffect(() => {
    const page = parseInt(router.query.page as string) || 1;
    dispatch(getAllProductsAsync({ page, limit: 10 }));
  }, [router.query.page, dispatch]);

  useEffect(() => {
    if (updateProductStatusSuccess) {
      toast({
        title: '產品狀態更新成功',
        status: 'success',
        isClosable: true,
      });
    } else if (updateProductStatusFailed) {
      toast({
        title: '產品狀態更新失敗',
        description: updateProductStatusError || '未知錯誤。',
        status: 'error',
        isClosable: true,
      });
    }
  }, [
    updateProductStatusSuccess,
    updateProductStatusFailed,
    updateProductStatusError,
  ]);

  const modalContent = '您確定要刪除這個產品？';

  return (
    <>
      <LoadingLayout isLoading={getAllProductsLoading || deleteProductLoading}>
        <Box as='main' overflowX='auto' w='full' minWidth='800px'>
          <Table variant='simple' color={textColor} size='sm'>
            <Thead>
              <Tr>
                {captions.map((caption, idx) => (
                  <Th color='gray.400' key={idx}>
                    {caption}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {ProductList &&
                Array.isArray(ProductList) &&
                ProductList.map((product) => (
                  <TablesTableRow
                    key={product._id}
                    row={product}
                    renderCell={renderCell}
                  />
                ))}
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
        <MessageModal
          title='刪除產品'
          isActive={isMessageModalOpen}
          error={deleteProductError}
          onClose={onMessageModalClose}
        >
          {deleteProductSuccess && <Box>產品已成功刪除。</Box>}
          {deleteProductError && (
            <Box color='red.500'>{deleteProductError}</Box>
          )}
        </MessageModal>

        {metadata && <Pagination metadata={metadata} />}
      </LoadingLayout>
    </>
  );
};

export default ProductTableContainer;
