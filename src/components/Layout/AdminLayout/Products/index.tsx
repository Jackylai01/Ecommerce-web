import {
  Avatar,
  Badge,
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
import TablesTableRow from '@components/Tables/TablesTableRow';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  deleteProductAsync,
  getAllProductsAsync,
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
  const router = useRouter();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const {
    list: ProductList,
    productDetails,
    status: {
      getAllProductsLoading,
      getProductByIdFailed,
      deleteProductLoading,
      deleteProductSuccess,
      deleteProductFailed,
    },
    error: { deleteProductError },
  } = useAppSelector((state) => state.adminProducts);

  useEffect(() => {
    if (!router.isReady) return;
    dispatch(getAllProductsAsync({ limit: Number.MAX_SAFE_INTEGER }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

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
  ];

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

  const modalContent = '您確定要刪除這個產品？';

  console.log(deleteProductLoading);
  return (
    <>
      <LoadingLayout isLoading={getAllProductsLoading || deleteProductLoading}>
        <Box as='main' overflowX='auto' w='full' maxW='100%' mt='5rem'>
          <Table variant='simple' color={textColor} size='sm'>
            <Thead>
              <Tr>
                {captions.map((caption, idx) => (
                  <Th color='gray.400' key={idx} textAlign='center'>
                    {caption}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {ProductList?.map((product) => (
                <TablesTableRow
                  key={product._id}
                  row={product}
                  renderCell={renderCell}
                />
              ))}
            </Tbody>
          </Table>
          <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            title='確認要刪除?'
            onConfirm={deleteRow}
          >
            {modalContent}
          </ConfirmationModal>
        </Box>
      </LoadingLayout>
    </>
  );
};

export default ProductTableContainer;
