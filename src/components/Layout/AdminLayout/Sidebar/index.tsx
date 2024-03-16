import { Box, useColorModeValue } from '@chakra-ui/react';
import { useRef } from 'react';
import SidebarContent from './SidebarContent';

interface SidebarType {
  routes: any;
  sidebarVariant: any;
  currentPath: string;
}

const Sidebar = ({ routes, sidebarVariant, currentPath }: SidebarType) => {
  const mainPanel = useRef<HTMLDivElement>(null);
  let variantChange = '0.2s linear';

  const sidebarBg = useColorModeValue('white', 'gray.700');
  const sidebarRadius = sidebarVariant === 'opaque' ? '16px' : '0px';
  const sidebarMargins =
    sidebarVariant === 'opaque' ? '16px 0px 16px 16px' : '0px';

  return (
    <Box ref={mainPanel}>
      <Box display={{ base: 'none', sm: 'none', xl: 'block' }} position='fixed'>
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w='260px'
          maxW='260px'
          h='100vh'
          ps='20px'
          m={sidebarMargins}
          borderRadius={sidebarRadius}
        >
          <SidebarContent
            routes={routes}
            logoText={'PURITY UI DASHBOARD'}
            display='none'
            sidebarVariant={sidebarVariant}
            currentPath={currentPath}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
