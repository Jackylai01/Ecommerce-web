import {
  Avatar,
  Box,
  Button,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { ProductCategoryForm } from '@components/Form/FormCRUD/ProductCategory';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ConfirmationModal from '@components/Modal/ConfirmationModal';
import FormModal from '@components/Modal/FormModal';
import MessageModal from '@components/Modal/MessageModal';
import Pagination from '@components/Pagination';
import { TablesTableRow } from '@components/Tables/TablesTableRow';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetCategoryState } from '@reducers/admin/product-category';
import {
  addProductCategoryAsync,
  deleteProductCategoryAsync,
  getAllProductsCategoryAsync,
  updateProductCategoryAsync,
} from '@reducers/admin/product-category/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';

interface ProductCategoryRowData {
  _id: any;
  name: string;
  description: string;
  date: string;
}

const ProductCategories = () => {
  const dispatch = useAppDispatch();
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'white' : 'white';
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategoryId, setEditingProductId] = useState<any>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMessageModalOpen,
    onOpen: onMessageModalOpen,
    onClose: onMessageModalClose,
  } = useDisclosure();
  const router = useRouter();
  const [selectedProductCategoryId, setSelectedProductCategoryId] =
    useState<any>(null);

  const {
    list: ProductCategoryList,
    metadata,
    categoryDetails,
    status: {
      getProductsCategoryByIdLoading,
      deleteProductsCategoryLoading,
      deleteProductsCategorySuccess,
    },
    error: { deleteProductsCategoryError },
  } = useAppSelector((state) => state.adminProductsCategory);

  const captions = ['封面', '類別名稱', '描述', ''];

  const renderCell = [
    (row: any) => (
      <Avatar src={row.coverImage?.imageUrl} w='50px' borderRadius='12px' />
    ),
    (row: ProductCategoryRowData) => <Box>{row.name}</Box>,
    (row: ProductCategoryRowData) => <Box>{row.description}</Box>,
    (row: ProductCategoryRowData) => (
      <Box display='flex' gap={2}>
        <Button
          bg='blue.500'
          size='sm'
          color={textColor}
          onClick={() => editRow(row._id)}
        >
          編輯
        </Button>
        <Button
          bg='red.300'
          size='sm'
          color={textColor}
          onClick={() => requestDelete(row._id)}
        >
          刪除
        </Button>
      </Box>
    ),
  ];

  const handleEdit = (categoryId: any) => {
    setEditingProductId(categoryId);
    setIsEditModalOpen(true);
  };

  const editRow = (categoryId: any) => {
    handleEdit(categoryId);
  };

  const requestDelete = (id: any) => {
    setSelectedProductCategoryId(id);
    onOpen();
  };

  const handleSubmit = async (data: any) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== 'coverImage') {
        formData.append(key, data[key]);
      }
    });

    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }

    if (editingCategoryId) {
      dispatch(
        updateProductCategoryAsync({
          id: editingCategoryId,
          body: formData,
        }),
      );
    } else {
      dispatch(addProductCategoryAsync(formData));
    }
    setIsEditModalOpen(false);
  };

  const deleteRow = async () => {
    if (selectedProductCategoryId) {
      dispatch(deleteProductCategoryAsync(selectedProductCategoryId));
      onClose();
    }
  };

  useEffect(() => {
    if (deleteProductsCategorySuccess || deleteProductsCategoryError) {
      onMessageModalOpen();
    }
  }, [
    deleteProductsCategorySuccess,
    deleteProductsCategoryError,
    onMessageModalOpen,
  ]);

  useEffect(() => {
    dispatch(resetCategoryState());
    const page = parseInt(router.query.page as string) || 1;
    dispatch(getAllProductsCategoryAsync({ page, limit: 10 }));
  }, [router.query.page, dispatch]);

  const modalContent = '您確定要刪除這個產品類別？';

  return (
    <>
      <LoadingLayout
        isLoading={
          getProductsCategoryByIdLoading || deleteProductsCategoryLoading
        }
      >
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
              {ProductCategoryList &&
                Array.isArray(ProductCategoryList) &&
                ProductCategoryList.map(
                  (categories) =>
                    categories && (
                      <TablesTableRow
                        key={categories._id}
                        row={categories}
                        renderCell={renderCell}
                      />
                    ),
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
          title='刪除產品類別'
          isActive={isMessageModalOpen}
          error={deleteProductsCategoryError}
          onClose={onMessageModalClose}
        >
          {deleteProductsCategorySuccess && <Box>產品類別已成功刪除。</Box>}
          {deleteProductsCategoryError && (
            <Box color='red.500'>{deleteProductsCategoryError}</Box>
          )}
        </MessageModal>

        {metadata && ProductCategoryList?.length !== 0 && (
          <Pagination metadata={metadata} />
        )}
      </LoadingLayout>
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmit}
        title='編輯產品'
      >
        <ProductCategoryForm categoryId={editingCategoryId} />
      </FormModal>
    </>
  );
};

export default ProductCategories;
