import { Box } from '@chakra-ui/react';
import Card from '@components/Card/Card';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import { getTotalSalesAsync } from '@reducers/public/dashboard/actions';
import { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { barChartOptions } from 'src/variables/charts';

const BarChart = () => {
  const dispatch = useAppDispatch();
  const { totalSales } = useAppSelector((state) => state.publicDashboard);

  useEffect(() => {
    dispatch(getTotalSalesAsync());
  }, [dispatch]);

  const chartData = [
    {
      name: 'Sales',
      data:
        Array.isArray(totalSales) && totalSales.length > 0
          ? totalSales
          : Array(12).fill(0),
    },
  ];

  return (
    <>
      <Box mb='1rem' fontWeight='600'>
        年度銷售統計
      </Box>
      <Card
        py='1rem'
        height={{ sm: '200px' }}
        width='100%'
        bg='#7489d5'
        position='relative'
      >
        <Chart
          options={barChartOptions}
          series={chartData}
          type='bar'
          width='100%'
          height='100%'
        />
      </Card>
    </>
  );
};

export default BarChart;
