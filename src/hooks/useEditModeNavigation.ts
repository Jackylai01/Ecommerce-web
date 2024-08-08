import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useAppDispatch from './useAppDispatch';

const useEditModeNavigation = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isEditMode =
    router.pathname.includes('/design') || router.pathname.includes('/preview');

  const safeDispatch = useCallback(
    (action) => () => {
      if (!isEditMode) {
        dispatch(action);
      }
    },
    [dispatch, isEditMode],
  );

  const safeNavigation = useCallback(
    (href?: string) => (event: React.MouseEvent) => {
      if (!href) return; // 如果 href 為 undefined，直接返回
      if (isEditMode) {
        event.preventDefault();
      } else {
        router.push(href);
      }
    },
    [router, isEditMode],
  );

  return { safeDispatch, safeNavigation };
};

export default useEditModeNavigation;
