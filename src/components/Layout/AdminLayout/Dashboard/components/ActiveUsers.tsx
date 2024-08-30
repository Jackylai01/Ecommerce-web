import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardBody from '@components/Card/CardBody';
import {
  CartIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from '@components/Icons/Icons';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getActiveUsersStatisticsAsync } from '@reducers/admin/admin-statistics/actions';
import { useEffect } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';
import ChartStatistics from './ChartStatistics';

interface ActiveUsersType {
  title: string;
  percentage: number;
  chart: any;
}

const ActiveUsers = ({ title, percentage, chart }: ActiveUsersType) => {
  const dispatch = useAppDispatch();
  const { activeUsersStatistics } = useAppSelector(
    (state) => state.adminStatistics,
  );

  useEffect(() => {
    dispatch(getActiveUsersStatisticsAsync());
  }, [dispatch]);

  const { colorMode } = useAdminColorMode();
  const iconBoxInside = colorMode === 'light' ? 'white' : 'white';
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';

  return (
    <Card p='1.5rem'>
      <CardBody>
        <Flex direction='column' w='100%'>
          {chart}
          <Flex direction='column' mt='24px' mb='36px' alignSelf='flex-start'>
            <Text fontSize='lg' color={textColor} fontWeight='bold' mb='6px'>
              {title}
            </Text>
          </Flex>
          <SimpleGrid gap={{ sm: '12px' }} columns={4}>
            <ChartStatistics
              title={'Users'}
              amount={activeUsersStatistics?.activeUsers || 'N/A'}
              percentage={activeUsersStatistics?.percentage || 0}
              icon={<WalletIcon h={'15px'} w={'15px'} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={'Clicks'}
              amount={activeUsersStatistics?.clicks || 'N/A'}
              percentage={80}
              icon={<RocketIcon h={'15px'} w={'15px'} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={'Sales'}
              amount={activeUsersStatistics?.totalSales || 'N/A'}
              percentage={30}
              icon={<CartIcon h={'15px'} w={'15px'} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={'Items'}
              amount={activeUsersStatistics?.totalItems || 'N/A'}
              percentage={40}
              icon={<StatsIcon h={'15px'} w={'15px'} color={iconBoxInside} />}
            />
          </SimpleGrid>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ActiveUsers;
