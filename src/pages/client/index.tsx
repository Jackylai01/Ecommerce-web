import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  keyframes,
} from '@chakra-ui/react';
import ClientLayout from '@components/Layout/ClientLayout';
import { HistoryItem } from '@components/Layout/ClientLayout/HistoryItem';
import { OrderItem } from '@components/Layout/ClientLayout/OrderItem';
import { Navbar } from '@components/Navbar/NavBar';

const clientDashboard = () => {
  const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

  return (
    <ClientLayout>
      <Navbar />
      <Box
        w='80%'
        mx='auto'
        mt='40px'
        bg='white'
        boxShadow='0 10px 20px rgba(0, 0, 0, 0.05)'
        borderRadius='12px'
        overflow='hidden'
      >
        <Box
          bgGradient='linear(to-r, #3a4f66, #5a6f86)'
          color='white'
          p='40px'
          textAlign='center'
          position='relative'
          overflow='hidden'
          _before={{
            content: "''",
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            bg: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            transform: 'rotate(30deg)',
          }}
        >
          <Heading fontSize='32px' fontWeight='600' letterSpacing='1px'>
            尊貴會員專區
          </Heading>
        </Box>

        <Tabs variant='soft-rounded' colorScheme='orange'>
          <TabList
            justifyContent='center'
            bg='gray.100'
            p='5px'
            borderRadius='30px'
            mt='20px'
          >
            <Tab
              _selected={{ bg: '#c0a080', color: 'white' }}
              _hover={{ bg: 'rgba(192, 160, 128, 0.1)' }}
            >
              訂單狀況
            </Tab>
            <Tab
              _selected={{ bg: '#c0a080', color: 'white' }}
              _hover={{ bg: 'rgba(192, 160, 128, 0.1)' }}
            >
              購物歷史
            </Tab>
            <Tab
              _selected={{ bg: '#c0a080', color: 'white' }}
              _hover={{ bg: 'rgba(192, 160, 128, 0.1)' }}
            >
              會員積分
            </Tab>
            <Tab
              _selected={{ bg: '#c0a080', color: 'white' }}
              _hover={{ bg: 'rgba(192, 160, 128, 0.1)' }}
            >
              個人資料
            </Tab>
          </TabList>

          <TabPanels p='40px'>
            <TabPanel animation={`${fadeIn} 0.5s ease`}>
              <Heading as='h2' fontSize='24px' mb='20px'>
                訂單狀況
              </Heading>
              <VStack spacing='20px'>
                <OrderItem
                  orderId='10086'
                  date='2024-06-15'
                  status='已發貨'
                  amount='15000'
                />
                <OrderItem
                  orderId='10085'
                  date='2024-06-10'
                  status='處理中'
                  amount='20000'
                />
              </VStack>
            </TabPanel>
            <TabPanel animation={`${fadeIn} 0.5s ease`}>
              <Heading as='h2' fontSize='24px' mb='20px'>
                購物歷史
              </Heading>
              <VStack spacing='20px'>
                <HistoryItem
                  name='精品手錶 Model X'
                  date='2024-05-20'
                  price='50000'
                />
                <HistoryItem
                  name='高級皮夾 Brand Y'
                  date='2024-05-15'
                  price='7500'
                />
              </VStack>
            </TabPanel>
            <TabPanel animation={`${fadeIn} 0.5s ease`}>
              <Heading as='h2' fontSize='24px' mb='20px'>
                會員積分
              </Heading>
              <Box
                bg='white'
                p='30px'
                borderRadius='12px'
                boxShadow='0 10px 20px rgba(0, 0, 0, 0.05)'
              >
                <Text fontSize='20px'>您的當前積分：</Text>
                <Text
                  fontSize='64px'
                  fontWeight='600'
                  color='#c0a080'
                  textAlign='center'
                  mt='20px'
                  textShadow='2px 2px 4px rgba(0,0,0,0.1)'
                >
                  10,000 點
                </Text>
                <Text textAlign='center' mt='10px'>
                  可兌換價值 NT$1,000 的商品
                </Text>
              </Box>
            </TabPanel>
            <TabPanel animation={`${fadeIn} 0.5s ease`}>
              <Heading as='h2' fontSize='24px' mb='20px'>
                個人資料
              </Heading>
              <Box
                as='form'
                maxW='500px'
                mx='auto'
                bg='white'
                p='30px'
                borderRadius='12px'
                boxShadow='0 10px 20px rgba(0, 0, 0, 0.05)'
              >
                <FormControl mb='25px'>
                  <FormLabel color='#3a4f66'>姓名</FormLabel>
                  <Input
                    type='text'
                    value='張三'
                    placeholder='請輸入您的姓名'
                    border='2px solid #e0e0e0'
                    borderRadius='12px'
                    _focus={{
                      borderColor: '#c0a080',
                      boxShadow: '0 0 0 3px rgba(192, 160, 128, 0.2)',
                    }}
                  />
                </FormControl>
                <FormControl mb='25px'>
                  <FormLabel color='#3a4f66'>電子郵件</FormLabel>
                  <Input
                    type='email'
                    value='zhangsan@example.com'
                    placeholder='請輸入您的電子郵件'
                    border='2px solid #e0e0e0'
                    borderRadius='12px'
                    _focus={{
                      borderColor: '#c0a080',
                      boxShadow: '0 0 0 3px rgba(192, 160, 128, 0.2)',
                    }}
                  />
                </FormControl>
                <FormControl mb='25px'>
                  <FormLabel color='#3a4f66'>手機號碼</FormLabel>
                  <Input
                    type='tel'
                    value='0912345678'
                    placeholder='請輸入您的手機號碼'
                    border='2px solid #e0e0e0'
                    borderRadius='12px'
                    _focus={{
                      borderColor: '#c0a080',
                      boxShadow: '0 0 0 3px rgba(192, 160, 128, 0.2)',
                    }}
                  />
                </FormControl>
                <Button
                  type='submit'
                  bg='#c0a080'
                  color='white'
                  w='full'
                  size='lg'
                  borderRadius='30px'
                  _hover={{ bg: '#b08f60', transform: 'translateY(-2px)' }}
                >
                  更新個人資料
                </Button>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ClientLayout>
  );
};

export default clientDashboard;
