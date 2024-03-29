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
  useOutsideClick,
} from '@chakra-ui/react';
import { IProduct } from '@models/requests/products';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { inputGroup } from './Style';

export const Search = () => {
  const ref = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  useOutsideClick({
    ref: ref,
    handler: () => {
      setIsModalOpen(false);
      setProducts([]);
    },
  });

  return (
    <Box pos='relative' w={{ base: '100%', lg: '32rem' }} ref={ref}>
      <InputGroup {...inputGroup}>
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
          maxH='500px'
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

interface SearchedProductListProps {
  products: IProduct[];
}

const SearchedProductList = ({ products }: SearchedProductListProps) => {
  return (
    <>
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.slug}`}>
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
