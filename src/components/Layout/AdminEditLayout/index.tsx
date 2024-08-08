import { Box, Button, Flex, Heading, useToast } from '@chakra-ui/react';
import { Component } from '@fixtures/componentLibrary';
import { ADMIN_ROUTE } from '@fixtures/constants';
import { loadAdminToken } from '@helpers/token';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  addBlock,
  removeBlockItem,
  setCustomPageActive,
  setPageBlocks,
} from '@reducers/admin/admin-edit-pages';
import { setAdminUserInfo } from '@reducers/admin/auth';
import {
  createDesignPageAsync,
  getDesignPageByRouteAsync,
} from '@reducers/admin/design-pages/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import LoadingLayout from '../LoadingLayout';
import Canvas from './Canvas';
import EditPageSidebar from './EditPageSidebar';

interface FormValues {
  components: Component[];
}

const AdminEditPageLayout: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    userInfo,
    status: { loginLoading },
  } = useAppSelector((state) => state.adminAuth);
  const { active: isEditing, pageBlocks: components } = useAppSelector(
    (state) => state.adminEditPages,
  );
  const {
    currentPage,
    status: {
      createDesignPageFailed,
      createDesignPageLoading,
      createDesignPageSuccess,
    },
    error: { createDesignPageError },
  } = useAppSelector((state) => state.adminDesignPage);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [currentRoute, setCurrentRoute] = useState<string>('/home');
  const [isClient, setIsClient] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const formMethods = useForm<FormValues>({
    defaultValues: { components: components },
  });
  const { control, handleSubmit } = formMethods;
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: 'components',
  });

  const handleToggleSidebar = () => setIsCollapsed((prev) => !prev);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    key: string | number,
  ) => {
    if (!isEditing) return;
    if (typeof key === 'number') {
      setDraggedIndex(key);
    } else {
      e.dataTransfer.setData('component', key);
    }
  };

  const handleRouteChange = (route: string) => {
    setCurrentRoute(route);
    dispatch(getDesignPageByRouteAsync(route));
  };

  const handleDropComponent = (component: Component) =>
    dispatch(addBlock(component));

  const handleDragEnd = () => setDraggedIndex(null);

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      const newComponents = [...components];
      const [draggedComponent] = newComponents.splice(draggedIndex, 1);
      newComponents.splice(index, 0, draggedComponent);
      setDraggedIndex(index);
      dispatch(setPageBlocks(newComponents));
    }
  };

  const handleRemoveComponent = (index: number) =>
    dispatch(removeBlockItem(index));

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append('route', currentRoute);

    const blocks = components.map((component) => ({
      ...component,
      style: component.style || {},
      className: component.className || '',
      elements: component.elements || [],
    }));
    formData.append('blocks', JSON.stringify(blocks));

    if (logoFile) {
      formData.append('images', logoFile);
    }

    dispatch(createDesignPageAsync(formData));
  };

  const handleImageUpload = (index: number, file: File) => {
    setLogoFile(file);
    const updatedComponents = components.map((component, compIndex) => {
      if (compIndex === index) {
        return {
          ...component,
          elements: component.elements?.map((element: any) => {
            if (element.tagName === 'img') {
              return { ...element, src: file };
            }
            return element;
          }),
        };
      }
      return component;
    });

    dispatch(setPageBlocks(updatedComponents));
  };

  useEffect(() => {
    if (createDesignPageSuccess) {
      toast({
        title: '建立頁面版型成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(getDesignPageByRouteAsync(currentRoute));
    }
    if (createDesignPageFailed) {
      toast({
        title: '建立頁面版型失敗',
        description: createDesignPageError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [
    createDesignPageFailed,
    createDesignPageSuccess,
    createDesignPageError,
    toast,
    currentRoute,
    dispatch,
  ]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const tokenInfo = loadAdminToken();
    if (tokenInfo && !userInfo) {
      dispatch(setAdminUserInfo(tokenInfo));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (loginLoading || !router.isReady) return;
    if (!userInfo) {
      router.push(`/${ADMIN_ROUTE}/auth/login`);
    }
  }, [userInfo, router]);

  useEffect(() => {
    handleRouteChange(currentRoute);
  }, [dispatch, currentRoute]);

  useEffect(() => {
    if (currentPage) {
      const componentsWithType = currentPage.blocks.map((block) => ({
        ...block,
        type: block.className,
        name: block.className,
      })) as Component[];
      dispatch(setPageBlocks(componentsWithType));
    } else {
      dispatch(setPageBlocks([]));
    }
  }, [currentPage, dispatch]);

  if (!isClient) return null;

  return (
    <FormProvider {...formMethods}>
      <LoadingLayout isLoading={createDesignPageLoading}>
        <Flex
          h='100vh'
          direction='column'
          as='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex
            justify='space-between'
            p={4}
            bg='gray.100'
            borderBottom='1px solid'
            borderColor='gray.200'
          >
            <Heading as='h1' size='lg'></Heading>
            <Flex>
              <Button
                onClick={() => dispatch(setCustomPageActive(!isEditing))}
                mr={2}
              >
                {isEditing ? '結束編輯模式' : '進入編輯模式'}
              </Button>
              <Button
                colorScheme='blue'
                mr={2}
                onClick={() => router.push(`/preview?route=${currentRoute}`)}
              >
                查看頁面預覽
              </Button>
              <Button colorScheme='blue' type='submit'>
                發佈到前台
              </Button>
            </Flex>
          </Flex>
          <Flex flex='1'>
            <EditPageSidebar
              isCollapsed={isCollapsed}
              onToggle={handleToggleSidebar}
              onDragStart={handleDragStart}
              isEditing={isEditing}
              currentRoute={currentRoute}
              onRouteChange={handleRouteChange}
            />
            <Box flex='1' p={8} overflowY='auto'>
              <Canvas
                components={components as Component[]}
                onDropComponent={handleDropComponent}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onRemoveComponent={handleRemoveComponent}
                isEditing={isEditing}
                onImageUpload={handleImageUpload}
              />
            </Box>
          </Flex>
        </Flex>
      </LoadingLayout>
    </FormProvider>
  );
};

export default AdminEditPageLayout;
