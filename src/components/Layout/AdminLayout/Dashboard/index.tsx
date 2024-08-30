import { Flex, Grid, SimpleGrid } from '@chakra-ui/react';
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from '@components/Icons/Icons';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  getTodayEarningsAsync,
  getTodayLoginsAsync,
  getTodayRegistrationsAsync,
  getTotalSalesAsync,
} from '@reducers/public/dashboard/actions';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';
import ActiveUsers from './components/ActiveUsers';
import MiniStatistics from './components/MiniStatistics';
import SalesOverview from './components/SalesOverview';

const BarChart = dynamic(() => import('@components/Charts/BarChart'), {
  ssr: false,
});
const LineChart = dynamic(() => import('@components/Charts/LineChart'), {
  ssr: false,
});

// 計算百分比變化
const calculatePercentageChange = (
  todayValue: number,
  yesterdayValue: number,
) => {
  if (yesterdayValue === 0) return todayValue > 0 ? 100 : 0;
  return ((todayValue - yesterdayValue) / yesterdayValue) * 100;
};

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { colorMode } = useAdminColorMode();
  const iconBoxInside = colorMode === 'light' ? 'white' : 'white';

  const {
    todayEarnings,
    yesterdayEarnings,
    todayLogins,
    yesterdayLogins,
    todayRegistrations,
    yesterdayRegistrations,
    totalSales,
    yesterdaySales,
  } = useAppSelector((state) => state.publicDashboard);

  useEffect(() => {
    dispatch(getTodayEarningsAsync());
    dispatch(getTodayLoginsAsync());
    dispatch(getTodayRegistrationsAsync());
    dispatch(getTotalSalesAsync());
  }, [dispatch]);

  return (
    <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        <MiniStatistics
          title={'今日份營收'}
          amount={`$${todayEarnings ?? 0}`}
          percentage={calculatePercentageChange(
            todayEarnings ?? 0,
            yesterdayEarnings ?? 0,
          )}
          icon={<WalletIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={'今日會員總登入數'}
          amount={todayLogins ?? 0}
          percentage={calculatePercentageChange(
            todayLogins ?? 0,
            yesterdayLogins ?? 0,
          )}
          icon={<GlobeIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={'今日份新加入會員數'}
          amount={`+${todayRegistrations ?? 0}`}
          percentage={calculatePercentageChange(
            todayRegistrations ?? 0,
            yesterdayRegistrations ?? 0,
          )}
          icon={<DocumentIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={'商城總銷售'}
          amount={`$${totalSales ?? 0}`}
          percentage={calculatePercentageChange(
            totalSales ?? 0,
            yesterdaySales ?? 0,
          )}
          icon={<CartIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
        />
      </SimpleGrid>

      <Grid
        templateColumns={{ sm: '1fr', lg: '1.3fr 1.7fr' }}
        templateRows={{ sm: 'repeat(2, 1fr)', lg: '1fr' }}
        gap='24px'
        mb={{ lg: '26px' }}
        mt='3rem'
      >
        <ActiveUsers
          title={'系統用戶活躍狀況'}
          percentage={23}
          chart={<BarChart />}
        />
        <SalesOverview title='銷售統計' percentage={5} chart={<LineChart />} />
      </Grid>
    </Flex>
  );
};

export default Dashboard;
