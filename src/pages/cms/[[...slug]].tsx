import { Spinner } from '@chakra-ui/react';
import EditorComponentFactory from '@components/EditorPage/FrontPageUI';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getDesignPageByRouteAsync } from '@reducers/public/design-pages/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DynamicDesignPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useAppDispatch();

  const {
    detailPage,
    status: { getPageByRouteLoading },
  } = useAppSelector((state) => state.publicDesignPage);

  useEffect(() => {
    if (slug) {
      const route = Array.isArray(slug) ? `/${slug.join('/')}` : `/${slug}`;
      dispatch(getDesignPageByRouteAsync({ route }));
    }
  }, [slug, dispatch]);

  if (getPageByRouteLoading) return <Spinner />;

  if (!detailPage) return <div>Page not found</div>;

  return (
    <LoadingLayout isLoading={getPageByRouteLoading}>
      {detailPage.blocks.length > 0 ? (
        <div>
          {detailPage.blocks.map((block, index) => (
            <EditorComponentFactory
              key={index}
              component={block}
              index={index}
              isEdit={false} // 根據需要設置為 false，因為這是前台頁面
              onBlur={() => {}}
            />
          ))}
        </div>
      ) : (
        <div>此頁面尚未設計。</div>
      )}
    </LoadingLayout>
  );
};

export default DynamicDesignPage;
