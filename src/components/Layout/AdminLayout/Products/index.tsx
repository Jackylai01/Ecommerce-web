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
    status: {
      getAllProductsLoading,
      getAllProductsSuccess,
      getProductByIdFailed,
    },
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

  const tableData = Array.isArray(ProductList)
    ? ProductList.map((product) => ({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        status: product.status || '',
        logo: product.coverImage?.imageUrl,
      }))
    : [];

  const editRow = (row: ProductRowData) => {
    console.log('Editing row:', row);
  };

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
  ];

  return (
    <>
      <Table variant='simple' color={textColor} mt='2rem'>
        <Thead>
          <Tr my='.8rem' pl='0px' color='gray.400'>
            {captions.map((caption, idx) => (
              <Th color='gray.400' key={idx}>
                {caption}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {ProductList.map((product, index) => (
            <TablesTableRow key={index} row={product} renderCell={renderCell} />
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default ProductTableContainer;
