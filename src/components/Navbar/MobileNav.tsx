import { Box, Flex } from '@chakra-ui/react';
import { Search } from '../Search/Search';
import { NavMenu } from './NavMenu';

export function MobileNav() {
  return (
    <>
      <Flex
        justify='space-between'
        alignItems='center'
        display={{ base: 'flex', lg: 'none' }}
        borderColor='gray.200'
        w='20%'
      >
        <NavMenu />
      </Flex>
      <Box
        px='2rem'
        py='0.5rem'
        mb='1rem'
        display={{ base: 'block', lg: 'none' }}
        w='100%'
      >
        <Search />
      </Box>
    </>
  );
}
