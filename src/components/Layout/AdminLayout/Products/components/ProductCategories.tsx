import {
  Avatar,
  Box,
  Button,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ConfirmationModal from '@components/Modal/ConfirmationModal';
import MessageModal from '@components/Modal/MessageModal';
import Pagination from '@components/Pagination';
import TablesTableRow from '@components/Tables/TablesTableRow';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetCategoryState } from '@reducers/admin/product-category';
import {
  deleteProductCategoryAsync,
  getAllProductsCategoryAsync,
} from '@reducers/admin/product-category/actions';
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

const ProductCategories = () => {
  const dispatch = useAppDispatch();
  const textColor = useColorModeValue('gray.700', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMessageModalOpen,
    onOpen: onMessageModalOpen,
    onClose: onMessageModalClose,
  } = useDisclosure();
  const router = useRouter();

  const [selectedProductCategoryId, setSelectedProductCategoryId] =
    useState(null);
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

  const captions = ['Logo', 'Name', 'Description'];

  const renderCell = [
    (row: any) => (
      <Avatar src={row.coverImage?.imageUrl} w='50px' borderRadius='12px' />
    ),
    (row: ProductRowData) => <Box>{row.name}</Box>,
    (row: ProductRowData) => <Box>{row.description}</Box>,
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
  ];

  const editRow = (row: ProductRowData) => {
    console.log('Editing row:', row);
  };

  const requestDelete = (id: any) => {
    setSelectedProductCategoryId(id);
    onOpen();
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
          title='刪除產品'
          isActive={isMessageModalOpen}
          error={deleteProductsCategoryError}
          onClose={onMessageModalClose}
        >
          {deleteProductsCategorySuccess && <Box>產品已成功刪除。</Box>}
          {deleteProductsCategoryError && (
            <Box color='red.500'>{deleteProductsCategoryError}</Box>
          )}
        </MessageModal>

        {metadata && <Pagination metadata={metadata} />}
      </LoadingLayout>
    </>
  );
};

export default ProductCategories;
