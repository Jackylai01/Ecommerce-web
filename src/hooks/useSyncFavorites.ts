import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { publicGetFavoritesAsync } from '@reducers/public/favorite/actions';

import { useEffect } from 'react';

const useSyncFavorites = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.clientAuth);

  useEffect(() => {
    if (userInfo) {
      dispatch(publicGetFavoritesAsync(userInfo._id));
    }
  }, [userInfo, dispatch]);
};

export default useSyncFavorites;
