import { Button, useToast } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ProductsResponse } from '@models/responses/products.res';
import { addItem, isAdded, removeItem } from '@reducers/client/cart';
import { useEffect, useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface IAddToWishlistButtonProps {
  product: ProductsResponse;
}

export const AddToWishlistButton = ({ product }: IAddToWishlistButtonProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.clientAuth);
  const [localFavorites, setLocalFavorites] = useState<string[]>([]);
  const productIsAdded =
    useAppSelector((state) => isAdded(state, 'wishlist', product._id)) ||
    localFavorites.includes(product._id);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]',
    );
    setLocalFavorites(savedFavorites.map((fav: { _id: string }) => fav._id));
  }, []);

  const handleAddItem = () => {
    if (userInfo) {
      dispatch(addItem({ key: 'wishlist', product, count: 1 }));
    } else {
      const savedFavorites = JSON.parse(
        localStorage.getItem('favorites') || '[]',
      );
      if (
        !savedFavorites.some((fav: { _id: string }) => fav._id === product._id)
      ) {
        savedFavorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(savedFavorites));
        setLocalFavorites((prev) => [...prev, product._id]);
      }
      toast({
        title: 'Product added to your local wishlist.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoveItem = () => {
    if (userInfo) {
      dispatch(removeItem({ key: 'wishlist', productId: product._id }));
    } else {
      let savedFavorites = JSON.parse(
        localStorage.getItem('favorites') || '[]',
      );
      savedFavorites = savedFavorites.filter(
        (fav: { _id: string }) => fav._id !== product._id,
      );
      localStorage.setItem('favorites', JSON.stringify(savedFavorites));
      setLocalFavorites((prev) => prev.filter((id) => id !== product._id));
      toast({
        title: 'Product removed from your local wishlist.',
        status: 'success',
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
