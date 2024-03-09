import { Flex } from '@chakra-ui/react';
import { IconsProps } from '@models/entities/shared/Icons';

export default function IconBox({ children, ...rest }: IconsProps) {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={'12px'}
      {...rest}
    >
      {children}
    </Flex>
  );
}
