import { Flex } from '@chakra-ui/react';
import Breadcrumbs from './Breadcrumbs';
import HeaderUser from './HeaderUser';

const AdminHeader = () => {
  return (
    <Flex
      w='70%'
      as='header'
      mt='1rem'
      justifyContent={{ base: 'space-between', md: 'center' }}
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems='center'
      overflow='hidden'
      mb='3rem'
    >
      <Breadcrumbs />
      <HeaderUser />
    </Flex>
  );
};

export default AdminHeader;
