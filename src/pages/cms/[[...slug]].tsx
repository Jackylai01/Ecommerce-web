import { Spinner } from '@chakra-ui/react';
import EditorComponentFactory from '@components/EditorPage/FrontPageUI';
import LoadingLayout from '@components/Layout/LoadingLayout';
import UnderConstructionPage from '@components/UnderConstruction';
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

  if (!detailPage) return <UnderConstructionPage />;

  return (
    <LoadingLayout isLoading={getPageByRouteLoading}>
      {detailPage.blocks.length > 0 ? (
        <div>
          {detailPage.blocks.map((block, index) => (
            <EditorComponentFactory
              key={index}
              component={block}
              index={index}
              isEdit={false} //設置為 false，因為這是前台頁面，不能渲染
              onBlur={() => {}}
            />
          ))}
        </div>
      ) : (
        <UnderConstructionPage />
      )}
    </LoadingLayout>
  );
};

export default DynamicDesignPage;
