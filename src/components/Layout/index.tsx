import { PageLayoutType } from '@enums/page-layout-type';
import { toPageLayoutType } from '@helpers/router';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { setPageLayoutType } from '@reducers/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ColorModeProvider } from 'src/context/colorMode';
import AdminAuthLayout from './AdminAuthLayout';
import AdminLayout from './AdminLayout';
import ClientLayout from './ClientLayout';
import ClientPublicLayout from './ClientPublicLayout';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { pathname } = useRouter(); // 從 Next.js 的 useRouter hook 獲取當前頁面的路徑名稱

  const { pageLayoutType } = useAppSelector((state) => state.layout);

  useEffect(() => {
    const newPageLayoutType = toPageLayoutType(pathname); // 根據當前的路徑名稱計算出新的頁面佈局類型
    if (newPageLayoutType === pageLayoutType) return; // 新的頁面佈局類型與當前的頁面佈局類型一致，則不進行任何操作
    dispatch(setPageLayoutType(newPageLayoutType));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // 當 pathname 變化時，執行此 useEffect 中的代碼

  // 根據當前的頁面佈局類型，決定要使用的佈局組件，並將傳入的子元素插入該佈局組件

  return (
    <>
      {pageLayoutType === PageLayoutType.CLIENT && (
        <ClientLayout>{children}</ClientLayout>
      )}
      {pageLayoutType === PageLayoutType.ADMIN && (
        <ColorModeProvider>
          <AdminLayout>{children}</AdminLayout>
        </ColorModeProvider>
      )}
      {pageLayoutType === PageLayoutType.ADMIN_AUTH && (
        <AdminAuthLayout>{children}</AdminAuthLayout>
      )}
      {pageLayoutType === PageLayoutType.CLIENT_PUBLIC && (
        <ClientPublicLayout>{children}</ClientPublicLayout>
      )}
    </>
  );
};

export default Layout;
