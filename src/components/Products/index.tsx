import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { CustomBreadcrumb } from '@components/CustomBreadcrumb';
import LoadingLayout from '@components/Layout/LoadingLayout';
import Pagination from '@components/Pagination';
import { ProductCard } from '@components/ProductCard';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { IBreadcrumbItem } from '@models/requests/products';
import { resetPublicProductState } from '@reducers/public/products';
import { publicProductsListAsync } from '@reducers/public/products/actions';
import { Filter, Grid, List, Search } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface AllProductsProps {
  breadcrumbItems?: IBreadcrumbItem[];
  products?: any[];
}

const itemsPerPage = 12;

export const AllProducts = ({ breadcrumbItems }: AllProductsProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { search } = router.query;
  const {
    list: productsList,
    metadata,
    status: { productsListLoading },
  } = useAppSelector((state) => state.publicProducts);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  // 顏色主題
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    dispatch(
      publicProductsListAsync({
        page,
        limit: itemsPerPage,
        search: search as string,
      }),
    );

    return () => {
      dispatch(resetPublicProductState());
    };
  }, [dispatch, page, search]);

  const hasProducts = productsList && productsList.length > 0;

  return (
    <Box bg={bgColor} minH='100vh'>
      <Container maxW='1400px' py={8} px={{ base: 4, md: 8 }}>
        {/* 麵包屑導航 */}
        <Box mb={6}>
          <CustomBreadcrumb items={breadcrumbItems} />
        </Box>

        {/* 頂部標題與篩選區 */}
        <VStack spacing={6} align='stretch' mb={8}>
          {/* 標題區域 */}
          <Box>
            <Heading
              as='h1'
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight='bold'
              color={textColor}
              mb={2}
            >
              所有商品
            </Heading>
            <Text color={mutedColor} fontSize='lg'>
              探索我們精心挑選的優質商品系列
            </Text>
          </Box>

          {/* 搜尋與篩選工具列 */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={4}
            align={{ base: 'stretch', md: 'center' }}
            justify='space-between'
            bg={cardBg}
            p={4}
            borderRadius='xl'
            border='1px'
            borderColor={borderColor}
            boxShadow='sm'
          >
            {/* 搜尋框 */}
            <InputGroup maxW={{ base: '100%', md: '400px' }}>
              <InputLeftElement pointerEvents='none'>
                <Icon as={Search} color={mutedColor} />
              </InputLeftElement>
              <Input
                placeholder='搜尋商品...'
                bg={bgColor}
                border='1px'
                borderColor={borderColor}
                _focus={{
                  borderColor: 'blue.400',
                  boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
                }}
              />
            </InputGroup>

            {/* 右側工具 */}
            <HStack spacing={3} flexWrap='wrap'>
              {/* 排序選擇器 */}
              <HStack spacing={2}>
                <Icon as={Filter} boxSize={5} color={mutedColor} />
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  size='md'
                  maxW='200px'
                  bg={bgColor}
                  border='1px'
                  borderColor={borderColor}
                >
                  <option value='newest'>最新上架</option>
                  <option value='price-low'>價格：低到高</option>
                  <option value='price-high'>價格：高到低</option>
                  <option value='popular'>最受歡迎</option>
                </Select>
              </HStack>

              {/* 視圖切換按鈕 */}
              <HStack spacing={2}>
                <Box
                  as='button'
                  p={2}
                  borderRadius='md'
                  bg={viewMode === 'grid' ? 'blue.500' : 'transparent'}
                  color={viewMode === 'grid' ? 'white' : mutedColor}
                  _hover={{ bg: viewMode === 'grid' ? 'blue.600' : 'gray.100' }}
                  transition='all 0.2s'
                  onClick={() => setViewMode('grid')}
                >
                  <Icon as={Grid} boxSize={5} />
                </Box>
                <Box
                  as='button'
                  p={2}
                  borderRadius='md'
                  bg={viewMode === 'list' ? 'blue.500' : 'transparent'}
                  color={viewMode === 'list' ? 'white' : mutedColor}
                  _hover={{ bg: viewMode === 'list' ? 'blue.600' : 'gray.100' }}
                  transition='all 0.2s'
                  onClick={() => setViewMode('list')}
                >
                  <Icon as={List} boxSize={5} />
                </Box>
              </HStack>
            </HStack>
          </Flex>

          {/* 商品數量顯示 */}
          {hasProducts && metadata && (
            <Text color={mutedColor} fontSize='sm'>
              顯示 <strong>{productsList.length}</strong> 個商品，共{' '}
              <strong>{metadata.count}</strong> 個
            </Text>
          )}
        </VStack>

        {/* 商品列表 */}
        <LoadingLayout isLoading={productsListLoading}>
          {hasProducts ? (
            <SimpleGrid
              columns={{
                base: 1,
                sm: 2,
                md: viewMode === 'grid' ? 3 : 1,
                lg: viewMode === 'grid' ? 4 : 1,
              }}
              spacing={6}
              mb={8}
            >
              {productsList?.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              textAlign='center'
              py={20}
              px={6}
              bg={cardBg}
              borderRadius='2xl'
              border='1px'
              borderColor={borderColor}
            >
              <VStack spacing={4}>
                <Icon as={Search} boxSize={16} color={mutedColor} />
                <Heading size='lg' color={textColor}>
                  找不到商品
                </Heading>
                <Text color={mutedColor} maxW='md'>
                  抱歉，目前這個分類沒有商品。請嘗試其他分類或稍後再來查看。
                </Text>
              </VStack>
            </Box>
          )}
        </LoadingLayout>

        {/* 分頁 */}
        {metadata && hasProducts && (
          <Box mt={8}>
            <Pagination metadata={metadata} />
          </Box>
        )}
      </Container>
    </Box>
  );
};
