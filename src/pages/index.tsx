import { Box } from '@chakra-ui/react';
import { Footer } from '@components/Footer';
import { Banner } from '@components/Home/Banner';
import { FeaturedProducts } from '@components/Home/FeaturedProducts';
import { TopCategories } from '@components/Home/TopCategories';
import { fakeProducts } from '@helpers/products';
import type { NextPage } from 'next';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage: NextPage = () => {
  return (
    <Box>
      <Banner />
      <TopCategories />
      <FeaturedProducts title='Best Deals For You' products={fakeProducts} />
      <FeaturedProducts title='Best Deals For You' products={fakeProducts} />
      <Footer />
    </Box>
  );
};

export default HomePage;
