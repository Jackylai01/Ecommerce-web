import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useAdminColorMode } from 'src/context/colorMode';

const LogisticsPages: NextPage = () => {
  const { colorMode } = useAdminColorMode();
  const bgColor = colorMode === 'light' ? 'white' : 'gray.700';
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';

  return (
    <>
      <Box maxW='1200px' mx='auto' p='40px 20px'>
        <Grid
          templateColumns='repeat(auto-fit, minmax(200px, 1fr))'
          gap='20px'
          mb='30px'
        >
          <Box
            bg='white'
            borderRadius='10px'
            p='20px'
            boxShadow='0 4px 20px rgba(0, 0, 0, 0.05)'
          >
            <Text fontSize='16px' fontWeight='600' mb='10px' color='blue.600'>
              總訂單數
            </Text>
            <Text fontSize='28px' fontWeight='700'>
              1,234
            </Text>
            <Text fontSize='14px' color='green.500'>
              ↑ 5.3%
            </Text>
          </Box>
          <Box
            bg='white'
            borderRadius='10px'
            p='20px'
            boxShadow='0 4px 20px rgba(0, 0, 0, 0.05)'
          >
            <Text fontSize='16px' fontWeight='600' mb='10px' color='blue.600'>
              今日訂單
            </Text>
            <Text fontSize='28px' fontWeight='700'>
              56
            </Text>
            <Text fontSize='14px' color='green.500'>
              ↑ 12.7%
            </Text>
          </Box>
          <Box
            bg='white'
            borderRadius='10px'
            p='20px'
            boxShadow='0 4px 20px rgba(0, 0, 0, 0.05)'
          >
            <Text fontSize='16px' fontWeight='600' mb='10px' color='blue.600'>
              待處理退貨
            </Text>
            <Text fontSize='28px' fontWeight='700'>
              23
            </Text>
            <Text fontSize='14px' color='red.500'>
              ↑ 3.2%
            </Text>
          </Box>
          <Box
            bg='white'
            borderRadius='10px'
            p='20px'
            boxShadow='0 4px 20px rgba(0, 0, 0, 0.05)'
          >
            <Text fontSize='16px' fontWeight='600' mb='10px' color='blue.600'>
              月度銷售額
            </Text>
            <Text fontSize='28px' fontWeight='700'>
              $45,678
            </Text>
            <Text fontSize='14px' color='green.500'>
              ↑ 8.1%
            </Text>
          </Box>
        </Grid>

        <Box
          bg={bgColor}
          borderRadius='16px'
          boxShadow='0 4px 20px rgba(0, 0, 0, 0.05)'
          mb='40px'
          color={textColor}
        >
          <Flex
            bgGradient='linear(to-r, #3a5eff, #6687ff)'
            color='white'
            p='30px'
            justify='space-between'
            align='center'
            borderTopRadius='16px'
          >
            <Box>
              <Heading as='h2' fontSize='24px' fontWeight='600'>
                物流管理
              </Heading>
              <Text fontSize='14px' opacity='0.8'>
                管理和追蹤所有訂單的物流狀態
              </Text>
            </Box>
            <Button
              bg='linear-gradient(135deg, #3a5eff, #6687ff)'
              color='white'
              borderRadius='25px'
            >
              新增訂單
            </Button>
          </Flex>

          <Box p='30px'>
            <Box mb='30px' position='relative'>
              <Input
                placeholder='搜索訂單...'
                borderRadius='30px'
                pl='50px'
                boxShadow='0 4px 15px rgba(0, 0, 0, 0.05)'
              />
              <Box
                position='absolute'
                left='20px'
                top='50%'
                transform='translateY(-50%)'
                width='20px'
                height='20px'
                bgImage="url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236e7b8b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\'%3E%3C/path%3E%3C/svg%3E')"
                bgSize='contain'
                bgRepeat='no-repeat'
              />
            </Box>

            <Tabs>
              <TabList>
                <Tab>訂單概覽</Tab>
                <Tab>庫存管理</Tab>
                <Tab>退貨管理</Tab>
                <Tab>付款狀態</Tab>
                <Tab>訂單狀態更新</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Table variant='simple' size='lg'>
                    <Thead>
                      <Tr>
                        <Th color={textColor}>訂單編號</Th>
                        <Th color={textColor}>狀態</Th>
                        <Th color={textColor}>收件人</Th>
                        <Th color={textColor}>更新時間</Th>
                        <Th color={textColor}>操作</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>#1234</Td>
                        <Td>
                          <Badge colorScheme='yellow' p='1' borderRadius='20px'>
                            運送中
                          </Badge>
                        </Td>
                        <Td>張三</Td>
                        <Td>2023-07-01 10:00</Td>
                        <Td>
                          <Button
                            bg='linear-gradient(135deg, #3a5eff, #6687ff)'
                            color='white'
                            borderRadius='25px'
                          >
                            詳情
                          </Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>#5678</Td>
                        <Td>
                          <Badge colorScheme='green' p='1' borderRadius='20px'>
                            已送達
                          </Badge>
                        </Td>
                        <Td>李四</Td>
                        <Td>2023-07-02 14:30</Td>
                        <Td>
                          <Button
                            bg='linear-gradient(135deg, #00c853, #69f0ae)'
                            color='white'
                            borderRadius='25px'
                          >
                            完成
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TabPanel>

                {/* 庫存管理 */}
                <TabPanel>
                  <Table variant='simple' size='lg'>
                    <Thead>
                      <Tr>
                        <Th>商品編號</Th>
                        <Th>名稱</Th>
                        <Th>庫存</Th>
                        <Th>更新時間</Th>
                        <Th>操作</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>#9876</Td>
                        <Td>商品A</Td>
                        <Td>50</Td>
                        <Td>2023-07-02 14:30</Td>
                        <Td>
                          <Button
                            bg='linear-gradient(135deg, #3a5eff, #6687ff)'
                            color='white'
                            borderRadius='25px'
                          >
                            詳情
                          </Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>#5432</Td>
                        <Td>商品B</Td>
                        <Td>30</Td>
                        <Td>2023-07-01 10:00</Td>
                        <Td>
                          <Button
                            bg='linear-gradient(135deg, #3a5eff, #6687ff)'
                            color='white'
                            borderRadius='25px'
                          >
                            詳情
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TabPanel>

                {/* 退貨管理 */}
                <TabPanel>
                  <Table variant='simple' size='lg'>
                    <Thead>
                      <Tr>
                        <Th>訂單編號</Th>
                        <Th>狀態</Th>
                        <Th>收件人</Th>
                        <Th>更新時間</Th>
                        <Th>操作</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>#2345</Td>
                        <Td>
                          <Badge colorScheme='red' p='1' borderRadius='20px'>
                            退貨中
                          </Badge>
                        </Td>
                        <Td>王五</Td>
                        <Td>2023-07-03 09:30</Td>
                        <Td>
                          <Button
                            bg='linear-gradient(135deg, #ff5252, #ff867f)'
                            color='white'
                            borderRadius='25px'
                          >
                            詳情
                          </Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>#6789</Td>
                        <Td>
                          <Badge colorScheme='yellow' p='1' borderRadius='20px'>
                            處理中
                          </Badge>
                        </Td>
                        <Td>趙六</Td>
                        <Td>2023-07-02 16:00</Td>
                        <Td>
                          <Button
                            bg='linear-gradient(135deg, #ff5252, #ff867f)'
                            color='white'
                            borderRadius='25px'
                          >
                            詳情
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TabPanel>

                {/* 付款狀態 */}
                <TabPanel>
                  <Table variant='simple' size='lg'>
                    <Thead>
                      <Tr>
                        <Th>訂單編號</Th>
                        <Th>付款狀態</Th>
                        <Th>付款日期</Th>
                        <Th>操作</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>#8765</Td>
                        <Td>
                          <Badge colorScheme='green' p='1' borderRadius='20px'>
                            已付款
                          </Badge>
                        </Td>
                        <Td>2023-07-03 12:00</Td>
                        <Td>
                          <Button
                            bg='linear-gradient(135deg, #3a5eff, #6687ff)'
                            color='white'
                            borderRadius='25px'
                          >
                            查看詳情
                          </Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>#6543</Td>
                        <Td>
                          <Badge colorScheme='yellow' p='1' borderRadius='20px'>
                            待付款
                          </Badge>
                        </Td>
                        <Td>2023-07-02 14:30</Td>
                        <Td>
                          <Button
                            bg='linear-gradient(135deg, #3a5eff, #6687ff)'
                            color='white'
                            borderRadius='25px'
                          >
                            查看詳情
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TabPanel>

                {/* 訂單狀態更新 */}
                <TabPanel>
                  <Table variant='simple' size='lg'>
                    <Thead>
                      <Tr>
                        <Th>訂單編號</Th>
                        <Th>狀態</Th>
                        <Th>更新時間</Th>
                        <Th>操作</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>#9876</Td>
                        <Td>
                          <Badge colorScheme='green' p='1' borderRadius='20px'>
                            已送達
                          </Badge>
                        </Td>
                        <Td>2023-07-03 09:30</Td>
                        <Td>
                          <Button
                            bg='linear-gradient(135deg, #3a5eff, #6687ff)'
                            color='white'
                            borderRadius='25px'
                          >
                            更新
                          </Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>#5432</Td>
                        <Td>
                          <Badge colorScheme='yellow' p='1' borderRadius='20px'>
                            運送中
                          </Badge>
                        </Td>
                        <Td>2023-07-02 16:00</Td>
                        <Td>
                          <Button
                            bg='linear-gradient(135deg, #3a5eff, #6687ff)'
                            color='white'
                            borderRadius='25px'
                          >
                            更新
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LogisticsPages;
