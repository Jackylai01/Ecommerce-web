import {
  Box,
  Grid,
  Heading,
  Table,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import React from 'react';

const SalesReport: React.FC = () => {
  const dispatch = useAppDispatch();
  const { salesOrders } = useAppSelector((state) => state.adminERPReports);

  return (
    <Box maxW='1200px' mx='auto' p='20px' bg='gray.100' color='gray.800'>
      <Tabs variant='soft-rounded' colorScheme='blue'>
        <TabPanels>
          <TabPanel>
            <Grid
              templateColumns='repeat(auto-fit, minmax(300px, 1fr))'
              gap='30px'
            >
              <Box bg='white' p='25px' borderRadius='10px' boxShadow='md'>
                <Heading
                  fontSize='20px'
                  mb='20px'
                  color='blue.400'
                  borderBottom='2px'
                  borderColor='blue.400'
                  pb='10px'
                >
                  月度銷售趨勢
                </Heading>
                <Box
                  width='100%'
                  height='300px'
                  bg='gray.50'
                  borderRadius='10px'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  color='gray.500'
                  fontStyle='italic'
                >
                  這裡將顯示月度銷售趨勢圖表
                </Box>
              </Box>
              <Box bg='white' p='25px' borderRadius='10px' boxShadow='md'>
                <Heading
                  fontSize='20px'
                  mb='20px'
                  color='blue.400'
                  borderBottom='2px'
                  borderColor='blue.400'
                  pb='10px'
                >
                  熱門產品
                </Heading>
                <Table width='100%'>
                  <Thead>
                    <Tr>
                      <Th bg='blue.400' color='white' fontWeight='600'>
                        產品名稱
                      </Th>
                      <Th bg='blue.400' color='white' fontWeight='600'>
                        銷售數量
                      </Th>
                      <Th bg='blue.400' color='white' fontWeight='600'>
                        銷售額
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr
                      bg='gray.50'
                      _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                    >
                      <Td>產品A</Td>
                      <Td>1,230</Td>
                      <Td>$61,500</Td>
                    </Tr>
                    <Tr
                      bg='gray.50'
                      _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                    >
                      <Td>產品B</Td>
                      <Td>980</Td>
                      <Td>$49,000</Td>
                    </Tr>
                    <Tr
                      bg='gray.50'
                      _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                    >
                      <Td>產品C</Td>
                      <Td>750</Td>
                      <Td>$37,500</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid
              templateColumns='repeat(auto-fit, minmax(300px, 1fr))'
              gap='30px'
            >
              <Box bg='white' p='25px' borderRadius='10px' boxShadow='md'>
                <Heading
                  fontSize='20px'
                  mb='20px'
                  color='blue.400'
                  borderBottom='2px'
                  borderColor='blue.400'
                  pb='10px'
                >
                  客戶銷售排行
                </Heading>
                <Table width='100%'>
                  <Thead>
                    <Tr>
                      <Th bg='blue.400' color='white' fontWeight='600'>
                        客戶名稱
                      </Th>
                      <Th bg='blue.400' color='white' fontWeight='600'>
                        訂單數
                      </Th>
                      <Th bg='blue.400' color='white' fontWeight='600'>
                        總銷售額
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr
                      bg='gray.50'
                      _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                    >
                      <Td>客戶X</Td>
                      <Td>45</Td>
                      <Td>$22,500</Td>
                    </Tr>
                    <Tr
                      bg='gray.50'
                      _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                    >
                      <Td>客戶Y</Td>
                      <Td>38</Td>
                      <Td>$19,000</Td>
                    </Tr>
                    <Tr
                      bg='gray.50'
                      _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                    >
                      <Td>客戶Z</Td>
                      <Td>32</Td>
                      <Td>$16,000</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
              <Box bg='white' p='25px' borderRadius='10px' boxShadow='md'>
                <Heading
                  fontSize='20px'
                  mb='20px'
                  color='blue.400'
                  borderBottom='2px'
                  borderColor='blue.400'
                  pb='10px'
                >
                  銷售人員業績
                </Heading>
                <Table width='100%'>
                  <Thead>
                    <Tr>
                      <Th bg='blue.400' color='white' fontWeight='600'>
                        銷售人員
                      </Th>
                      <Th bg='blue.400' color='white' fontWeight='600'>
                        完成訂單數
                      </Th>
                      <Th bg='blue.400' color='white' fontWeight='600'>
                        總銷售額
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr
                      bg='gray.50'
                      _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                    >
                      <Td>王小明</Td>
                      <Td>78</Td>
                      <Td>$39,000</Td>
                    </Tr>
                    <Tr
                      bg='gray.50'
                      _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                    >
                      <Td>李小華</Td>
                      <Td>65</Td>
                      <Td>$32,500</Td>
                    </Tr>
                    <Tr
                      bg='gray.50'
                      _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                    >
                      <Td>張小芳</Td>
                      <Td>52</Td>
                      <Td>$26,000</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SalesReport;
