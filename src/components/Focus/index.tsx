import { Box, Flex } from '@chakra-ui/react';
import Book from '@public/images/icons/Book.png';
import Form from '@public/images/icons/Form.png';
import Team from '@public/images/icons/Team.png';
import Investigation from '@public/images/icons/investigation.png';

import Image from 'next/image';

const Focus = () => {
  return (
    <Flex
      w='100%'
      bg='#3B3B3B'
      justifyContent='space-around'
      minH={['auto', '120px']}
      textAlign='center'
      p='1rem'
      alignItems='center'
    >
      <Box as='section' color='white' w={['60px', 'auto']}>
        <Image
          src={Investigation}
          width={60}
          height={60}
          alt='Investigation'
          layout='responsive'
        />
        <Box as='p' fontSize={{ base: '12px', md: '24px' }}>
          現況調查
        </Box>
      </Box>
      <Box as='section' color='white' w={['60px', 'auto']}>
        <Image
          src={Form}
          width={60}
          height={60}
          alt='Form'
          layout='responsive'
        />
        <Box as='p' fontSize={{ base: '12px', md: '24px' }}>
          自訂表單
        </Box>
      </Box>
      <Box as='section' color='white' w={['60px', 'auto']}>
        <Image
          src={Team}
          width={60}
          height={60}
          alt='Team'
          layout='responsive'
        />
        <Box as='p' fontSize={{ base: '12px', md: '24px' }}>
          分組協作
        </Box>
      </Box>
      <Box as='section' color='white' w={['60px', 'auto']}>
        <Image
          src={Book}
          width={60}
          height={60}
          alt='Book'
          layout='responsive'
        />
        <Box as='p' fontSize={{ base: '12px', md: '24px' }}>
          故事地圖
        </Box>
      </Box>
    </Flex>
  );
};

export default Focus;
