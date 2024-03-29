import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';
import { IBreadcrumbItem } from '@models/requests/products';

interface ICustomBreadcrumbProps {
  items?: IBreadcrumbItem[];
}

export const CustomBreadcrumb = ({ items = [] }: ICustomBreadcrumbProps) => {
  return (
    <>
      {items.length > 0 && (
        <Breadcrumb
          spacing='8px'
          separator={<ChevronRightIcon color='gray.500' />}
          w={{ base: '100%', lg: '90%' }}
          py='2rem'
          px='1rem'
          mx='auto'
          fontSize={{ base: 'xs', md: 'md' }}
          color='black'
        >
          {items.map((item, index) =>
            index !== items.length - 1 ? (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem key={index}>
                <Text color='gray.500'>{item.name}</Text>
              </BreadcrumbItem>
            ),
          )}
        </Breadcrumb>
      )}
    </>
  );
};
