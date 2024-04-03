import { Box, BoxProps } from '@chakra-ui/react';
import TabsComponent from '@components/Tabs';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

interface TabItem {
  label: string;
  path: string;
  icon: any;
}

interface MainLayoutProps extends BoxProps {
  children: ReactNode;
  tabsConfig: TabItem[];
}

const TabsLayout: FC<MainLayoutProps> = ({ children, tabsConfig, ...rest }) => {
  const router = useRouter();

  const currentPath = router.pathname;

  const activeTabIndex = tabsConfig.findIndex((tab) =>
    currentPath.startsWith(tab.path),
  );

  const handleTabChange = (index: number) => {
    const path = tabsConfig[index]?.path || '/';
    router.push(path);
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
