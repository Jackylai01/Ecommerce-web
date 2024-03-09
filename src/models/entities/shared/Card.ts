import { BoxProps } from '@chakra-ui/react';

export interface CardProps extends BoxProps {
  variant?: string;
  children?: React.ReactNode;
  rest?: any;
}
