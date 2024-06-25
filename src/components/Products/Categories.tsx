import { Box, Image, Link, SimpleGrid, Text } from '@chakra-ui/react';

interface CategoryProps {
  categories: Array<{
    _id: string;
    name: string;
    coverImage: {
      imageUrl: string;
    };
    slug: string;
  }>;
}

export const AllCategories = ({ categories }: CategoryProps) => {
  return (
    <Box w='90%' mx='auto' py='2rem'>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
        {categories.map((category) => (
          <Box
            key={category._id}
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            textAlign='center'
            p='4'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Link
              key={category._id}
              href={`/categories/${category._id}-${category.slug}`}
            >
              <Box
                w='100%'
                h='200px'
                display='flex'
                justifyContent='center'
                alignItems='center'
                mb='4'
              >
                <Image
                  src={category.coverImage.imageUrl}
                  alt={category.name}
                  objectFit='contain'
                  maxW='100%'
                  maxH='100%'
                />
              </Box>
              <Text fontWeight='bold' fontSize='xl'>
                {category.name}
              </Text>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
