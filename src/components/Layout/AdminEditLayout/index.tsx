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

  const [isClient, setIsClient] = useState(false);

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

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    key: string | number,
  ) => {
    if (typeof key === 'number') {
      setDraggedIndex(key);
    } else {
      e.dataTransfer.setData('component', key);
    }
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

  const onSubmit = (data: FormValues) => {
    // 在這裡發送 API 請求
    fetch('/api/submitPage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (!isEditing) {
      // 在編輯模式結束時更新表單數據
      formMethods.reset({
        components: components,
      });
    }
  }, [isEditing, components, formMethods]);

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
          <Heading as='h1' size='lg'>
            網頁編輯器
          </Heading>
          <Flex>
            <Button
              onClick={() => dispatch(setCustomPageActive(!isEditing))}
              mr={2}
            >
              {isEditing ? '結束編輯模式' : '進入編輯模式'}
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
          />
          <Box flex='1' p={8} overflowY='auto'>
            <Canvas
              components={fields}
              onDropComponent={(component: Component) => append(component)}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onRemoveComponent={(index: number) => remove(index)}
              isEditing={isEditing}
            />
          </Box>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export default AdminEditPageLayout;
