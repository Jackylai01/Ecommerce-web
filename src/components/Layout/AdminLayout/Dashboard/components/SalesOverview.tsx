import { Box, Flex, Text } from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardHeader from '@components/Card/CardHeader';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import { getSalesOverviewAsync } from '@reducers/admin/admin-statistics/actions';
import { useEffect } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';

interface SalesOverviewType {
  title: string;
  percentage: number;
  chart: JSX.Element;
}

const SalesOverview = ({ title, percentage, chart }: SalesOverviewType) => {
  const dispatch = useAppDispatch();
  const { salesOverview } = useAppSelector((state) => state.adminStatistics);

  useEffect(() => {
    dispatch(getSalesOverviewAsync());
  }, [dispatch]);

  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';

  return (
    <Card p='1.5rem' mb={{ sm: '26px', lg: '0px' }}>
      <CardHeader mb='20px' pl='22px'>
        <Flex direction='column' alignSelf='flex-start'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' mb='6px'>
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <Box w='100%' h={{ sm: '300px' }} ps='8px'>
        {chart}
      </Box>
      <Box mt='20px' pl='22px'>
        {salesOverview &&
          salesOverview.map((data: any, index: number) => (
            <Text key={index} fontSize='sm' color={textColor} mb='6px'>
              {`${data._id.month}/${data._id.year}: $${data.totalSales.toFixed(
                2,
              )} (${data.totalOrders} orders)`}
            </Text>
          ))}
      </Box>
    </Card>
  );
};

export default SalesOverview;
