import { CloseIcon, HamburgerIcon, Icon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  Link,
  List,
  ListItem,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { AsideRouterType, asideRouter } from '@fixtures/admin-router';
import { ADMIN_ROUTE } from '@fixtures/constants';
import useAppDispatch from '@hooks/useAppDispatch';
import { adminLogoutAsync } from '@reducers/admin/auth/actions';
import NextLink from 'next/link';
import { useRef } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

type Props = {
  pageInfo?: AsideRouterType;
};

const AdminAside = ({ pageInfo }: Props) => {
  const dispatch = useAppDispatch();
  const { isOpen, onToggle } = useDisclosure();
  const [isLargerThanTablet] = useMediaQuery('(min-width: 1400px)');
  const ref = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(adminLogoutAsync());
  };

  return (
    <Box position='relative'>
      {!isLargerThanTablet && (
        <Flex
          position='fixed'
          top='4'
          left='4'
          color='white'
          onClick={onToggle}
          cursor='pointer'
          zIndex='overlay'
        >
          <IconButton
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            icon={
              isOpen ? (
                <CloseIcon color='white' />
              ) : (
                <HamburgerIcon color='white' />
              )
            }
            bg='orange.400'
          />
        </Flex>
      )}

      <Box
        ref={ref}
        position='fixed'
        top={isOpen ? '0' : '5%'}
        left={isOpen || isLargerThanTablet ? '0' : '-100%'}
        w={isLargerThanTablet ? '300px' : '100%'}
        h={isLargerThanTablet && !isOpen ? '90%' : '100%'}
        zIndex='10000'
        overflowY='auto'
        bg='#212c42'
        transition='left 0.3s'
        borderRadius={isOpen && !isLargerThanTablet ? '0' : '50px'}
        marginLeft={isLargerThanTablet ? '2rem' : '0'}
        boxShadow='0 0 5px 3px rgba(255, 255, 255, 0.7)'
      >
        {isOpen && !isLargerThanTablet && (
          <Flex justifyContent='flex-end' p='4'>
            <IconButton
              aria-label='Close menu'
              icon={<CloseIcon color='white' />}
              variant='outline'
              onClick={onToggle}
            />
          </Flex>
        )}
        <VStack spacing={4} mt='20'>
          {asideRouter.map(({ label, router }) => (
            <Box key={label} w='full'>
              <List spacing={2}>
                {router.map(({ href, label, icon }) => (
                  <ListItem key={label} p={2}>
                    <NextLink
                      href={
                        href === '/'
                          ? `/${ADMIN_ROUTE}`
                          : `/${ADMIN_ROUTE}/${href}`
                      }
                      passHref
                    >
                      <Link
                        display='flex'
                        alignItems='center'
                        bg={
                          pageInfo && pageInfo.href === href
                            ? 'blue.500'
                            : 'transparent'
                        }
                        p={2}
                        borderRadius='md'
                        _hover={{ bg: 'blue.600' }}
                      >
                        <Box as='span' mr={2} />
                        <Icon as={icon} mr={2} color='white' />
                        <Text color='white' fontWeight='500'>
                          {label}
                        </Text>
                      </Link>
                    </NextLink>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
          <Box w='100%'>
            <Flex pl='1.5rem'>
              <List spacing={2}>
                <ListItem>
                  <Box
                    as='button'
                    display='flex'
                    alignItems='center'
                    bg='transparent'
                    borderRadius='md'
                    _hover={{ bg: 'blue.600' }}
                    onClick={handleLogout}
                  >
                    <Icon as={FaSignOutAlt} mr={2} color='white' />
                    <Text color='white' fontWeight='500'>
                      登出
                    </Text>
                  </Box>
                </ListItem>
              </List>
            </Flex>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default AdminAside;
