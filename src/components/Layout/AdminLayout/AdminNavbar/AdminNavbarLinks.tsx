import { BellIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { SettingsIcon } from '@components/Icons/Icons';
import avatar1 from '@public/assets/img/avatars/avatar1.png';
import avatar2 from '@public/assets/img/avatars/avatar2.png';
import avatar3 from '@public/assets/img/avatars/avatar3.png';

import LoadingLayout from '@components/Layout/LoadingLayout';
import { ItemContent } from '@components/Menu';
import { ADMIN_ROUTE } from '@fixtures/constants';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminLogoutAsync } from '@reducers/admin/auth/actions';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';
import routes from 'src/routes';
import SidebarResponsive from '../Sidebar/SidebarResponsive';

interface HeaderLinksType {
  fixed: any;
  secondary: any;
  onOpen: any;
  logoText: string;
}

export default function HeaderLinks({
  fixed,
  secondary,
  onOpen,
  logoText,
  ...rest
}: HeaderLinksType) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { colorMode } = useAdminColorMode();

  let mainTeal = colorMode === 'light' ? 'teal.300' : 'teal.300';
  let inputBg = colorMode === 'light' ? 'white' : 'gray.800';
  let mainText = colorMode === 'light' ? 'gray.700' : 'gray.200';
  let navbarIcon = colorMode === 'light' ? 'gray.500' : 'gray.200';
  let searchIcon = colorMode === 'light' ? 'gray.700' : 'gray.200';

  const {
    userInfo,
    status: { logoutFailed, logoutLoading, logoutSuccess },
    error: { logoutError },
  } = useAppSelector((state) => state.adminAuth);

  const settingsRef = useRef<any>(null);

  const handleLogout = () => {
    dispatch(adminLogoutAsync());
  };

  useEffect(() => {
    if (!userInfo) {
      router.push(`/${ADMIN_ROUTE}/auth/login`);
    }
  }, [router]);

  return (
    <LoadingLayout isLoading={logoutLoading}>
      <Flex
        pe={{ sm: '0px', md: '16px' }}
        w={{ sm: '100%', md: 'auto' }}
        alignItems='center'
        flexDirection='row'
      >
        <InputGroup
          cursor='pointer'
          bg={inputBg}
          borderRadius='15px'
          w={{
            sm: '128px',
            md: '200px',
          }}
          me={{ sm: 'auto', md: '20px' }}
          _focus={{
            borderColor: { mainTeal },
          }}
          _active={{
            borderColor: { mainTeal },
          }}
        >
          <InputLeftElement>
            <IconButton
              bg='inherit'
              borderRadius='inherit'
              _hover={{}}
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent',
              }}
              _focus={{
                boxShadow: 'none',
              }}
              icon={<SearchIcon color={searchIcon} w='15px' h='15px' />}
              aria-label='Search'
            />
          </InputLeftElement>
          <Input
            fontSize='xs'
            py='11px'
            color={mainText}
            placeholder='Type here...'
            borderRadius='inherit'
          />
        </InputGroup>

        {userInfo ? (
          <Button
            ms='0px'
            px='0px'
            me={{ sm: '2px', md: '16px' }}
            color={navbarIcon}
            variant='transparent-with-icon'
            onClick={handleLogout}
          >
            <Text>登出</Text>
          </Button>
        ) : (
          <></>
        )}

        <SidebarResponsive
          logoText={logoText}
          secondary={secondary}
          routes={routes}
        />
        <SettingsIcon
          cursor='pointer'
          ms={{ base: '16px', xl: '0px' }}
          me='16px'
          ref={settingsRef}
          onClick={onOpen}
          color={navbarIcon}
          w='18px'
          h='18px'
        />
        <Menu>
          <MenuButton>
            <BellIcon color={navbarIcon} w='18px' h='18px' />
          </MenuButton>
          <MenuList p='16px 8px'>
            <Flex flexDirection='column'>
              <MenuItem borderRadius='8px' mb='10px'>
                <ItemContent
                  time='13 minutes ago'
                  info='from Alicia'
                  boldInfo='New Message'
                  aName='Alicia'
                  aSrc={avatar1}
                />
              </MenuItem>
              <MenuItem borderRadius='8px' mb='10px'>
                <ItemContent
                  time='2 days ago'
                  info='by Josh Henry'
                  boldInfo='New Album'
                  aName='Josh Henry'
                  aSrc={avatar2}
                />
              </MenuItem>
              <MenuItem borderRadius='8px'>
                <ItemContent
                  time='3 days ago'
                  info='Payment succesfully completed!'
                  boldInfo=''
                  aName='Kara'
                  aSrc={avatar3}
                />
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    </LoadingLayout>
  );
}
