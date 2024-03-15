import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FC } from 'react';

interface TabsComponentProps {
  tabs: string[];
  onChange: (index: number) => void;
  index: number;
}

const TabsComponent: FC<TabsComponentProps> = ({ tabs, onChange, index }) => {
  return (
    <Tabs index={index} onChange={onChange} mt='3rem'>
      <TabList>
        {tabs.map((label, idx) => (
          <Tab key={idx}>{label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((_, idx) => (
          <TabPanel key={idx}></TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;
