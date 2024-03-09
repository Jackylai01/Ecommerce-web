import { Box, useStyleConfig } from '@chakra-ui/react';
import { CardProps } from '@models/entities/shared/Card';

function CardHeader({ variant, children, rest }: CardProps) {
  const styles = useStyleConfig('CardHeader', { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default CardHeader;
