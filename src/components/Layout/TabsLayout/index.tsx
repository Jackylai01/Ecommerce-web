import { Box, BoxProps } from '@chakra-ui/react';
import TabsComponent from '@components/Tabs';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

interface TabItem {
  label: string;
  path: string;
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

  return (
    <Box {...rest}>
      <TabsComponent
        tabs={tabsConfig.map((tab) => tab.label)}
        index={activeTabIndex >= 0 ? activeTabIndex : 0}
        onChange={handleTabChange}
      />
      {children}
    </Box>
  );
};

export default TabsLayout;
