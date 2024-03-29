import { Button, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { getSubstring } from '@helpers/products';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { IItem } from '@models/requests/products';
import { addItem, isAdded, removeItem } from '@reducers/client/cart';

import Link from 'next/link';
import { BsCart, BsCartX, BsTrash } from 'react-icons/bs';

interface WishlistItemProps {
  item: IItem;
}

export const WishlistItem = ({ item }: WishlistItemProps) => {
  const dispatch = useAppDispatch();

  const itemIsAdded = useAppSelector((state) =>
    isAdded(state, 'cart', item.id),
  );

  return (
    <Grid
      alignItems='center'
      templateColumns='repeat(8, 1fr)'
      borderBottomWidth='1px'
      borderBottomColor='gray.200'
      my='2'
      py='1'
    >
      <GridItem>
        <Link href={`/product/${item.slug}`}>
          <a>
            <Image
              src={item.mainImage}
              boxSize='20px'
              rounded='full'
              borderWidth='1px'
              borderColor='gray.300'
              alt={item.name}
            />
          </a>
        </Link>
      </GridItem>
      <GridItem colSpan={4}>
        <Link href={`/product/${item.slug}`}>
          <a>
            <Text fontSize='sm' title={item.name}>
              {getSubstring(item.name, 17)}
            </Text>
          </a>
        </Link>
      </GridItem>
      <GridItem>
        <Text fontWeight='bold' fontSize='xs'>
          $ {item.price}
        </Text>
      </GridItem>
      <GridItem textAlign='right'>
        {itemIsAdded ? (
          <Button
            size='xs'
            bgColor='white'
            borderWidth='1px'
            borderColor='gray.300'
            color='gray.100'
            title='Remove from Cart'
            onClick={() =>
              dispatch(removeItem({ key: 'cart', productId: item.id }))
            }
          >
            <BsCartX />
          </Button>
        ) : (
          <Button
            size='xs'
            bgColor='gray'
            borderWidth='1px'
            borderColor='brand.primary'
            color='white'
            title='Add to Cart'
            onClick={() =>
              dispatch(addItem({ key: 'cart', product: item, count: 1 }))
            }
          >
            <BsCart />
          </Button>
        )}
      </GridItem>

      <GridItem textAlign='right'>
        <Button
          variant='ghost'
          colorScheme='red'
          size='xs'
          onClick={() =>
            dispatch(removeItem({ key: 'wishlist', productId: item.id }))
          }
        >
          <BsTrash />
        </Button>
      </GridItem>
    </Grid>
  );
};
