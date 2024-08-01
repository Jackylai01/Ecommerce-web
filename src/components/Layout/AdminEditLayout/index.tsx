import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
} from '@chakra-ui/react';
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
import { FaBars, FaChevronRight, FaTrash } from 'react-icons/fa';

type ComponentType = 'navbar' | 'footer' | 'main' | 'card';

interface Component {
  type: ComponentType;
  name: string;
  elements?: { tagName: string; context: string; href: string }[];
  content?: string;
}

const componentLibrary: Record<string, Component> = {
  navbar_a: {
    type: 'navbar',
    name: 'Navbar A',
    elements: [
      { tagName: 'a', context: '首頁', href: '#' },
      { tagName: 'a', context: '產品', href: '#' },
      { tagName: 'a', context: '關於我們', href: '#' },
    ],
  },
  navbar_b: {
    type: 'navbar',
    name: 'Navbar B',
    elements: [
      { tagName: 'a', context: '商店', href: '#' },
      { tagName: 'a', context: '分類', href: '#' },
      { tagName: 'a', context: '購物車', href: '#' },
      { tagName: 'a', context: '聯繫我們', href: '#' },
    ],
  },
  footer_a: {
    type: 'footer',
    name: 'Footer A',
    elements: [
      { tagName: 'a', context: '隱私政策', href: '#' },
      { tagName: 'a', context: '使用條款', href: '#' },
      { tagName: 'a', context: '聯繫我們', href: '#' },
    ],
  },
  footer_b: {
    type: 'footer',
    name: 'Footer B',
    elements: [
      { tagName: 'a', context: '關於我們', href: '#' },
      { tagName: 'a', context: '客戶服務', href: '#' },
      { tagName: 'a', context: '社交媒體', href: '#' },
    ],
  },
  main_section: {
    type: 'main',
    name: 'Main Section',
    content: '這是主要內容區域。您可以在這裡添加文字、圖片和其他元素。',
  },
  card_a: {
    type: 'card',
    name: 'Card A',
    content: '這是卡片 A 的內容。它可以包含產品信息、文章摘要等。',
  },
  card_b: {
    type: 'card',
    name: 'Card B',
    content: '這是卡片 B 的內容。它可以用於顯示團隊成員、服務項目等。',
  },
};

const categorizedComponents: any = {
  layout: ['navbar_a', 'navbar_b'],
  footer: ['footer_a', 'footer_b'],
  main: ['main_section'],
  card: ['card_a', 'card_b'],
};

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, key: string) => void;
  isEditing: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  onDragStart,
  isEditing,
}) => {
  return (
    <Box
      w={isCollapsed ? '60px' : '300px'}
      bg='white'
      p={4}
      shadow='md'
      overflowY='auto'
      transition='width 0.3s ease'
    >
      <Button
        onClick={onToggle}
        colorScheme='blue'
        rounded='full'
        position='fixed'
        left={isCollapsed ? '20px' : '280px'}
        top='20px'
        zIndex={1000}
        transition='left 0.3s ease'
      >
        {isCollapsed ? <FaChevronRight /> : <FaBars />}
      </Button>
      {!isCollapsed && (
        <>
          <Heading as='h2' size='md' mb={4}>
            組件庫
          </Heading>
          {Object.keys(categorizedComponents).map((category) => (
            <Box key={category} mb={6}>
              <Heading as='h3' size='sm' mb={2}>
                {category}
              </Heading>
              {categorizedComponents[category].map((key: any) => (
                <Box
                  key={key}
                  mb={2}
                  bg='gray.50'
                  p={2}
                  rounded='md'
                  shadow='sm'
                  cursor='move'
                  draggable={isEditing}
                  onDragStart={(e) => onDragStart(e, key)}
                >
                  {componentLibrary[key].name}
                </Box>
              ))}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

interface CanvasProps {
  components: Component[];
  onDropComponent: (component: Component) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onRemoveComponent: (index: number) => void;
  isEditing: boolean;
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  onDropComponent,
  onDragStart,
  onDragEnd,
  onDragOver,
  onRemoveComponent,
  isEditing,
}) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentId = e.dataTransfer.getData('component');
    const component = componentLibrary[componentId];
    if (component) {
      onDropComponent(component);
    }
  };

  return (
    <Box
      minH='600px'
      border='2px dashed'
      borderColor='blue.500'
      rounded='md'
      p={8}
      bg='white'
      shadow='md'
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {components.map((component, index) => (
        <Box
          key={index}
          position='relative'
          bg='white'
          border='1px'
          borderColor='gray.200'
          rounded='md'
          p={4}
          mb={4}
          shadow='sm'
          draggable={isEditing}
          onDragStart={(e) => onDragStart(e, index)}
          onDragEnd={onDragEnd}
          onDragOver={(e) => onDragOver(e, index)}
        >
          {isEditing && (
            <IconButton
              icon={<FaTrash />}
              aria-label='Delete component'
              size='sm'
              position='absolute'
              top={2}
              right={2}
              onClick={() => onRemoveComponent(index)}
            />
          )}
          {component.type === 'navbar' || component.type === 'footer' ? (
            component.elements?.map((item, idx) => (
              <Link key={idx} href={item.href} mr={4}>
                {item.context}
              </Link>
            ))
          ) : (
            <Text>{component.content}</Text>
          )}
        </Box>
      ))}
    </Box>
  );
};

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

  if (!isClient) {
    return null;
  }

  return (
    <Flex h='100vh' direction='column'>
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
          <Button colorScheme='blue'>發佈到前台</Button>
        </Flex>
      </Flex>
      <Flex flex='1'>
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={handleToggleSidebar}
          onDragStart={handleDragStart}
          isEditing={isEditing}
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
  );
};

export default AdminEditPageLayout;
