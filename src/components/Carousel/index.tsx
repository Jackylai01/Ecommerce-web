import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  useBoolean,
  useInterval,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

interface CarouselProps {
  width?: string;
  interval?: number;
  slides: string[];
}

const Carousel: FC<CarouselProps> = ({
  width = '100%',
  interval = 3000,
  slides,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, { toggle: toggleIsPaused }] = useBoolean();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  const setSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useInterval(nextSlide, isPaused ? null : interval);

  return (
    <Box
      width={width}
      position='relative'
      onMouseEnter={toggleIsPaused}
      onMouseLeave={toggleIsPaused}
    >
      <Flex justifyContent='center' alignItems='center' overflow='hidden'>
        {slides.map((slide, index) => (
          <Box
            key={index}
            display={index === currentIndex ? 'block' : 'none'}
            width='100%'
            position='relative'
          >
            <img
              src={slide}
              alt={`Slide ${index}`}
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
          </Box>
        ))}
      </Flex>
      <Flex
        direction='column'
        position='absolute'
        right='10px'
        top='50%'
        transform='translateY(-50%)'
      >
        <IconButton
          aria-label='Previous slide'
          icon={<ChevronUpIcon />}
          onClick={prevSlide}
          variant='outline'
          background='transparent'
          size='sm'
          _hover={{ bg: 'gray.200' }}
        />
        <IconButton
          aria-label='Next slide'
          icon={<ChevronDownIcon />}
          onClick={nextSlide}
          mt={2}
          variant='outline'
          background='transparent'
          size='sm'
          _hover={{ bg: 'gray.200' }}
        />
      </Flex>
      <Flex justify='center' position='absolute' bottom='10px' width='full'>
        {slides.map((_, index) => (
          <Box
            key={index}
            borderRadius='full'
            boxSize='8px'
            m='1'
            bg={index === currentIndex ? 'gray.800' : 'gray.500'}
            onClick={() => setSlide(index)}
            cursor='pointer'
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Carousel;
