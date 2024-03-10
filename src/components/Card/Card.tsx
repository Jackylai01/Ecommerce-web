import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { CardProps } from '@models/entities/shared/Card';

function Card({ variant, children, rest, backgroundImage }: CardProps) {
  const styles = useStyleConfig('Card', { variant });
  const bgColor = useColorModeValue('white', 'gray.700');
  return (
    <Box
      __css={styles}
      {...rest}
      boxShadow='0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
      borderRadius='16px'
      bg={bgColor}
      backgroundImage={`url(${backgroundImage})`}
      m='1rem'
      p='1rem'
    >
      {children}
    </Box>
  );
}

export default Card;
