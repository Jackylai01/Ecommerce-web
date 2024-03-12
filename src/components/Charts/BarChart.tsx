import Card from '@components/Card/Card';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { barChartData, barChartOptions } from 'src/variables/charts';

const BarChart = () => {
  const [chartData, setChartData] = useState<
    ApexAxisChartSeries | ApexNonAxisChartSeries
  >([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData(barChartData);
    setChartOptions(barChartOptions);
  }, []);

  return (
    <Card
      py='1rem'
      height={{ sm: '200px' }}
      width='100%'
      bg='#151928'
      position='relative'
    >
      <Chart
        options={chartOptions}
        series={chartData}
        type='bar'
        width='100%'
        height='100%'
      />
    </Card>
  );
};

export default BarChart;
