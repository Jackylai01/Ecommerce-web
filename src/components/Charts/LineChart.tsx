import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getSalesOverviewAsync } from '@reducers/admin/admin-statistics/actions';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { lineChartOptions } from 'src/variables/charts';

const LineChart = () => {
  const dispatch = useAppDispatch();
  const { salesOverview } = useAppSelector((state) => state.adminStatistics);

  useEffect(() => {
    dispatch(getSalesOverviewAsync());
  }, [dispatch]);

  const chartData = [
    {
      name: 'Sales',
      data:
        salesOverview && salesOverview.length > 0
          ? salesOverview.map((data: any) => data.totalSales)
          : Array(12).fill(0),
    },
  ];

  return (
    <ReactApexChart
      options={lineChartOptions}
      series={chartData}
      type='area'
      width='100%'
      height='100%'
    />
  );
};

export default LineChart;
