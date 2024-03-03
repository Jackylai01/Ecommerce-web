import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Link,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const isRowDirection = useBreakpointValue({ base: false, md: true });

  const textAlign = useBreakpointValue({ base: 'center', md: 'start' });

  const logoSize = useBreakpointValue({ base: '60px', md: '80px' });

  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });

  const handleSubscribe = () => {
    // TODO 訂閱電子報API
    console.log(`Subscribed with email: ${email}`);
  };

  const LinksStack = isRowDirection ? HStack : VStack;

  return (
    <Box as='footer' bg='gray.800' color='white' p={6} mt='1rem'>
      <Flex
        direction={isRowDirection ? 'row' : 'column'}
        justifyContent='space-around'
        alignItems='center'
        wrap='wrap'
      >
        <VStack spacing={4} align={textAlign}>
          <Text fontSize={fontSize} color='white'>
            © 版權所有 J 個區塊日記。
          </Text>
          <Text fontSize={fontSize} color='white'>
            聯絡資訊: contact@yourcompany.com
          </Text>
        </VStack>

        <VStack spacing={4} align={textAlign}>
          <LinksStack spacing={4} align={textAlign} fontSize={fontSize}>
            <Link href='/exchange'>交易所記事</Link>
            <Link href='/project'>項目記事</Link>
            <Link href='/game-fi'>GAME-FI</Link>
            <Link href='/food-travel'>美食旅遊</Link>
            <Link href='/skills'>技能紀錄</Link>
            <Link href='/about-us'>關於我們</Link>
          </LinksStack>
          <HStack as='form' onSubmit={handleSubscribe}>
            <Input
              variant='filled'
              placeholder='Enter your email for newsletter'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size='md'
            />
            <Button type='submit' colorScheme='blue' size='md'>
              訂閱
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Footer;
