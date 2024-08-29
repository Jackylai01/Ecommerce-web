import { Hero } from '@components/Hero/Hero';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { CategoryProducts } from '@components/Products/CategoryProducts';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { IBreadcrumbItem } from '@models/requests/products';
import { getCategoryByIdAsync } from '@reducers/public/categories/actions'; // 确保你有这个 action
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const items: IBreadcrumbItem[] = [
  {
    name: 'Products',
    link: '/products',
  },
  {
    name: 'Categories',
    link: '/categories',
  },
];

const CategoryPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const query = router.query['id]-[slug'];

  useEffect(() => {
    if (typeof query === 'string') {
      const [id, slug] = query.split('-');
      if (id && slug) {
        dispatch(getCategoryByIdAsync({ id, slug }));
      }
    }
  }, [query, dispatch]);

  const {
    category,
    products,
    status: { getCategoryByIdLoading },
  } = useAppSelector((state) => state.publicCategory);

  return (
    <LoadingLayout isLoading={getCategoryByIdLoading}>
      {category && (
        <Hero
          heading={category.name}
          description={`Discover our best deals in ${category.name} category.`}
          imageUrl={category.coverImage.imageUrl}
          btnLabel='View All Categories'
          btnLink='/categories'
        />
      )}
      <CategoryProducts breadcrumbItems={items} products={products} />
    </LoadingLayout>
  );
};

export default CategoryPage;
