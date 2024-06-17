import { Box, BoxProps } from '@chakra-ui/react';
import TabsComponent from '@components/Tabs';
import { useRouter } from 'next/router';
import { ElementType, FC, ReactNode } from 'react';

interface TabItem {
  label: string;
  path: string;
  icon: ElementType;
}

interface MainLayoutProps extends BoxProps {
  children: ReactNode;
  tabsConfig: TabItem[];
}

const TabsLayout: FC<MainLayoutProps> = ({ children, tabsConfig, ...rest }) => {
  const router = useRouter();

  const currentPath = router.pathname;

  const activeTabIndex = tabsConfig.findIndex(
    (tab) => tab.path === currentPath,
  );

  const handleTabChange = async (index: number) => {
    if (index >= 0 && index < tabsConfig.length) {
      const path = tabsConfig[index]?.path || '/';
      try {
        await router.push(path);
      } catch (error) {
        console.error('Failed to navigate to:', path, 'Error:', error);
      }
    } else {
      console.error('Invalid tab index:', index);
    }
  };

  const tabItems = tabsConfig.map((tab) => ({
    label: tab.label,
    icon: tab.icon,
  }));

  return (
    <Box {...rest}>
      <TabsComponent
        tabItems={tabItems}
        index={activeTabIndex >= 0 ? activeTabIndex : 0}
        onChange={handleTabChange}
      />
      {children}
    </Box>
  );
};

export default TabsLayout;
