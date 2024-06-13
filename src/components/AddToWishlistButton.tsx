import { Button, useToast } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ProductsResponse } from '@models/responses/products.res';
import {
  publicAddFavoritesAsync,
  publicGetFavoritesAsync,
  publicRemoveFavoritesAsync,
} from '@reducers/public/favorite/actions';
import { useEffect } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface IAddToWishlistButtonProps {
  product: ProductsResponse;
}

export const AddToWishlistButton = ({ product }: IAddToWishlistButtonProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.clientAuth);
  const favorites = useAppSelector((state) => state.publicFavorites.favorites);

  useEffect(() => {
    if (userInfo) {
      dispatch(publicGetFavoritesAsync(userInfo._id));
    }
  }, [dispatch, userInfo]);

  const productIsAdded =
    Array.isArray(favorites) && favorites.includes(product._id);

  const handleAddItem = () => {
    if (userInfo) {
      dispatch(
        publicAddFavoritesAsync({
          userId: userInfo._id,
          productId: product._id,
        }),
      ).then(() => {
        toast({
          title: 'Product added to your wishlist.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      });
    } else {
      toast({
        title: 'Please log in to add items to your wishlist.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoveItem = () => {
    if (userInfo) {
      dispatch(
        publicRemoveFavoritesAsync({
          userId: userInfo._id,
          productId: product._id,
        }),
      ).then(() => {
        toast({
          title: 'Product removed from your wishlist.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      });
    } else {
      toast({
        title: 'Please log in to remove items from your wishlist.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {productIsAdded ? (
        <Button
          pos='absolute'
          variant='ghost'
          bgColor='transparent'
          color='red.400'
          _hover={{ bgColor: 'transparent' }}
          rounded='full'
          title='Remove from Wishlist'
          onClick={handleRemoveItem}
        >
          <BsHeartFill />
        </Button>
      ) : (
        <Button
          pos='absolute'
          variant='ghost'
          bgColor='transparent'
          color='red.400'
          _hover={{ bgColor: 'transparent' }}
          rounded='full'
          title='Add to Wishlist'
          onClick={handleAddItem}
        >
          <BsHeart />
        </Button>
      )}
    </>
  );
};
