import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ADMIN_ROUTE } from '@fixtures/constants';
import { loadAdminToken } from '@helpers/token';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { setAdminUserInfo } from '@reducers/admin/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

type Props = {
  children?: React.ReactNode;
};

function AdminEditPageLayout({ children }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    userInfo,
    status: { loginLoading },
  } = useAppSelector((state) => state.adminAuth);
  const [droppedComponents, setDroppedComponents] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const tokenInfo = loadAdminToken();
    if (tokenInfo && !userInfo) {
      dispatch(setAdminUserInfo(tokenInfo));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (!router.isReady) return;
    if (loginLoading) {
      return;
    }
    if (!userInfo) {
      router.push(`/${ADMIN_ROUTE}/auth/login`);
    }
  }, [userInfo, router]);

  const handleDragStart = (e: any, component: any) => {
    e.dataTransfer.setData('component', JSON.stringify(component));
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const component = JSON.parse(e.dataTransfer.getData('component'));
    setDroppedComponents((prev) => [...prev, component]);
  };

  const renderComponent = (component: any) => {
    switch (component.id) {
      case 'navbar_a':
        return (
          <Box className='navbar' bg='gray.800' color='white' p={4} mb={4}>
            <Text as='a' href='#' mr={4}>
              首頁
            </Text>
            <Text as='a' href='#' mr={4}>
              產品
            </Text>
            <Text as='a' href='#'>
              關於我們
            </Text>
          </Box>
        );
      case 'navbar_b':
        return (
          <Box className='navbar' bg='gray.800' color='white' p={4} mb={4}>
            <Text as='a' href='#' mr={4}>
              商店
            </Text>
            <Text as='a' href='#' mr={4}>
              分類
            </Text>
            <Text as='a' href='#' mr={4}>
              購物車
            </Text>
            <Text as='a' href='#'>
              聯繫我們
            </Text>
          </Box>
        );
      default:
        return null;
    }
  };

  const components = [
    { id: 'navbar_a', name: 'Navbar A' },
    { id: 'navbar_b', name: 'Navbar B' },
    { id: 'product_list', name: '產品列表' },
    { id: 'product_card', name: '產品卡片' },
    { id: 'product_detail', name: '產品詳情' },
    { id: 'product_category', name: '產品分類' },
    { id: 'search_bar', name: '搜尋欄' },
    { id: 'filter', name: '篩選器' },
    { id: 'cart_summary', name: '購物車摘要' },
    { id: 'checkout_form', name: '結帳表單' },
    { id: 'payment_options', name: '付款選項' },
    { id: 'order_confirmation', name: '訂單確認' },
    { id: 'coupon_section', name: '優惠券區塊' },
    { id: 'user_reviews', name: '用戶評價' },
    { id: 'related_products', name: '相關商品' },
    { id: 'newsletter', name: '新聞訂閱' },
    { id: 'social_links', name: '社交媒體連結' },
    { id: 'customer_service', name: '客服聊天' },
  ];

  if (!isClient) {
    return null; // 或者返回一個加載指示器
  }

  return (
    <ChakraProvider>
      <Flex height='100vh'>
        <Box
          width={{ base: '100%', md: '320px' }}
          bg='white'
          boxShadow='lg'
          p={6}
          borderRight='1px固id'
          borderColor='gray.200'
        >
          <HStack
            spacing={3}
            mb={6}
            borderBottom='1px固id'
            borderColor='gray.200'
            pb={4}
          >
            <Icon as={FaShoppingCart} w={8} h={8} color='blue.500' />
            <Heading size='md' color='blue.500'>
              ShopCraft
            </Heading>
          </HStack>
          <Box borderBottom='1px固id' borderColor='gray.200' pb={4} mb={4}>
            <Heading size='sm' mb={4}>
              路由
            </Heading>
            <VStack align='start'>
              <Text
                cursor='pointer'
                bg='blue.500'
                color='white'
                px={4}
                py={2}
                borderRadius='md'
              >
                首頁
              </Text>
              <Text
                cursor='pointer'
                _hover={{ bg: 'blue.500', color: 'white' }}
                px={4}
                py={2}
                borderRadius='md'
              >
                產品列表頁
              </Text>
              <Text
                cursor='pointer'
                _hover={{ bg: 'blue.500', color: 'white' }}
                px={4}
                py={2}
                borderRadius='md'
              >
                產品詳情頁
              </Text>
              <Text
                cursor='pointer'
                _hover={{ bg: 'blue.500', color: 'white' }}
                px={4}
                py={2}
                borderRadius='md'
              >
                購物車頁面
              </Text>
              <Text
                cursor='pointer'
                _hover={{ bg: 'blue.500', color: 'white' }}
                px={4}
                py={2}
                borderRadius='md'
              >
                結帳頁面
              </Text>
              <Text
                cursor='pointer'
                _hover={{ bg: 'blue.500', color: 'white' }}
                px={4}
                py={2}
                borderRadius='md'
              >
                個人中心
              </Text>
            </VStack>
          </Box>
          <Box>
            <Heading size='sm' mb={4}>
              頁面佈局
            </Heading>
            <Grid templateColumns='repeat(2, 1fr)' gap={4}>
              {components.slice(0, 6).map((component) => (
                <Box
                  key={component.id}
                  cursor='grab'
                  p={4}
                  bg='gray.50'
                  border='1px固id'
                  borderColor='gray.200'
                  borderRadius='md'
                  textAlign='center'
                  draggable
                  onDragStart={(e) => handleDragStart(e, component)}
                >
                  {component.name}
                </Box>
              ))}
            </Grid>
          </Box>
          <Box mt={8}>
            <Heading size='sm' mb={4}>
              產品展示
            </Heading>
            <Grid templateColumns='repeat(2, 1fr)' gap={4}>
              {components.slice(6, 12).map((component) => (
                <Box
                  key={component.id}
                  cursor='grab'
                  p={4}
                  bg='gray.50'
                  border='1px固id'
                  borderColor='gray.200'
                  borderRadius='md'
                  textAlign='center'
                  draggable
                  onDragStart={(e) => handleDragStart(e, component)}
                >
                  {component.name}
                </Box>
              ))}
            </Grid>
          </Box>
          <Box mt={8}>
            <Heading size='sm' mb={4}>
              購物車 & 結帳
            </Heading>
            <Grid templateColumns='repeat(2, 1fr)' gap={4}>
              {components.slice(12, 18).map((component) => (
                <Box
                  key={component.id}
                  cursor='grab'
                  p={4}
                  bg='gray.50'
                  border='1px固id'
                  borderColor='gray.200'
                  borderRadius='md'
                  textAlign='center'
                  draggable
                  onDragStart={(e) => handleDragStart(e, component)}
                >
                  {component.name}
                </Box>
              ))}
            </Grid>
          </Box>
          <Box mt={8}>
            <Heading size='sm' mb={4}>
              其他元素
            </Heading>
            <Grid templateColumns='repeat(2, 1fr)' gap={4}>
              {components.slice(18).map((component) => (
                <Box
                  key={component.id}
                  cursor='grab'
                  p={4}
                  bg='gray.50'
                  border='1px固id'
                  borderColor='gray.200'
                  borderRadius='md'
                  textAlign='center'
                  draggable
                  onDragStart={(e) => handleDragStart(e, component)}
                >
                  {component.name}
                </Box>
              ))}
            </Grid>
          </Box>
        </Box>
        {/* Main Content */}
        <Box flex='1' p={8} bg='gray.50' overflowY='auto'>
          <Box
            bg='white'
            p={6}
            mb={6}
            borderRadius='md'
            boxShadow='sm'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Heading size='lg'>首頁設計</Heading>
            <HStack spacing={4}>
              <Button variant='outline' colorScheme='blue'>
                預覽
              </Button>
              <Button colorScheme='blue'>保存</Button>
            </HStack>
          </Box>
          <Box
            bg='white'
            p={10}
            borderRadius='md'
            boxShadow='sm'
            minHeight='800px'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {droppedComponents.map((component, index) => (
              <Box key={index} mb={4}>
                {renderComponent(component)}
              </Box>
            ))}
          </Box>
          {children}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default AdminEditPageLayout;
