import {
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
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
import { ProductFormContent } from '@components/Form/FormCRUD/ProductsContent';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ConfirmationModal from '@components/Modal/ConfirmationModal';
import FormModal from '@components/Modal/FormModal';
import MessageModal from '@components/Modal/MessageModal';
import Pagination from '@components/Pagination';
import TablesTableRow from '@components/Tables/TablesTableRow';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  addProductAsync,
  deleteProductAsync,
  getAllProductsAsync,
  updateProductAsync,
  updateProductStatusAsync,
} from '@reducers/admin/products/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdOutlineSort } from 'react-icons/md';
import { useAdminColorMode } from 'src/context/colorMode';

interface ProductRowData {
  _id: any;
  logo: string;
  name: string;
  description: string;
  status: 'onSale' | 'offSale';
  date: string;
  minimumPurchase: string;
  maximumPurchase: string;
  price?: number;
  stock?: number;
}

const ProductTableContainer = () => {
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<any>(null);
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const bgColor = colorMode === 'light' ? 'white' : 'gray.700';
  const borderColor = colorMode === 'light' ? 'black' : 'white';

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

  const captions = [
    '封面',
    '姓名',
    '價格',
    '庫存',
    '最低購買數量',
    '最高購買數量',
    '商品狀態',
    '',
  ];

  const renderCell = [
    (row: any) => (
      <Avatar src={row.coverImage?.imageUrl} w='50px' borderRadius='12px' />
    ),
    (row: ProductRowData) => <Box>{row.name}</Box>,
    (row: ProductRowData) => <Box>{row.price}</Box>,
    (row: ProductRowData) => <Box>{row.stock}</Box>,
    (row: ProductRowData) => <Box>{row.minimumPurchase}</Box>,
    (row: ProductRowData) => <Box>{row.maximumPurchase}</Box>,
    (row: ProductRowData) => (
      <Badge color={row.status === 'onSale' ? 'green.300' : 'red.300'}>
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
        key !== 'specifications' &&
        key !== 'tags' &&
        data[key] !== undefined
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

    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach((tagId: any) => {
        formData.append('tags', tagId);
      });
    }

    if (data.tempProductId) {
      formData.append('tempProductId', data.tempProductId);
    }

    if (data.detailDescription) {
      formData.append(
        'detailDescription',
        JSON.stringify(data.detailDescription),
      );
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
    const fetchData = async () => {
      const page = parseInt(router.query.page as string, 10) || 1;
      const limit = 10;
      dispatch(getAllProductsAsync({ page, limit }));
    };
    fetchData();
  }, [dispatch, router.query.page]);

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
          <Table variant='simple' color={bgColor} size='sm'>
            <Thead>
              <Tr>
                {captions.map((caption, idx) => (
                  <Th color='gray.400' key={idx}>
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
                      <MenuItem bg={bgColor} color={textColor}>
                        編輯時間
                      </MenuItem>
                      <MenuItem bg={bgColor} color={textColor}>
                        建立時間
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {ProductList && ProductList.length > 0 ? (
                ProductList.map((product) => (
                  <TablesTableRow
                    key={product._id}
                    row={product}
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
                    沒有找到產品，請新增產品。
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
        {metadata && ProductList?.length !== 0 && (
          <Pagination metadata={metadata} />
        )}
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
