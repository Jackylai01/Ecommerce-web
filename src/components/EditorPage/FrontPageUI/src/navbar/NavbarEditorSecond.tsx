import { BellIcon, SearchIcon, StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <Box className={'navbar-second'}>
      <Flex
        className={'navbar-second__container'}
        align='center'
        justify='space-between'
      >
        <NextLink href='/' passHref>
          <Link className={'navbar-second__logo'}>EliteShop</Link>
        </NextLink>

        <Flex align='center'>
          <Menu>
            <MenuButton as={Link} mr='1.5rem' className={'navbar-second__link'}>
              全部類別
            </MenuButton>
            <MenuList>
              <NextLink href='#' passHref>
                <MenuItem className={'navbar-second__dropdown-link'}>
                  電子產品
                </MenuItem>
              </NextLink>
              <NextLink href='#' passHref>
                <MenuItem className={'navbar-second__dropdown-link'}>
                  時尚服飾
                </MenuItem>
              </NextLink>
              <NextLink href='#' passHref>
                <MenuItem className={'navbar-second__dropdown-link'}>
                  家居生活
                </MenuItem>
              </NextLink>
              <NextLink href='#' passHref>
                <MenuItem className={'navbar-second__dropdown-link'}>
                  美妝保養
                </MenuItem>
              </NextLink>
            </MenuList>
          </Menu>

          <Flex as='form' align='center' className={'navbar-second__search'}>
            <Input
              type='text'
              placeholder='搜尋商品...'
              variant='unstyled'
              className={'navbar-second__search-input'}
            />
            <IconButton
              aria-label='Search'
              icon={<SearchIcon />}
              className={'navbar-second__search-button'}
            />
          </Flex>
        </Flex>

        <Flex align='center'>
          <NextLink href='#' passHref>
            <Link className={'navbar-second__icon-link'}>
              <BellIcon />
              <Badge className={'navbar-second__icon-badge'}></Badge>
            </Link>
          </NextLink>
          <NextLink href='#' passHref>
            <Link className={'navbar-second__icon-link'} ml='1.5rem'>
              <StarIcon />
              <Badge className={'navbar-second__icon-badge'}></Badge>
            </Link>
          </NextLink>
          <Menu>
            <MenuButton
              as={Link}
              className={'navbar-second__icon-link'}
              ml='1.5rem'
            >
              <FaUser />
            </MenuButton>
            <MenuList>
              <NextLink href='#' passHref>
                <MenuItem className={'navbar-second__dropdown-link'}>
                  個人管理
                </MenuItem>
              </NextLink>
              <NextLink href='#' passHref>
                <MenuItem className={'navbar-second__dropdown-link'}>
                  登出
                </MenuItem>
              </NextLink>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
