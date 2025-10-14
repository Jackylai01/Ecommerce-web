import { Box, Container, Heading, Text, HStack, Badge } from '@chakra-ui/react';
import SearchBar from '../SearchBar';

const Header = () => (
  <Box py={8} px={4}>
    <Container maxW='1400px'>
      <HStack justify='space-between' align='center' flexWrap='wrap' gap={4}>
        <Box>
          <HStack spacing={3} mb={2}>
            <Heading
              as='h2'
              size='lg'
              bgGradient='linear(to-r, orange.400, pink.400)'
              bgClip='text'
              fontWeight='900'
            >
              時尚生活誌
            </Heading>
            <Badge
              colorScheme='orange'
              px={3}
              py={1}
              borderRadius='full'
              fontSize='xs'
              fontWeight='700'
            >
              Fashion Blog
            </Badge>
          </HStack>
          <Text fontSize='sm' color='gray.600'>
            穿搭靈感 · 商品評測 · 購物指南 · 時尚趨勢
          </Text>
        </Box>
        <Box flex={{ base: '1', md: 'initial' }} w={{ base: '100%', md: 'auto' }} maxW='400px'>
          <SearchBar />
        </Box>
      </HStack>
    </Container>
  </Box>
);

export default Header;
