import { Hero } from '@components/Hero/Hero';
import { AllProducts } from '@components/Products';
import { fakeCategories, fakeProducts } from '@helpers/products';
import { IBreadcrumbItem } from '@models/requests/products';
import { useRouter } from 'next/router';

export const revalidate = 60; // revalidate this page every 60 seconds

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
  const { id } = router.query;

  const currentCategoryProducts = fakeProducts.filter(
    (product) => product.category.id === id,
  );
  const currentCategory = fakeCategories.find((category) => category.id === id);

  return (
    <>
      {currentCategory && (
        <Hero
          heading={currentCategory.name}
          description={`Discover our best deals in ${currentCategory.name} category.`}
          imageUrl={currentCategory.image}
          btnLabel='View All Categories'
          btnLink='/categories'
        />
      )}
      <AllProducts
        products={currentCategoryProducts}
        breadcrumbItems={[...items]}
      />
    </>
  );
};

export default CategoryPage;
