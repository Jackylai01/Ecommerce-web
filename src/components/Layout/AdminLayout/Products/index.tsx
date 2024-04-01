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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ProductFormContent } from '@components/Form/FormCRUD/ProductsContent';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ConfirmationModal from '@components/Modal/ConfirmationModal';
import FormModal from '@components/Modal/FormModal';
import MessageModal from '@components/Modal/MessageModal';
import Pagination from '@components/Pagination';
import TablesTableRow from '@components/Tables/TablesTableRow';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetProductState } from '@reducers/admin/products';
import {
  addProductAsync,
  deleteProductAsync,
  getAllProductsAsync,
  updateProductAsync,
  updateProductStatusAsync,
} from '@reducers/admin/products/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<any>(null);
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';

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
      updateProductLoading,
    },
    error: { deleteProductError, updateProductStatusError },
  } = useAppSelector((state) => state.adminProducts);

  const captions = ['Logo', 'Name', 'Description', 'Status', '', '', ''];

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
      <Box display='flex' gap={2}>
        <Button
          bg='blue.500'
          color='white'
          size='sm'
          onClick={() => editRow(row._id)}
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
          sx={{
            '.chakra-switch__track': {
              boxShadow: colorMode === 'light' ? '0 0 0 1px #afafaf' : 'none',
            },
            '.chakra-switch__thumb': {
              bg: row.status.includes('onSale') ? 'white' : 'gray.300',
            },
          }}
        />
      </FormControl>
    ),
  ];

  const handleStatusChange = async (id: string, isChecked: boolean) => {
    const newStatus = isChecked ? 'onSale' : 'offShelf';
    dispatch(updateProductStatusAsync({ id, status: newStatus }));
  };

  const handleEdit = (productId: any) => {
    setEditingProductId(productId);
    setIsEditModalOpen(true);
  };

  const editRow = (productId: any) => {
    handleEdit(productId);
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

  const handleSubmit = async (data: any) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (
        key !== 'coverImage' &&
        key !== 'images' &&
        key !== 'specifications'
      ) {
        formData.append(key, data[key]);
      }
    });

    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }

    if (data.images && data.images.length) {
      data.images.forEach((image: any) => {
        formData.append('images', image);
      });
    }

    if (data.specifications) {
      formData.append('specifications', JSON.stringify(data.specifications));
    }

    if (editingProductId) {
      dispatch(updateProductAsync({ id: editingProductId, body: formData }));
    } else {
      dispatch(addProductAsync(formData));
    }

    setIsEditModalOpen(false);
  };

  useEffect(() => {
    if (deleteProductSuccess || deleteProductError) {
      onMessageModalOpen();
    }
  }, [deleteProductSuccess, deleteProductError, onMessageModalOpen, dispatch]);

  useEffect(() => {
    dispatch(resetProductState());
    const page = parseInt(router.query.page as string) || 1;
    dispatch(getAllProductsAsync({ page, limit: 10 }));
  }, [dispatch, router.query.page, deleteProductSuccess]);

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
        <Box as='main' overflowX='auto' w='full' minWidth='800px' h='100vh'>
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
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmit}
        title='編輯產品'
      >
        <ProductFormContent productId={editingProductId} />
      </FormModal>
    </>
  );
};

export default ProductTableContainer;
