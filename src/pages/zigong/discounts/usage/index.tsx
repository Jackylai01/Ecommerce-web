import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import DiscountItem from '@components/Layout/AdminLayout/Discount/codes';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import Pagination from '@components/Pagination';
import { discountTypeMap } from '@fixtures/discountCodes';
import { tabsConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  getAllDiscountsUsageAsync,
  getDiscountUsageByCodeAsync,
} from '@reducers/admin/discount/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface DiscountUsage {
  discountCodes: any[];
  usageHistory: {
    user: {
      username: string;
      email: string;
    };
    usedAt: Date;
    products: {
      name: string;
      quantity: number;
      priceAtPurchase: number;
      product: {
        coverImage: {
          imageUrl: string;
        };
        description: string;
        category: string[];
        status: string;
      };
    }[];
  }[];
}

const DiscountList: React.FC = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [openItemId, setOpenItemId] = useState<string | null>(null); // State for managing which item is open
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    list: discountUsageList,
    metadata,
    discountsMetadata,
    status: { getAllDiscountsLoading },
    discountUsage,
  } = useAppSelector((state) => state.adminDiscount);

  useEffect(() => {
    const fetchData = async () => {
      const page = parseInt(router.query.page as string) || 1;
      const limit = 10;
      dispatch(getAllDiscountsUsageAsync({ page, limit }));
    };
    fetchData();
  }, [dispatch, router.query.page]);

  const handleDiscountItemClick = (code: string) => {
    setSelectedCode(code);
    dispatch(getDiscountUsageByCodeAsync({ code, page, searchTerm }));
    onDrawerOpen();
  };

  const handleToggle = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  const handleSearch = () => {
    if (!selectedCode) {
      console.error('請選擇一個折扣碼進行搜索');
      return;
    }
    const page = 1;
    setPage(page);
    dispatch(
      getDiscountUsageByCodeAsync({ code: selectedCode, page, searchTerm }),
    );
  };

  return (
    <LoadingLayout isLoading={getAllDiscountsLoading}>
      <TabsLayout tabsConfig={tabsConfig}>
        {discountUsageList?.map((discount) => (
          <Box
            key={discount._id}
            w='90%'
            mx='auto'
            bg='white'
            borderRadius='md'
            boxShadow='xl'
            overflow='hidden'
            mb={4}
          >
            {discount.discountCodes.length > 0 && (
              <>
                <Box
                  bg='blue.500'
                  color='white'
                  p={4}
                  cursor='pointer'
                  onClick={() => handleToggle(discount._id)}
                  _hover={{ bg: 'blue.600' }}
                >
                  <HStack justify='space-between'>
                    <Box>
                      <Heading as='h1' size='md' color='white'>
                        {discount.name}
                      </Heading>
                      <Text fontSize='sm' mt={1} opacity={0.8}>
                        {discount.discountCodes.length} 個優惠碼可用
                      </Text>
                    </Box>
                    <Box
                      transform={
                        openItemId === discount._id
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)'
                      }
                      transition='transform 0.3s'
                    >
                      ▼
                    </Box>
                  </HStack>
                </Box>
                <Collapse in={openItemId === discount._id} animateOpacity>
                  <Box p={4}>
                    <VStack spacing={4}>
                      {discount.discountCodes.map((code: any) => (
                        <DiscountItem
                          key={code._id}
                          code={code.code}
                          amount={`${discount.value} ${
                            discount.calculationMethod === 'percentage'
                              ? '%'
                              : ''
                          }`}
                          expiry={new Date(
                            discount.endDate,
                          ).toLocaleDateString()}
                          usageLimit={code.usageLimit}
                          usedCount={code.usedCount}
                          condition={`${
                            discountTypeMap[discount.type]
                          }，最低消費 ${discount.minimumAmount || 0}`}
                          onClick={() => handleDiscountItemClick(code.code)}
                        />
                      ))}
                    </VStack>
                  </Box>
                </Collapse>
              </>
            )}
          </Box>
        ))}
        {metadata && <Pagination metadata={metadata} />}
      </TabsLayout>
      <Drawer
        isOpen={isDrawerOpen}
        placement='right'
        onClose={onDrawerClose}
        size='lg'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>折扣碼詳細使用記錄</DrawerHeader>
          <DrawerBody>
            <InputGroup size='md' mb={4}>
              <Input
                pr='4.5rem'
                placeholder='搜索email、username、折扣碼'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleSearch}>
                  <SearchIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
            {discountUsage && discountUsage.length > 0 ? (
              <VStack spacing={4}>
                {discountUsage.map((history: any, index: number) => (
                  <Box
                    key={index}
                    bg='gray.100'
                    p={4}
                    borderRadius='md'
                    boxShadow='md'
                    w='100%'
                  >
                    <Text>
                      使用者: {history.user.username} ({history.user.email})
                    </Text>
                    <Text>
                      使用日期: {new Date(history.usedAt).toLocaleDateString()}
                    </Text>
                    <Text>購買商品:</Text>
                    <VStack spacing={2} align='start'>
                      {history.products.map((product: any, i: number) => (
                        <Box
                          key={i}
                          p={2}
                          bg='white'
                          borderRadius='md'
                          boxShadow='sm'
                          w='100%'
                        >
                          <HStack>
                            <Image
                              boxSize='50px'
                              objectFit='cover'
                              src={product.product.coverImage.imageUrl}
                              alt={product.product.name}
                            />
                            <Box>
                              <Text>商品名稱: {product.product.name}</Text>
                              <Text>購買數量: {product.quantity}</Text>
                              <Text>
                                購買價格: NT${product.priceAtPurchase}
                              </Text>
                              <Text>
                                產品描述: {product.product.description}
                              </Text>
                            </Box>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                ))}
                {discountsMetadata && (
                  <Pagination metadata={discountsMetadata} />
                )}
              </VStack>
            ) : (
              <Text>無使用記錄</Text>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </LoadingLayout>
  );
};

export default DiscountList;
