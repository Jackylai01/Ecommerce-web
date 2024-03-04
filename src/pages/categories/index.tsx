import { Hero } from '@components/Hero/Hero';
import { AllCategories } from '@components/Products/Categories';
import { fakeCategories } from '@helpers/products';

const Categories = () => {
  return (
    <>
      <Hero
        heading='Product Categories'
        description="We've got all your favorite Categories"
        imageUrl='/store.png'
        btnLabel='View All Products'
        btnLink='/products'
      />
      <AllCategories categories={fakeCategories} />
    </>
  );
};

export default Categories;
