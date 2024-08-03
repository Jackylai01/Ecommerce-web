// src/components/AdminEditPageLayout.tsx
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
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
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import Canvas from './Canvas';
import EditPageSidebar from './EditPageSidebar';

interface FormValues {
  components: Component[];
}

const AdminEditPageLayout: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    userInfo,
    status: { loginLoading },
  } = useAppSelector((state) => state.adminAuth);
  const { active: isEditing, pageBlocks: components } = useAppSelector(
    (state) => state.adminEditPages,
  );

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [currentRoute, setCurrentRoute] = useState<string>('/home');
  const [isClient, setIsClient] = useState(false);

  const formMethods = useForm<FormValues>({
    defaultValues: {
      components: components,
    },
  });

  const { control, handleSubmit } = formMethods;
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: 'components',
  });

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

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
    // 在這裡根據路由變更加載相應頁面的數據
  };

  const handleDropComponent = (component: Component) => {
    dispatch(addBlock(component));
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

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

  const handleRemoveComponent = (index: number) => {
    dispatch(removeBlockItem(index));
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

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

  if (!isClient) {
    return null;
  }

  return (
    <FormProvider {...formMethods}>
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
            <Button colorScheme='blue'>發佈到前台</Button>
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
              components={components}
              onDropComponent={handleDropComponent}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onRemoveComponent={handleRemoveComponent}
              isEditing={isEditing}
            />
          </Box>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export default AdminEditPageLayout;
