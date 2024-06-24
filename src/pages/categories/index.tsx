import { Hero } from '@components/Hero/Hero';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { AllCategories } from '@components/Products/Categories';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getCategoriesListAsync } from '@reducers/public/categories/actions';

import { useEffect } from 'react';

const Categories = () => {
  const dispatch = useAppDispatch();
  const {
    list: categories,
    status: { categoriesListLoading },
  } = useAppSelector((state) => state.publicCategory);

  useEffect(() => {
    dispatch(getCategoriesListAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <>
      <LoadingLayout isLoading={categoriesListLoading}>
        <Hero
          heading='Product Categories'
          description="We've got all your favorite Categories"
          imageUrl='/store.png'
          btnLabel='View All Products'
          btnLink='/products'
        />
        <AllCategories categories={categories || []} />
      </LoadingLayout>
    </>
  );
};

export default Categories;
