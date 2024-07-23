import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface UpsellProduct {
  productId: {
    _id: string;
    coverImage: { imageUrl: string };
    name: string;
  };
  upsellPrice: number;
  upsellStock: number;
}

interface Props {
  upsellProducts: UpsellProduct[];
  selectedUpsellProducts: UpsellProduct[];
  setSelectedUpsellProducts: React.Dispatch<
    React.SetStateAction<UpsellProduct[]>
  >;
}

const UpsellProductsCarousel: React.FC<Props> = ({
  upsellProducts,
  selectedUpsellProducts,
  setSelectedUpsellProducts,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState<UpsellProduct[]>(
    [],
  );

  const productsPerSlide = 3;

  useEffect(() => {
    const endIndex = currentIndex + productsPerSlide;
    setDisplayedProducts(upsellProducts.slice(currentIndex, endIndex));
  }, [currentIndex, upsellProducts]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + productsPerSlide < upsellProducts.length
        ? prevIndex + productsPerSlide
        : 0,
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - productsPerSlide >= 0
        ? prevIndex - productsPerSlide
        : Math.max(0, upsellProducts.length - productsPerSlide),
    );
  };

  const handleSelect = (upsellProduct: UpsellProduct) => {
    setSelectedUpsellProducts((prevSelected) => {
      if (
        prevSelected.some(
          (product) => product.productId._id === upsellProduct.productId._id,
        )
      ) {
        return prevSelected.filter(
          (product) => product.productId._id !== upsellProduct.productId._id,
        );
      } else {
        return [...prevSelected, upsellProduct];
      }
    });
  };

  return (
    <Box mt='4'>
      <Text fontSize='xl' fontWeight='bold' mb='4'>
        加購商品
      </Text>
      <HStack spacing={4}>
        <IconButton
          aria-label='Previous'
          icon={<ChevronLeftIcon />}
          onClick={handlePrev}
        />
        <Flex>
          {displayedProducts.map((upsellProduct, index) => (
            <Box
              key={index}
              p={4}
              borderWidth={1}
              borderColor='gray.100'
              borderRadius='md'
              m='2'
              maxW='300px'
            >
              <VStack>
                <Image
                  src={upsellProduct.productId.coverImage.imageUrl}
                  alt={upsellProduct.productId.name}
                  objectFit='cover'
                />
                <Text fontWeight='bold'>{upsellProduct.productId.name}</Text>
                <Text>價格: ${upsellProduct.upsellPrice}</Text>
                <Text>庫存: {upsellProduct.upsellStock}</Text>
                <Checkbox
                  isChecked={selectedUpsellProducts.some(
                    (product) =>
                      product.productId._id === upsellProduct.productId._id,
                  )}
                  onChange={() => handleSelect(upsellProduct)}
                >
                  選擇
                </Checkbox>
              </VStack>
            </Box>
          ))}
        </Flex>
        <IconButton
          aria-label='Next'
          icon={<ChevronRightIcon />}
          onClick={handleNext}
        />
      </HStack>
    </Box>
  );
};

export default UpsellProductsCarousel;
