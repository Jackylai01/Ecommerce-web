import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { FC } from 'react';

interface TabItemWithIcon {
  label: string;
  icon: React.ElementType; // 使用React.ElementType以支持图标组件
}
interface TabsComponentProps {
  tabItems: TabItemWithIcon[];
  onChange: (index: number) => void;
  index: number;
}

const TabsComponent: FC<TabsComponentProps> = ({
  tabItems,
  onChange,
  index,
}) => {
  return (
    <Tabs
      index={index}
      onChange={(index) => onChange(index)}
      mt='3rem'
      size='lg'
    >
      <TabList borderBottom='none'>
        <>
          {tabItems.map((item, idx) => (
            <Tab
              key={idx}
              _selected={{
                bg: 'blue.500',
                color: 'white',
                borderRadius: '12px',
              }}
            >
              <Box as={item.icon} mr='2' />
              {item.label}
            </Tab>
          ))}
        </>
      </TabList>
      <TabPanels>
        {tabItems.map((_, idx) => (
          <TabPanel key={idx}></TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;
