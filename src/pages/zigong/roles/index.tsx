import { Box } from '@chakra-ui/react';
import RoleManagement from '@components/Layout/AdminLayout/RoleManagement';
import TabsLayout from '@components/Layout/TabsLayout';
import { UsersConfig } from '@fixtures/Tabs-configs';

const RolesPages = () => {
  return (
    <Box p={{ base: 4, md: 6 }}>
      <TabsLayout tabsConfig={UsersConfig}>
        <RoleManagement />
      </TabsLayout>
    </Box>
  );
};

export default RolesPages;
