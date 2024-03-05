import { Box } from '@chakra-ui/react';
import Dashboard from '@components/Layout/AdminLayout/Dashboard';
import type { NextPage } from 'next';

const AdminHomePage: NextPage = () => {
  return (
    <>
      <Box>
        <Dashboard />
      </Box>
    </>
  );
};

export default AdminHomePage;
