import { Badge, Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Card from '@components/Card/Card';
import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import Pagination from '@components/Pagination';
import { tabsConfig } from '@fixtures/Tabs-configs';
import { dateTime } from '@helpers/date';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getAllDiscountsUsageAsync } from '@reducers/admin/discount/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';

const DiscountUsageTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { colorMode } = useAdminColorMode();
  const bgColor = colorMode === 'light' ? 'white' : 'gray.700';

  const {
    list: discountUsageList,
    metadata,
    status: { getAllDiscountsLoading },
  } = useAppSelector((state) => state.adminDiscount);

  useEffect(() => {
    const fetchData = async () => {
      const page = parseInt(router.query.page as string, 10) || 1;
      const limit = 10;
      dispatch(getAllDiscountsUsageAsync({ page, limit }));
    };
    fetchData();
  }, [dispatch, router.query.page]);

  return (
    <TabsLayout tabsConfig={tabsConfig}>
      <LoadingLayout isLoading={getAllDiscountsLoading}>
        <Card>
          <Box as='main' overflowX='auto' w='full'>
            <Table variant='simple' color={bgColor} size='sm'>
              <Thead>
                <Tr>
                  <Th>折扣碼</Th>
                  <Th>使用次數</Th>
                  <Th>剩餘次數</Th>
                  <Th>使用歷史</Th>
                </Tr>
              </Thead>
              <Tbody>
                {discountUsageList && discountUsageList.length > 0 ? (
                  discountUsageList.map((discountUsage) => {
                    const usageLimit =
                      discountUsage.usageLimit !== undefined
                        ? discountUsage.usageLimit
                        : -1;
                    const usedCount =
                      discountUsage.usedCount !== undefined
                        ? discountUsage.usedCount
                        : 0;
                    const remainingUses =
                      usageLimit !== -1 ? usageLimit - usedCount : 'Unlimited';

                    return (
                      <Tr key={discountUsage._id}>
                        <Td>{discountUsage.discountCode}</Td>
                        <Td>{usedCount}</Td>
                        <Td>{remainingUses}</Td>
                        <Td>
                          {discountUsage.usageHistory.map(
                            (history: any, index: number) => (
                              <Box key={index} mb='2'>
                                <Badge colorScheme='green'>
                                  {history.user.username}
                                </Badge>{' '}
                                使用於 {dateTime(history.usedAt)}
                              </Box>
                            ),
                          )}
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td
                      colSpan={4}
                      textAlign='center'
                      border='none'
                      color='gray.700'
                    >
                      沒有找到折扣碼使用記錄。
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
          {metadata && discountUsageList?.length !== 0 && (
            <Pagination metadata={metadata} />
          )}
        </Card>
      </LoadingLayout>
    </TabsLayout>
  );
};

export default DiscountUsageTable;
