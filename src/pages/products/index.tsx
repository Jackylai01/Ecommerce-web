import { Hero } from '@components/Hero/Hero';
import { AllProducts } from '@components/Products';
import { fakeProducts } from '@helpers/products';

export const revalidate = 60;

const ProductsPage = () => {
  return (
    <>
      <Hero
        heading='Best and Quality Products'
        description='Affordability, Durability, Fast and Convenient Delivery, Free Shipping and more'
        imageUrl='/bags.jpg'
        btnLabel='View All Categories'
        btnLink='/categories'
      />
      <AllProducts products={fakeProducts} />
    </>
  );
};

export default ProductsPage;
