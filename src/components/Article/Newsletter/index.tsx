import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import React from 'react';

const Newsletter: React.FC = () => (
  <Box
    bgGradient='linear(to-r, purple.600, indigo.600)'
    borderRadius='lg'
    shadow='lg'
    p={8}
    color='white'
  >
    <Heading as='h3' size='lg' mb={4}>
      訂閱我們的技術週報
    </Heading>
    <Text mb={6}>
      獲取最新的前端開發技巧、教程和行業新聞，直接發送到您的收件箱！
    </Text>
    <Flex>
      <Input
        placeholder='您的電子郵件地址'
        flex='1'
        p={3}
        borderRadius='lg'
        bg='white'
        color='gray.800'
      />
      <Button ml={2} colorScheme='purple' borderRadius='lg' px={6}>
        訂閱
      </Button>
    </Flex>
  </Box>
);

export default Newsletter;
