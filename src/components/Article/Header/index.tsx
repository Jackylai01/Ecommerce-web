import { Box, Container, Heading, Text } from '@chakra-ui/react';
import SearchBar from '../SearchBar';

const Header = () => (
  <Box
    bgGradient='linear(to-r, purple.700, indigo.700)'
    color='white'
    py={20}
    px={4}
  >
    <Container maxW='container.lg' textAlign='center'>
      <Heading as='h1' size='2xl' mb={4}>
        CodeCraft
      </Heading>
      <Text fontSize='xl' mb={8}>
        探索、學習、分享前端技術的精彩世界
      </Text>
      <SearchBar />
    </Container>
  </Box>
);

export default Header;
