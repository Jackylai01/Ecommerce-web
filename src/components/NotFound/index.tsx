import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      minH='100vh'
      bgGradient='linear(to-br, blue.500, purple.600)'
      overflow='hidden'
      position='relative'
    >
      {/* 主要內容 */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          textAlign='center'
          p={8}
          bg='whiteAlpha.300'
          backdropFilter='blur(10px)'
          borderRadius='xl'
          shadow='xl'
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heading as='h1' fontSize='8xl' color='white' mb={4}>
              404
            </Heading>
          </motion.div>
          <Heading as='h2' fontSize='3xl' color='white' mb={6}>
            糟糕！ 頁面迷路了
          </Heading>
          <Text fontSize='xl' color='white' mb={8}>
            看來您要找的頁面決定去度假了。別擔心，讓我們帶您回家。
          </Text>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              as='a'
              href='/'
              colorScheme='blue'
              size='lg'
              variant='solid'
            >
              返回首頁
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Flex>
  );
};

export default NotFoundPage;
