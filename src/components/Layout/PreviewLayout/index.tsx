import { Box } from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode;
};

const PreviewLayout = ({ children }: Props) => {
  return (
    <Box>
      <Box as='aside'>{children}</Box>
    </Box>
  );
};

export default PreviewLayout;
