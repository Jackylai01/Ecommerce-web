import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

interface CardBodyProps extends BoxProps {
  variant?: string;
  children: React.ReactNode;
}

function CardBody({ variant, children, ...rest }: CardBodyProps) {
  const styles = useStyleConfig('CardBody', { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default CardBody;
