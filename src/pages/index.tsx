import { Box, Image, Link } from '@chakra-ui/react';
import Carousel from '@components/Carouse';
import { Footer } from '@components/Footer';
import { Banner } from '@components/Home/Banner';
import { TopCategories } from '@components/Home/TopCategories';
import { images, size } from '@fixtures/Carousel';
import type { NextPage } from 'next';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage: NextPage = () => {
  return (
    <Box>
      <Banner />
      <Carousel images={images} size={size} />
      <TopCategories />
      <Box>
        <Link href='/'>
          <Image
            src='https://res.cloudinary.com/dlm0ieiyt/image/upload/v1724263331/ecommerce-carrefour/con_odwyxu.png'
            maxH='680px'
            w='100%'
            objectFit='cover'
          />
        </Link>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
