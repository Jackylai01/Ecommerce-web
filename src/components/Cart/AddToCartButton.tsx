import { Button } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ProductsResponse } from '@models/responses/products.res';
import { addItem, isAdded, removeItem } from '@reducers/client/cart';

interface IAddToCartButtonProps {
  product: ProductsResponse;
  count?: number;
}

export const AddToCartButton = ({
  product,
  count = 1,
}: IAddToCartButtonProps) => {
  const dispatch = useAppDispatch();

  const productIsAdded = useAppSelector((state) =>
    isAdded(state, 'cart', product._id),
  );

  const handleAddItem = () => {
    dispatch(addItem({ key: 'cart', product, count }));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem({ key: 'cart', productId: product._id }));
  };

  return (
    <>
      {productIsAdded ? (
        <Button
          variant='outline'
          borderColor='gray.200'
          color='gray.500'
          borderRadius='50px'
          size='sm'
          w='150px'
          onClick={handleRemoveItem}
        >
          Remove from cart
        </Button>
      ) : (
        <Button
          variant='outline'
          borderColor='brand.primary'
          color='black'
          borderRadius='50px'
          size='sm'
          w='150px'
          onClick={handleAddItem}
        >
          Add to cart
        </Button>
      )}
    </>
  );
};
