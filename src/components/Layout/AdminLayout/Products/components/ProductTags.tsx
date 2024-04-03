import {
  Box,
  Button,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { ProductTagsForm } from '@components/Form/FormCRUD/ProductsTags';
import LoadingLayout from '@components/Layout/LoadingLayout';
import ConfirmationModal from '@components/Modal/ConfirmationModal';
import FormModal from '@components/Modal/FormModal';
import MessageModal from '@components/Modal/MessageModal';
import Pagination from '@components/Pagination';
import TablesTableRow from '@components/Tables/TablesTableRow';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  addProductTagsAsync,
  deleteProductTagsAsync,
  getAllProductsTagsAsync,
  updateProductTagsAsync,
} from '@reducers/admin/product-tags/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';

interface ProductTagsRowData {
  _id: any;
  name: string;
  description: string;
  date: string;
}

const ProductTags = () => {
  const dispatch = useAppDispatch();
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTagsId, setEditingTagsId] = useState<any>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMessageModalOpen,
    onOpen: onMessageModalOpen,
    onClose: onMessageModalClose,
  } = useDisclosure();

  const router = useRouter();
  const [selectedProductTagsId, setSelectedProductTagsId] = useState<any>(null);

  const {
    list: ProductTagsList,
    metadata,
    tagsDetails,
    status: {
      getProductsTagsByIdLoading,
      deleteProductsTagsLoading,
      deleteProductsTagsSuccess,
    },
    error: { deleteProductsTagsError },
  } = useAppSelector((state) => state.adminProductsTags);

  const captions = ['標籤名稱', '標籤描述', ''];

  const renderCell = [
    (row: ProductTagsRowData) => <Box>{row.name}</Box>,
    (row: ProductTagsRowData) => <Box>{row.description}</Box>,
    (row: ProductTagsRowData) => (
      <Box display='flex' gap={2}>
        <Button bg='blue.500' size='sm' onClick={() => editRow(row._id)}>
          編輯
        </Button>
        <Button bg='red.300' size='sm' onClick={() => requestDelete(row._id)}>
          刪除
        </Button>
      </Box>
    ),
  ];

  const handleEdit = (tagsId: any) => {
    setEditingTagsId(tagsId);
    setIsEditModalOpen(true);
  };

  const editRow = (tagsId: any) => {
    handleEdit(tagsId);
  };

  const requestDelete = (id: any) => {
    setSelectedProductTagsId(id);
    onOpen();
  };

  const handleSubmit = async (data: any) => {
    if (editingTagsId) {
      dispatch(
        updateProductTagsAsync({
          id: editingTagsId,
          body: data,
        }),
      );
    } else {
      dispatch(addProductTagsAsync(data));
    }
    setIsEditModalOpen(false);
  };

  const deleteRow = async () => {
    if (selectedProductTagsId) {
      console.log(selectedProductTagsId);
      dispatch(deleteProductTagsAsync(selectedProductTagsId));
      onClose();
    }
  };

  useEffect(() => {
    if (deleteProductsTagsSuccess || deleteProductsTagsError) {
      onMessageModalOpen();
    }
  }, [deleteProductsTagsSuccess, deleteProductsTagsError, onMessageModalOpen]);

  useEffect(() => {
    const page = parseInt(router.query.page as string, 10) || 1;
    dispatch(getAllProductsTagsAsync({ page, limit: 10 }));
  }, [dispatch, router.query.page]);

  const modalContent = '您確定要刪除這個產品標籤？';

  return (
    <>
      <LoadingLayout
        isLoading={getProductsTagsByIdLoading || deleteProductsTagsLoading}
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
              {ProductTagsList &&
                ProductTagsList.map((tag) => (
                  <TablesTableRow
                    key={tag._id}
                    row={tag}
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
          title='刪除產品標籤'
          isActive={isMessageModalOpen}
          error={deleteProductsTagsError}
          onClose={onMessageModalClose}
        >
          {deleteProductsTagsSuccess && <Box>產品標籤已成功刪除。</Box>}
          {deleteProductsTagsError && (
            <Box color='red.500'>{deleteProductsTagsError}</Box>
          )}
        </MessageModal>
        {metadata && ProductTagsList?.length !== 0 && (
          <Pagination metadata={metadata} />
        )}
      </LoadingLayout>
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmit}
        title='編輯產品'
      >
        <ProductTagsForm tagsId={editingTagsId} />
      </FormModal>
    </>
  );
};

export default ProductTags;
