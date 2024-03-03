import { Box, Button, useBreakpointValue } from '@chakra-ui/react';
import { ADMIN_ROUTE } from '@fixtures/constants';
import { CRUDConfig } from '@fixtures/crud-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { setArticleOperation } from '@reducers/admin/upload';
import { resetCrudLayout } from '@reducers/crud-layout';
import {
  crudLayoutCreateAsync,
  crudLayoutDetailAsync,
  crudLayoutUpdateAsync,
} from '@reducers/crud-layout/actions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import FormLayoutUI from './FormLayoutUI';

type Props = {
  moduleName: string;
  id?: string;
  config: CRUDConfig;
  customSubmit?: (data: any) => void;
  children?: React.ReactNode;
  isLoading?: boolean;
};

const FormLayout = ({
  moduleName,
  id,
  config: { title, apiModuleName, actions, detailExtraActions, fieldConfigs },
  customSubmit,
  children,
  isLoading,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const buttonSize = useBreakpointValue({ base: 'xs', md: 'md', lg: 'lg' });
  const isCreate = id === 'create';
  const { isArticleOperation } = useAppSelector((state) => state.adminUpload);

  const {
    detail: detailData,
    status: {
      createSuccess,
      updateSuccess,
      detailLoading,
      createLoading,
      updateLoading,
    },
    error: { detailError, createError, updateError },
  } = useAppSelector((state) => state.crudLayout);

  useEffect(() => {
    if (isCreate || !id) return;
    dispatch(crudLayoutDetailAsync({ apiModuleName, id }));
  }, [apiModuleName, dispatch, id, isCreate]);

  useEffect(() => {
    return () => {
      dispatch(resetCrudLayout());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      router.push(`/${ADMIN_ROUTE}/${moduleName}`);
      return;
    }
    //處理圖片上傳、刪除不要導回到moduleName
    dispatch(setArticleOperation(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createSuccess, updateSuccess, router, moduleName]);

  const onSubmit = (data: any) => {
    if (customSubmit) {
      customSubmit(data);
      return;
    }

    if (isCreate) {
      dispatch(crudLayoutCreateAsync({ apiModuleName, data }));
    } else {
      dispatch(
        crudLayoutUpdateAsync({
          apiModuleName,
          data: { ...data, _id: id },
        }),
      );
    }
  };

  return (
    <FormLayoutUI
      title={title}
      isLoading={detailLoading || createLoading || updateLoading}
      detailData={detailData}
      fieldConfigs={fieldConfigs}
      onSubmit={onSubmit}
      error={detailError || createError || updateError}
      actions={
        <>
          <Box as='main' display='flex'>
            {actions.includes('return') && (
              <Link href={`/${ADMIN_ROUTE}/${moduleName}`}>
                <Button mr='1rem' bg='blue.300' color='white' size={buttonSize}>
                  返回
                </Button>
              </Link>
            )}
            {actions.includes('home') && (
              <Link href={`/${ADMIN_ROUTE}`}>
                <Button mr='1rem' bg='blue.300' color='white' size={buttonSize}>
                  返回首頁
                </Button>
              </Link>
            )}

            {detailExtraActions?.map(({ label, color, href, onClick }) =>
              href ? (
                <Link key={label} href={href}>
                  <Box
                    as='a'
                    className={`container__action container__action--${color}`}
                  >
                    {label}
                  </Box>
                </Link>
              ) : (
                <Button
                  key={label}
                  className={`container__action container__action--${color}`}
                  onClick={onClick}
                >
                  {label}
                </Button>
              ),
            )}
            {actions.includes('save') && (
              <Button
                as='button'
                bg='blackAlpha.800'
                color='white'
                type='submit'
                size={buttonSize}
              >
                儲存檔案
              </Button>
            )}
          </Box>
        </>
      }
    >
      {children}
    </FormLayoutUI>
  );
};

export default FormLayout;
