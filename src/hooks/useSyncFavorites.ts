import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ProductsResponse } from '@models/responses/products.res';
import { addItem } from '@reducers/client/cart';
import { useEffect } from 'react';

const useSyncFavorites = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.clientAuth);

  useEffect(() => {
    if (userInfo) {
      const localFavorites = JSON.parse(
        localStorage.getItem('favorites') || '[]',
      );
      localFavorites.forEach((product: ProductsResponse) => {
        dispatch(addItem({ key: 'wishlist', product, count: 1 }));
      });
      localStorage.removeItem('favorites');
    }
  }, [userInfo, dispatch]);
};

export default useSyncFavorites;
