import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { componentLibrary } from '@fixtures/componentLibrary';
import { useRouter } from 'next/router';
import React from 'react';
import {
  FaArrowLeft,
  FaBars,
  FaChevronRight,
  FaShoppingCart,
} from 'react-icons/fa';

const categorizedComponents: any = {
  layout: ['navbar_a', 'navbar_b'],
  footer: ['footer_a', 'footer_b'],
  main: ['main_section'],
  card: ['card_a', 'card_b'],
};

interface EditPageSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, key: string) => void;
  isEditing: boolean;
  currentRoute: string;
  onRouteChange: (route: string) => void;
}

const routes = [
  { path: '/home', label: '首頁' },
  { path: '/products', label: '產品列表頁' },
  { path: '/product-details', label: '產品詳情頁' },
  { path: '/cart', label: '購物車頁面' },
  { path: '/checkout', label: '結帳頁面' },
  { path: '/profile', label: '個人中心' },
];

const EditPageSidebar: React.FC<EditPageSidebarProps> = ({
  isCollapsed,
  onToggle,
  onDragStart,
  isEditing,
  currentRoute,
  onRouteChange,
}) => {
  const router = useRouter();

  const handleBackToAdmin = () => {
    router.push('/zigong');
  };

  return (
    <Box
      w={isCollapsed ? '60px' : '300px'}
      bg='white'
      p={4}
      shadow='md'
      overflowY='auto'
      transition='width 0.3s ease'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      height='100vh'
    >
      <Box>
        <Button
          onClick={onToggle}
          colorScheme='blue'
          rounded='full'
          position='fixed'
          left={isCollapsed ? '20px' : '280px'}
          top='20px'
          zIndex={1000}
          transition='left 0.3s ease'
        >
          {isCollapsed ? <FaChevronRight /> : <FaBars />}
        </Button>
        {!isCollapsed && (
          <>
            <HStack
              spacing={3}
              mb={6}
              borderBottom='1px solid'
              borderColor='gray.200'
              pb={4}
            >
              <Icon as={FaShoppingCart} w={8} h={8} color='blue.500' />
              <Heading size='md' color='blue.500'>
                ShopCraft
              </Heading>
            </HStack>
            <Box borderBottom='1px solid' borderColor='gray.200' pb={4} mb={4}>
              <Heading size='sm' mb={4}>
                路由
              </Heading>
              <VStack align='start'>
                {routes.map((route) => (
                  <Text
                    key={route.path}
                    cursor='pointer'
                    bg={
                      currentRoute === route.path ? 'blue.500' : 'transparent'
                    }
                    color={currentRoute === route.path ? 'white' : 'black'}
                    _hover={{ bg: 'blue.500', color: 'white' }}
                    px={4}
                    py={2}
                    borderRadius='md'
                    onClick={() => onRouteChange(route.path)}
                  >
                    {route.label}
                  </Text>
                ))}
              </VStack>
            </Box>
            <Heading as='h2' size='md' mb={4}>
              組件庫
            </Heading>
            {Object.keys(categorizedComponents).map((category) => (
              <Box key={category} mb={6}>
                <Heading as='h3' size='sm' mb={2}>
                  {category}
                </Heading>
                {categorizedComponents[category].map((key: any) => (
                  <Box
                    key={key}
                    mb={2}
                    bg='gray.50'
                    p={2}
                    rounded='md'
                    shadow='sm'
                    cursor={isEditing ? 'move' : 'default'}
                    draggable={isEditing}
                    onDragStart={(e) => isEditing && onDragStart(e, key)}
                  >
                    {componentLibrary[key].name}
                  </Box>
                ))}
              </Box>
            ))}
          </>
        )}
      </Box>
      {!isCollapsed && (
        <Button
          leftIcon={<FaArrowLeft />}
          colorScheme='teal'
          mt={4}
          onClick={handleBackToAdmin}
        >
          返回後台
        </Button>
      )}
    </Box>
  );
};

export default EditPageSidebar;
