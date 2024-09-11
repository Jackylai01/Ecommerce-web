import {
  Box,
  Image as ChakraImage,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Autoplay } from 'swiper'; // 引入 Autoplay 模塊
import 'swiper/css'; // 引入 Swiper 基本樣式
import 'swiper/css/autoplay'; // 引入 Swiper 自動播放樣式
import { Swiper, SwiperSlide } from 'swiper/react';

interface CarouselProps {
  images: { img: string }[];
  size: { width: string; height: string };
}

const Carousel: React.FC<CarouselProps> = ({ images, size }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const perView = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  });

  return (
    <Box position='relative' w={size.width} maxH={size.height}>
      <Box position='relative' w='100%' overflow='hidden'>
        <Swiper
          modules={[Autoplay]} // 使用 Autoplay 模塊
          slidesPerView={perView}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        >
          {images?.map((data, index) => (
            <SwiperSlide key={index}>
              <Box
                position='relative'
                w='100%'
                overflow='hidden'
                cursor='pointer'
                onClick={() => setCurrentSlide(index)}
                border={index === currentSlide ? '2px solid teal' : 'none'}
              >
                <ChakraImage
                  src={data.img}
                  alt='輪播圖'
                  objectFit='contain'
                  w='100%'
                  maxH='280px'
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default Carousel;
