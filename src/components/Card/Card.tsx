import { Box, useStyleConfig } from '@chakra-ui/react';
import { CardProps } from '@models/entities/shared/Card';

function Card({ variant, children, rest }: CardProps) {
  const styles = useStyleConfig('Card', { variant });

  return (
    <Box
      __css={styles}
      {...rest}
      boxShadow='0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
      borderRadius='12px'
    >
      {children}
    </Box>
  );
}

export default Card;
