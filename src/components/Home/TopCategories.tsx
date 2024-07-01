'use client';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import { SectionHeading } from '@components/SectionHeading';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getCategoriesListAsync } from '@reducers/public/categories/actions';
import Link from 'next/link';
import { useEffect } from 'react';
import TopCategoryCard from './TopCategoryCard';

export const TopCategories = () => {
  const dispatch = useAppDispatch();
  const { list: categories } = useAppSelector((state) => state.publicCategory);

  useEffect(() => {
    dispatch(getCategoriesListAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <Box w={{ base: '100%', lg: '90%' }} mx='auto' py='3rem' px='2rem'>
      <SectionHeading title=' Shop Our Top Categories' />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
        gap='4'
      >
        {categories &&
          categories.map((category) => (
            <GridItem key={category._id}>
              <TopCategoryCard category={category} />
            </GridItem>
          ))}
      </Grid>
      <Link href='/categories'>
        <Button
          bgColor='white'
          variant='outline'
          borderColor='brand.primary'
          color='brand.primary'
          rounded='full'
          my='1rem'
        >
          Browse All Categories
        </Button>
      </Link>
    </Box>
  );
};
