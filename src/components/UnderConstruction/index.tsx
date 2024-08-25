import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';

const UnderConstructionPage = () => {
  return (
    <Flex
      minH='100vh'
      bg='white'
      direction='column'
      align='center'
      justify='center'
      p={4}
    >
      <Box w='full' maxW='md'>
        <Box mb={12} textAlign='center'>
          <Divider
            w='24'
            borderWidth='2px'
            borderColor='black'
            mx='auto'
            mb={8}
          />
          <Box
            w='16'
            h='16'
            borderWidth='4px'
            borderColor='black'
            mx='auto'
            transform='rotate(45deg)'
          />
        </Box>

        <Heading
          as='h1'
          fontSize='4xl'
          fontWeight='light'
          mb={6}
          textAlign='center'
          letterSpacing='wide'
        >
          頁面設計中
        </Heading>

        <Text
          fontSize='lg'
          color='gray.600'
          mb={12}
          textAlign='center'
          fontWeight='light'
        >
          我們正在精心打造這個頁面
        </Text>

        <Box textAlign='center'>
          <Button
            as='a'
            href='/'
            variant='outline'
            borderColor='black'
            color='black'
            size='lg'
            textTransform='uppercase'
            letterSpacing='wider'
            _hover={{ bg: 'black', color: 'white' }}
            transition='all 0.3s'
          >
            返回首頁
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default UnderConstructionPage;
