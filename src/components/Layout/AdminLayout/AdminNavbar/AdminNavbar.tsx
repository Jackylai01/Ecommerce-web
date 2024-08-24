import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from '@chakra-ui/react';
import { getChineseNameForPath } from '@helpers/router';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';
import AdminNavbarLinks from './AdminNavbarLinks';

interface AdminNavbarType {
  fixed: any;
  secondary: any;
  onOpen: any;
}

const AdminNavbar = ({ fixed, secondary, onOpen }: AdminNavbarType) => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const currentPathChinese = getChineseNameForPath(router.pathname);
  const { colorMode } = useAdminColorMode();
  const mainText = colorMode === 'light' ? 'gray.700' : 'gray.200';
  const secondaryText = colorMode === 'light' ? 'gray.400' : 'gray.200';

  const navbarShadowValue = colorMode
    ? '0px 7px 23px rgba(0, 0, 0, 0.05)'
    : 'none';

  const navbarBgValue = colorMode
    ? 'linear-gradient(112.83deg, rgba(34, 31, 31, 0.82) 0%, rgba(36, 36, 36, 0.8) 110.84%)'
    : 'linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)';

  const navbarBorderValue = colorMode ? '#FFFFFF' : 'rgba(255, 255, 255, 0.31)';

  const navbarFilterValue = colorMode
    ? 'none'
    : 'drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))';

  let navbarFilter = colorMode
    ? 'none'
    : 'drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))';

  let navbarPosition = 'absolute';
  let navbarBackdrop = 'blur(21px)';
  let navbarShadow = 'none';
  let navbarBg = 'none';
  let navbarBorder = 'transparent';
  let secondaryMargin = '0px';
  let paddingX = '15px';

  useEffect(() => {
    const changeNavbar = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', changeNavbar);
    return () => window.removeEventListener('scroll', changeNavbar);
  }, []);

  if (fixed && scrolled) {
    navbarPosition = 'fixed';
    navbarShadow = navbarShadowValue;
    navbarBg = navbarBgValue;
    navbarBorder = navbarBorderValue;
    navbarFilter = navbarFilterValue;
  }

  if (secondary) {
    navbarBackdrop = 'none';
    navbarPosition = 'absolute';
    secondaryMargin = '22px';
    paddingX = '30px';
  }
  return (
    <Flex
      position={navbarPosition as any}
      bg={navbarBg}
      transitionDelay='0s, 0s, 0s, 0s'
      transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
      transition-property='box-shadow, background-color, filter, border'
      transitionTimingFunction='linear, linear, linear, linear'
      display='flex'
      minH='75px'
      alignItems={{ xl: 'center' }}
      justifyContent={{ xl: 'center' }}
      right='30px'
      px={{
        sm: paddingX,
        md: '30px',
      }}
      pt='8px'
      top='18px'
      w={{ sm: 'calc(100vw - 30px)', xl: 'calc(100vw - 75px - 275px)' }}
    >
      <Flex
        w='100%'
        flexDirection={{
          sm: 'column',
          md: 'row',
        }}
        alignItems={{ xl: 'center' }}
      >
        <Box mb={{ sm: '8px', md: '0px' }} flexWrap='wrap'>
          <Breadcrumb>
            <BreadcrumbItem color={mainText}>
              <BreadcrumbLink href='#' color={secondaryText}>
                頁面
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem color={mainText}>
              <BreadcrumbLink href='#' color={mainText}>
                {currentPathChinese}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box ms='auto' w={{ sm: '100%', md: 'unset' }}>
          <AdminNavbarLinks
            onOpen={onOpen}
            secondary={secondary}
            fixed={fixed}
            logoText={'PURITY UI DASHBOARD'}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default AdminNavbar;
