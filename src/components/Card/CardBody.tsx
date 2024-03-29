import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';
import { useAdminColorMode } from 'src/context/colorMode';

interface CardBodyProps extends BoxProps {
  variant?: string;
  children: React.ReactNode;
}

function CardBody({ variant, children, ...rest }: CardBodyProps) {
  const styles = useStyleConfig('CardBody', { variant });
  const { colorMode } = useAdminColorMode();
  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.800';
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default CardBody;
