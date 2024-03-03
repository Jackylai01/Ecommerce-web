import { Box, Flex, Icon, useMediaQuery } from '@chakra-ui/react';
import { ADMIN_ROUTE } from '@fixtures/constants';
import useAppDispatch from '@hooks/useAppDispatch';
import { adminLogoutAsync } from '@reducers/admin/auth/actions';
import Link from 'next/link';
import { useState } from 'react';
import { FaHome, FaImage, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { MdCreate } from 'react-icons/md';

type NavbarItem = {
  icon: any;
  label: any;
  href: any;
  isActive: boolean;
  onClick: any;
};

type NavItem = 'Home' | 'Account' | 'Create' | 'Photos' | 'Logout';

const routeMapping: { [key in NavItem]: string } = {
  Home: `/${ADMIN_ROUTE}`,
  Account: `/${ADMIN_ROUTE}/admin-user`,
  Create: `/${ADMIN_ROUTE}/articles/create`,
  Photos: `/${ADMIN_ROUTE}`,
  Logout: `/${ADMIN_ROUTE}`,
};

const iconMapping: { [key in NavItem]: any } = {
  Home: FaHome,
  Account: FaUser,
  Create: MdCreate,
  Photos: FaImage,
  Logout: FaSignOutAlt,
};

const NavbarItem = ({ icon, label, href, isActive, onClick }: NavbarItem) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onClick(label);

    setTimeout(() => {
      setIsAnimating(false);
    }, 250);
  };

  return (
    <Link href={href}>
      <Box
        as='a'
        onClick={handleClick}
        style={{ textDecoration: 'none' }}
        cursor='pointer'
      >
        <Flex
          direction='column'
          align='center'
          p={3}
          position='relative'
          transition='250ms ease-in-out'
        >
          {isActive && (
            <Box
              position='absolute'
              top='-1.5rem'
              w='3rem'
              h='3rem'
              bg='green.500'
              borderRadius='50%'
              zIndex='1'
              border='5px solid #172034'
            />
          )}
          <Icon
            as={icon}
            w={6}
            h={6}
            zIndex='2'
            color={isActive ? 'white' : 'black'}
            transform={isActive || isAnimating ? 'translateY(-100%)' : 'none'}
            transition='transform 250ms ease-in-out'
          />
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = () => {
  const dispatch = useAppDispatch();
  const [activeItem, setActiveItem] = useState('Home');
  const [isMobile] = useMediaQuery('(max-width: 556px)');
  const handleLogout = () => {
    dispatch(adminLogoutAsync());
  };
  if (!isMobile) {
    return null;
  }

  return (
    <Flex
      position='fixed'
      bottom='0px'
      left='0'
      right='0'
      mx='auto'
      width='100%'
      maxW='400px'
      height='100px'
      align='center'
      justify='space-around'
      zIndex='10'
    >
      <Box bg='white' position='relative' borderRadius='50'>
        <Flex>
          {(['Home', 'Account', 'Create', 'Photos', 'Logout'] as NavItem[]).map(
            (item) => (
              <NavbarItem
                key={item}
                icon={iconMapping[item]}
                label={item}
                href={routeMapping[item]}
                isActive={activeItem === item}
                onClick={
                  item === 'Logout' ? handleLogout : () => setActiveItem(item)
                }
              />
            ),
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default MobileNav;
