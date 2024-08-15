import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  Text,
  useBreakpointValue,
  useOutsideClick,
} from '@chakra-ui/react';
import { IProduct } from '@models/requests/products';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface SearchedProductListProps {
  products: IProduct[];
}

export const Search = ({ isMobileSearch }: { isMobileSearch?: boolean }) => {
  const ref = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  const isMobile = useBreakpointValue({ base: true, md: false }); // 檢查是否為手機模式

  useOutsideClick({
    ref: ref,
    handler: () => {
      setIsModalOpen(false);
      setProducts([]);
    },
  });

  // 如果當前為手機模式且不是從 Drawer 中渲染，則不顯示
  if (isMobile && !isMobileSearch) {
    return null;
  }

  return (
    <Box pos='relative' ref={ref} bg='white'>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.400' />
        </InputLeftElement>
        <Input
          type='text'
          placeholder='Search...'
          focusBorderColor='brand.primaryLight'
          borderWidth='1px'
          borderColor='gray.400'
          value={searchText}
          onClick={() => setIsModalOpen(true)}
          onChange={(e) => setSearchText(e.target.value)}
          color='black'
        />
      </InputGroup>

      {isModalOpen && (
        <Box
          pos='absolute'
          bg='gray.100'
          shadow='md'
          padding='0.5rem'
          w='100%'
          boxSizing='border-box'
          maxH='1000px'
          overflowY='auto'
          color='black'
        >
          {products.length === 0 ? (
            isLoading ? (
              <>Loading...</>
            ) : (
              <> No Products Found</>
            )
          ) : (
            <SearchedProductList products={products} />
          )}
        </Box>
      )}
    </Box>
  );
};

const SearchedProductList = ({ products }: SearchedProductListProps) => {
  return (
    <>
      {products.map((product) => (
        <Link key={product._id} href={`/products/${product.slug}`}>
          <Box
            borderBottomWidth='1px'
            borderBottomColor='gray.200'
            p='2'
            _hover={{ bgColor: 'gray.100' }}
          >
            <Flex align='center'>
              <Image
                alt={product.name}
                src={product.mainImage}
                boxSize='24px'
                mr='10px'
              />
              <Text color='black'>{product.name}</Text>
            </Flex>
            <Flex justify='flex-end'>
              <Tag size='sm'>{product.category.name}</Tag>
            </Flex>
          </Box>
        </Link>
      ))}
    </>
  );
};
