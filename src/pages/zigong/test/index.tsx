import { Box } from '@chakra-ui/react';
import useAdminAuth from '@hooks/useAdminAuth';

const TestPage = () => {
  useAdminAuth();
  return <Box>1</Box>;
};

export default TestPage;
