import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ElementType, FC } from 'react';
import { useAdminColorMode } from 'src/context/colorMode';

interface TabItemWithIcon {
  label: string;
  icon: ElementType;
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
  const { colorMode } = useAdminColorMode();
  const tabsBg = colorMode === 'light' ? 'black' : 'white';

  return (
    <Tabs
      index={index}
      onChange={(index) => onChange(index)}
      mt='5rem'
      ml='1rem'
      color={tabsBg}
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
