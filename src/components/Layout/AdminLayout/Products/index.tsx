import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getAllProductsAsync } from '@reducers/admin/products/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TableComponent from './components/TableComponent';

const ProductTableContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query } = router;
  const { list: ProductList } = useAppSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(getAllProductsAsync(query));
  }, [dispatch]);

  const captions = [
    'Logo',
    'Name',
    'Email',
    'Subdomain',
    'Domain',
    'Status',
    'Date',
  ];

  // 轉換產品數據為TableComponent所需格式
  const tableData = ProductList
    ? ProductList.map((product) => ({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        status: product.status?.join(', '),
        date: product.createdAt?.toString(),
        logo: product.coverImage.imageUrl,
      }))
    : [];

  return <TableComponent captions={captions} data={tableData} />;
};

export default ProductTableContainer;
