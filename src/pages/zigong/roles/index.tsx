import { Box } from '@chakra-ui/react';
import RoleManagement from '@components/Layout/AdminLayout/RoleManagement';
import TabsLayout from '@components/Layout/TabsLayout';
import { UsersConfig } from '@fixtures/Tabs-configs';

const RolesPages = () => {
  return (
    <Box>
      <TabsLayout tabsConfig={UsersConfig}>
        <RoleManagement />
      </TabsLayout>
    </Box>
  );
};

export default RolesPages;
