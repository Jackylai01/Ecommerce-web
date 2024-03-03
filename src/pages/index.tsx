import { Box } from '@chakra-ui/react';
import { Banner } from '@components/Home/Banner';
import { FeaturedProducts } from '@components/Home/FeaturedProducts';
import { TopCategories } from '@components/Home/TopCategories';
import { Navbar } from '@components/Navbar/NavBar';
import { fakeCategories, fakeProducts } from '@helpers/products';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Box>
      <Navbar />
      <Banner />
      <TopCategories categories={fakeCategories} />
      <FeaturedProducts title='Best Deals For You' products={fakeProducts} />
    </Box>
  );
};

export default HomePage;
