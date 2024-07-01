import { Card, CardBody, Heading, Image } from '@chakra-ui/react';
import { ICategory } from '@models/requests/products';
import Link from 'next/link';

interface TopCategoryCardProps {
  category: ICategory;
}

const TopCategoryCard = ({ category }: TopCategoryCardProps) => {
  return (
    <Link href={`/categories/${category._id}-${category.slug}`}>
      <Card
        direction='row'
        align='center'
        overflow='hidden'
        variant='outline'
        w='100%'
        p='10px'
        h='100%'
        _hover={{ cursor: 'pointer', bgColor: 'gray.100' }}
        bg='none'
        shadow='md'
      >
        <Image
          src={category.coverImage.imageUrl}
          alt={category.name}
          height={100}
          width={100}
        />

        <CardBody>
          <Heading size={{ base: 'sm', lg: 'md' }}>{category.name}</Heading>
        </CardBody>
      </Card>
    </Link>
  );
};

export default TopCategoryCard;
