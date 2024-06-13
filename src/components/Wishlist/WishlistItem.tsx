import { Button, Grid, GridItem, Image, Link, Text } from '@chakra-ui/react';
import { getSubstring } from '@helpers/products';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { addItem, isAdded, removeItem } from '@reducers/client/cart';
import { BsCart, BsCartX, BsTrash } from 'react-icons/bs';

interface WishlistItemProps {
  item: string; // 這裡我們假設 item 是 productId
}

export const WishlistItem = ({ item }: WishlistItemProps) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.publicProducts.list);

  const product = products?.find((product) => product._id === item);

  const itemIsAdded = useAppSelector((state) => isAdded(state, 'cart', item));

  if (!product) return null; // 如果找不到對應的產品，則返回 null

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
        <Link href={`/product/${product._id}`}>
          <a>
            <Image
              src={product.coverImage.imageUrl}
              boxSize='20px'
              rounded='full'
              borderWidth='1px'
              borderColor='gray.300'
              alt={product.name}
            />
          </a>
        </Link>
      </GridItem>
      <GridItem colSpan={4}>
        <Link href={`/product/${product._id}`}>
          <a>
            <Text fontSize='sm' title={product.name}>
              {getSubstring(product.name, 17)}
            </Text>
          </a>
        </Link>
      </GridItem>
      <GridItem>
        <Text fontWeight='bold' fontSize='xs'>
          $ {product.price}
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
              dispatch(removeItem({ key: 'cart', productId: product._id }))
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
              dispatch(addItem({ key: 'cart', product, count: 1 }))
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
            dispatch(removeItem({ key: 'wishlist', productId: product._id }))
          }
        >
          <BsTrash />
        </Button>
      </GridItem>
    </Grid>
  );
};
