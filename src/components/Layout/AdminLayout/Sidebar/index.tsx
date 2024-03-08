import { Box, useColorModeValue } from '@chakra-ui/react';
import { useRef } from 'react';
import SidebarContent from './SidebarContent';

const Sidebar = (props: any) => {
  const mainPanel = useRef<HTMLDivElement>(null);
  let variantChange = '0.2s linear';

  const { logoText, routes, sidebarVariant } = props;

  const sidebarBg = useColorModeValue('white', 'gray.700');
  const sidebarRadius = sidebarVariant === 'opaque' ? '16px' : '0px';
  const sidebarMargins =
    sidebarVariant === 'opaque' ? '16px 0px 16px 16px' : '0px';

  return (
    <Box ref={mainPanel}>
      <Box display={{ base: 'none', lg: 'block' }} position='fixed'>
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w='260px'
          maxW='260px'
          ms={{
            sm: '16px',
          }}
          my={{
            sm: '16px',
          }}
          h='calc(100vh - 32px)'
          ps='20px'
          pe='20px'
          m={sidebarMargins}
          borderRadius={sidebarRadius}
        >
          <SidebarContent
            routes={routes}
            logoText={'PURITY UI DASHBOARD'}
            display='none'
            sidebarVariant={sidebarVariant}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
