import { Box, useStyleConfig } from '@chakra-ui/react';
import { CardProps } from '@models/entities/shared/Card';

function CardBody({ variant, children, rest }: CardProps) {
  const styles = useStyleConfig('CardBody', { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default CardBody;
