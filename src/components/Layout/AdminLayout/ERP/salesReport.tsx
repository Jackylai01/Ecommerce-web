import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  getInventoryAlertsReportAsync,
  getInventoryForecastReportAsync,
  getInventoryMovementsReportAsync,
  getInventoryOverviewReportAsync,
  getInventoryTrendsReportAsync,
} from '@reducers/admin/admin-erp/reports/actions';

import {
  Activity,
  AlertCircle,
  ArrowUpDown,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Zap,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const InventoryDashboard = () => {
  const dispatch = useAppDispatch();
  const {
    inventoryOverview,
    inventoryMovements,
    inventoryForecast,
    inventoryAlerts,
    inventoryTrends,
  } = useAppSelector((state) => state.adminERPReports);

  useEffect(() => {
    dispatch(getInventoryOverviewReportAsync());
    dispatch(getInventoryMovementsReportAsync());
    dispatch(getInventoryForecastReportAsync());
    dispatch(getInventoryAlertsReportAsync());
    dispatch(getInventoryTrendsReportAsync());
  }, [dispatch]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Box p={6} bgGradient='linear(to-br, gray.100, gray.200)' minH='100vh'>
      <Heading as='h1' size='xl' mb={8} textAlign='center' color='gray.800'>
        庫存管理儀表板
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card>
          <CardHeader bg='blue.500' />
          <CardBody>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <DollarSign color='blue.500' size={40} />
              <Box textAlign='right'>
                <Text fontSize='sm' color='gray.500'>
                  總庫存價值
                </Text>
                <Heading size='lg' color='blue.600'>
                  ${inventoryOverview?.totalInventoryValue.toLocaleString()}
                </Heading>
              </Box>
            </Box>
          </CardBody>
        </Card>
        <Card>
          <CardHeader bg='green.500' />
          <CardBody>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Package color='green.500' size={40} />
              <Box textAlign='right'>
                <Text fontSize='sm' color='gray.500'>
                  總庫存數量
                </Text>
                <Heading size='lg' color='green.600'>
                  {inventoryOverview?.totalInventoryCount.toLocaleString()}
                </Heading>
              </Box>
            </Box>
          </CardBody>
        </Card>
        <Card>
          <CardHeader bg='yellow.500' />
          <CardBody>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <AlertCircle color='yellow.500' size={40} />
              <Box textAlign='right'>
                <Text fontSize='sm' color='gray.500'>
                  低庫存商品
                </Text>
                <Heading size='lg' color='yellow.600'>
                  {inventoryOverview?.lowStockProducts.length}
                </Heading>
              </Box>
            </Box>
          </CardBody>
        </Card>
        <Card>
          <CardHeader bg='purple.500' />
          <CardBody>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <ShoppingCart color='purple.500' size={40} />
              <Box textAlign='right'>
                <Text fontSize='sm' color='gray.500'>
                  高庫存商品
                </Text>
                <Heading size='lg' color='purple.600'>
                  {inventoryOverview?.highStockProducts.length}
                </Heading>
              </Box>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} mb={8}>
        <Card>
          <CardHeader bg='indigo.500'>
            <Box display='flex' alignItems='center'>
              <TrendingUp className='mr-2' />
              <Heading size='md' color='white'>
                庫存和銷售趨勢分析
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <ReactApexChart
              type='area'
              series={[
                {
                  name: '庫存',
                  data:
                    inventoryTrends
                      ?.map((trend) => trend.stock)
                      .filter((data) => data !== undefined) || [],
                },
                {
                  name: '銷售',
                  data:
                    inventoryTrends
                      ?.map((trend) => trend.sales)
                      .filter((data) => data !== undefined) || [],
                },
                {
                  name: '利潤',
                  data:
                    inventoryTrends
                      ?.map((trend) => trend.profit)
                      .filter((data) => data !== undefined) || [],
                },
              ]}
              options={{
                chart: { height: 300, type: 'area' },
                dataLabels: { enabled: false },
                stroke: { curve: 'smooth' },
                xaxis: {
                  categories:
                    inventoryTrends
                      ?.map((trend) => trend.month)
                      .filter((month) => month !== undefined) || [],
                },
              }}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader bg='pink.500'>
            <Box display='flex' alignItems='center'>
              <ShoppingCart className='mr-2' />
              <Heading size='md' color='white'>
                庫存分類
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <ReactApexChart
              type='pie'
              series={
                inventoryOverview?.highStockProducts.map(
                  (product) => product.stock,
                ) || []
              }
              options={{
                labels:
                  inventoryOverview?.highStockProducts.map(
                    (product) => product.name,
                  ) || [],
                colors: COLORS,
              }}
            />
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} mb={8}>
        <Card>
          <CardHeader bg='orange.500'>
            <Box display='flex' alignItems='center'>
              <ArrowUpDown className='mr-2' />
              <Heading size='md' color='white'>
                最近庫存變動
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <Table>
              <Thead>
                <Tr>
                  <Th>商品名稱</Th>
                  <Th>變動類型</Th>
                  <Th>變動數量</Th>
                  <Th>變動原因</Th>
                  <Th>變動日期</Th>
                </Tr>
              </Thead>
              <Tbody>
                {inventoryMovements?.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.productId}</Td>
                    <Td>{item.type}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{item.reason}</Td>
                    <Td>{item.date}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader bg='teal.500'>
            <Box display='flex' alignItems='center'>
              <Activity className='mr-2' />
              <Heading size='md' color='white'>
                庫存預測
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <ReactApexChart
              type='bar'
              series={[
                {
                  name: '預測銷售量',
                  data:
                    inventoryForecast?.map((forecast) => forecast.quantity) ||
                    [],
                },
                {
                  name: '預測庫存量',
                  data:
                    inventoryForecast?.map((forecast) => forecast.price) || [],
                },
              ]}
              options={{
                chart: { type: 'bar', height: 250 },
                plotOptions: {
                  bar: { horizontal: true },
                },
                xaxis: {
                  categories:
                    inventoryForecast?.map((forecast) => forecast.productId) ||
                    [],
                },
              }}
            />
          </CardBody>
        </Card>
      </SimpleGrid>

      <Box mb={8}>
        <Card>
          <CardHeader bg='red.500'>
            <Box display='flex' alignItems='center'>
              <Zap className='mr-2' />
              <Heading size='md' color='white'>
                庫存警報
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {inventoryAlerts?.map((alert, index) => (
                <Box
                  key={index}
                  bg='red.50'
                  p={4}
                  borderLeftWidth={4}
                  borderColor='red.500'
                >
                  <Heading size='sm' color='red.700'>
                    {alert.productId}
                  </Heading>
                  <Text fontSize='sm' color='gray.600'>
                    當前庫存: {alert.quantity}
                  </Text>
                  <Text fontSize='sm' fontWeight='medium' color='red.600'>
                    {alert.reason}
                  </Text>
                  <Text fontSize='sm' fontWeight='bold' mt={2}>
                    建議: {alert.reason}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
};

export default InventoryDashboard;
