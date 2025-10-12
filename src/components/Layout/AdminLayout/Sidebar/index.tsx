import { Box, IconButton } from '@chakra-ui/react';
import { useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAdminColorMode } from 'src/context/colorMode';
import SidebarContent from './SidebarContent';

interface SidebarType {
  routes: any;
  sidebarVariant: any;
  currentPath: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({ routes, sidebarVariant, currentPath, isCollapsed = false, onToggleCollapse }: SidebarType) => {
  const mainPanel = useRef<HTMLDivElement>(null);
  let variantChange = '0.3s ease';
  const { colorMode } = useAdminColorMode();

  const sidebarRadius = sidebarVariant === 'opaque' ? '16px' : '0px';
  const sidebarMargins =
    sidebarVariant === 'opaque' ? '16px 0px 16px 16px' : '0px';

  return (
    <Box ref={mainPanel}>
      <Box display={{ base: 'none', sm: 'none', xl: 'block' }} position='fixed' zIndex='999'>
        <Box
          bg={colorMode === 'light' ? 'white' : 'gray.900'}
          boxShadow={colorMode === 'light' ? '2px 0 10px rgba(0,0,0,0.05)' : '2px 0 10px rgba(0,0,0,0.3)'}
          transition={variantChange}
          w={isCollapsed ? '80px' : '260px'}
          maxW={isCollapsed ? '80px' : '260px'}
          h='100vh'
          ps={isCollapsed ? '10px' : '20px'}
          m={sidebarMargins}
          borderRadius={sidebarRadius}
          position='relative'
        >
          {/* 縮合按鈕 */}
          <IconButton
            aria-label="Toggle Sidebar"
            icon={isCollapsed ? <FiMenu /> : <FiX />}
            onClick={onToggleCollapse}
            position='absolute'
            top='20px'
            right='-12px'
            size='sm'
            borderRadius='full'
            bg={colorMode === 'light' ? 'white' : 'gray.700'}
            boxShadow='0 2px 8px rgba(0,0,0,0.15)'
            _hover={{
              bg: colorMode === 'light' ? 'gray.50' : 'gray.600',
              transform: 'scale(1.05)',
            }}
            transition='all 0.2s'
            zIndex='1000'
          />

          <SidebarContent
            routes={routes}
            logoText={'測試後台管理系統'}
            display='none'
            sidebarVariant={sidebarVariant}
            currentPath={currentPath}
            isCollapsed={isCollapsed}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
