'use client';
import { Box } from '@chakra-ui/react';
import { SwiperNavButtons } from '@components/SwiperNavButtons';
import { IProduct } from '@models/requests/products';
import { CSSProperties } from 'react';
import { A11y, Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { ProductCard } from '../../../components/ProductCard';

const slideStyles: CSSProperties = {
  boxSizing: 'border-box',
  maxWidth: '350px',
  display: 'flex',
  flexDirection: 'column',
};

interface ProductsSlider {
  products: IProduct[];
}
export const ProductsSlider = ({ products }: ProductsSlider) => {
  const sliderSettings: SwiperOptions = {
    modules: [Navigation, A11y, Autoplay],
    spaceBetween: 10,
    slidesPerView: 'auto',
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  };

  return (
    <Box w='100%' h='100%'>
      <Swiper {...sliderSettings} style={{ width: '100%', height: '100%' }}>
        {products.map((product) => (
          <SwiperSlide key={product.id} style={slideStyles}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
        <SwiperNavButtons />
      </Swiper>
    </Box>
  );
};
