import {
  Box,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
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
import { DiscountUsage } from '@models/responses/discounts';
import {
  getAllDiscountsUsageAsync,
  getDiscountUsageByCodeAsync,
} from '@reducers/admin/discount/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DiscountList: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    list: discountUsageList,
    metadata,
    status: { getAllDiscountsLoading },
    discountUsage,
  } = useAppSelector((state) => state.adminDiscount);

  useEffect(() => {
    const fetchData = async () => {
      const page = parseInt(router.query.page as string, 10) || 1;
      const limit = 10;
      dispatch(getAllDiscountsUsageAsync({ page, limit }));
    };
    fetchData();
  }, [dispatch, router.query.page]);

  const handleDiscountItemClick = (code: string) => {
    setSelectedCode(code);
    dispatch(getDiscountUsageByCodeAsync(code));
    onDrawerOpen();
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
                  onClick={onToggle}
                  _hover={{ bg: 'blue.600' }}
                >
                  <HStack justify='space-between'>
                    <Box>
                      <Heading as='h1' size='md'>
                        {discount.name}
                      </Heading>
                      <Text fontSize='sm' mt={1} opacity={0.8}>
                        {discount.discountCodes.length} 個優惠碼可用
                      </Text>
                    </Box>
                    <Box
                      transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
                      transition='transform 0.3s'
                    >
                      ▼
                    </Box>
                  </HStack>
                </Box>
                <Collapse in={isOpen} animateOpacity>
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
                          usage={`已用 ${code.usedCount} 次 / 限用 ${code.usageLimit} 次`}
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
      <Drawer isOpen={isDrawerOpen} placement='right' onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>折扣碼詳細使用記錄</DrawerHeader>
          <DrawerBody>
            {discountUsage && (discountUsage as DiscountUsage).usageHistory ? (
              <VStack spacing={4}>
                {(discountUsage as DiscountUsage).usageHistory.map(
                  (history, index: number) => (
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
                        使用日期:{' '}
                        {new Date(history.usedAt).toLocaleDateString()}
                      </Text>
                      <Text>購買商品:</Text>
                      <VStack spacing={2} align='start'>
                        {history.products.map((product, i: number) => (
                          <Box
                            key={i}
                            p={2}
                            bg='white'
                            borderRadius='md'
                            boxShadow='sm'
                            w='100%'
                          >
                            <Text>商品名稱: {product.name}</Text>
                            <Text>購買數量: {product.quantity}</Text>
                            <Text>購買價格: NT${product.priceAtPurchase}</Text>
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  ),
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
