import {
  Button,
  Link as ChakraLink,
  Grid,
  GridItem,
  Image,
  Text,
} from '@chakra-ui/react';
import { getSubstring } from '@helpers/products';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { addItem, isAdded, removeItem } from '@reducers/client/cart';
import { publicRemoveFavoritesAsync } from '@reducers/public/favorite/actions';
import { BsCart, BsCartX, BsTrash } from 'react-icons/bs';

interface WishlistItemProps {
  item: string; // 這裡我們假設 item 是 productId
}

export const WishlistItem = ({ item }: WishlistItemProps) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.clientAuth);
  const products = useAppSelector((state) => state.publicProducts.list);

  const product = products?.find((product) => product._id === item);

  const itemIsAdded = useAppSelector((state) => isAdded(state, 'cart', item));

  if (!product) return null;

  const handleRemoveFavorite = () => {
    if (userInfo) {
      dispatch(
        publicRemoveFavoritesAsync({
          userId: userInfo._id,
          productId: product._id,
        }),
      ).then(() => {
        dispatch(removeItem({ key: 'wishlist', productId: product._id }));
      });
    }
  };

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
        <ChakraLink href={`/product/${product._id}`}>
          <Image
            src={product.coverImage.imageUrl}
            boxSize='20px'
            rounded='full'
            borderWidth='1px'
            borderColor='gray.300'
            alt={product.name}
          />
        </ChakraLink>
      </GridItem>
      <GridItem colSpan={4}>
        <ChakraLink href={`/product/${product._id}`}>
          <Text fontSize='sm' title={product.name}>
            {getSubstring(product.name, 17)}
          </Text>
        </ChakraLink>
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
          onClick={handleRemoveFavorite}
        >
          <BsTrash />
        </Button>
      </GridItem>
    </Grid>
  );
};
