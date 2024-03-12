import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { CardProps } from '@models/entities/shared/Card';

function Card({ variant, children, bg, backgroundImage, ...rest }: CardProps) {
  const styles = useStyleConfig('Card', { variant });

  const defaultBgColor = useColorModeValue('white', 'gray.700');
  const backgroundColor = bg || defaultBgColor;
  return (
    <Box
      __css={styles}
      boxShadow='0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
      borderRadius='16px'
      bg={backgroundColor}
      backgroundImage={`url(${backgroundImage})`}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default Card;
