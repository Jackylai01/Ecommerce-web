import { Box } from '@chakra-ui/react';
import EditorComponentFactory from '@components/EditorPage/FrontPageUI';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getDesignPageByRouteAsync } from '@reducers/admin/design-pages/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PreviewPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    currentPage,
    status: { getDesignPageByRouteLoading },
  } = useAppSelector((state) => state.adminDesignPage);
  const { route } = router.query;

  useEffect(() => {
    if (route) {
      dispatch(getDesignPageByRouteAsync(route as string));
    }
  }, [dispatch, route]);

  console.log(currentPage);

  return (
    <LoadingLayout isLoading={getDesignPageByRouteLoading}>
      {currentPage ? (
        <Box p={8}>
          {currentPage.blocks.map((block, index) => (
            <EditorComponentFactory
              key={index}
              component={block}
              index={index}
              isEdit={false}
              onBlur={() => {}}
              onImageUpload={() => {}}
            />
          ))}
        </Box>
      ) : (
        <p>沒有找到頁面數據。</p>
      )}
    </LoadingLayout>
  );
};

export default PreviewPage;
