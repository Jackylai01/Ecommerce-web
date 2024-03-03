import { Button } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import { IProduct } from '@models/requests/products';
import { addItem, isAdded, removeItem } from '@reducers/client/cart';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface IAddToWishlistButtonProps {
  product: IProduct;
}

export const AddToWishlistButton = ({ product }: IAddToWishlistButtonProps) => {
  const dispatch = useAppDispatch();
  const productIsAdded = useAppSelector((state) =>
    isAdded(state, 'wishlist', product.id),
  );

  const handleAddItem = () => {
    dispatch(addItem({ key: 'wishlist', product, count: 1 }));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem({ key: 'wishlist', productId: product.id }));
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
