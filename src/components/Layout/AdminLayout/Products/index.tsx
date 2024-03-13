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
} from '@chakra-ui/react';
import TablesTableRow from '@components/Tables/TablesTableRow';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getAllProductsAsync } from '@reducers/admin/products/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ProductRowData {
  logo: string;
  name: string;
  description: string;
  status: 'onSale' | 'offSale';
  date: string;
}

const ProductTableContainer = () => {
  const dispatch = useAppDispatch();
  const textColor = useColorModeValue('gray.700', 'white');
  const router = useRouter();
  const {
    list: ProductList,
    status: { getAllProductsLoading, getProductByIdFailed },
  } = useAppSelector((state) => state.adminProducts);

  useEffect(() => {
    if (!router.isReady) return;
    dispatch(getAllProductsAsync({ limit: Number.MAX_SAFE_INTEGER }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const captions = ['Logo', 'Name', 'Description', 'Status'];

  if (getAllProductsLoading || !Array.isArray(ProductList)) {
    return <div>Loading...</div>;
  }

  const editRow = (row: ProductRowData) => {
    console.log('Editing row:', row);
  };
  const deleteRow = (row: ProductRowData) => {};

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
      <Button colorScheme='blue' size='sm' onClick={() => editRow(row)}>
        Edit
      </Button>
    ),
    (row: ProductRowData) => (
      <Button colorScheme='blue' size='sm' onClick={() => deleteRow(row)}>
        Delete
      </Button>
    ),
  ];

  const captionStyles = [
    { minWidth: '150px', textAlign: 'center' }, // Logo
    { minWidth: '200px', textAlign: 'left' }, // Name
    { minWidth: '300px', textAlign: 'left' }, // Description
    { minWidth: '150px', textAlign: 'center' }, // Status
  ];

  return (
    <>
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
            {ProductList.map((product, index) => (
              <TablesTableRow
                key={product._id}
                row={product}
                renderCell={renderCell}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default ProductTableContainer;
