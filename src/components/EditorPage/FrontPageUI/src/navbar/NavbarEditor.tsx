import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { Cart } from '@components/Cart/Cart';
import { Search } from '@components/Search/Search';
import { Component } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { updateBlock } from '@reducers/admin/admin-edit-pages';
import { clientLogoutAsync } from '@reducers/client/auth/actions';
import React, { useEffect, useRef, useState } from 'react';
import { BsCart4 } from 'react-icons/bs';
import {
  FaBars,
  FaEdit,
  FaPalette,
  FaPlus,
  FaTrash,
  FaUser,
} from 'react-icons/fa';

interface NavbarEditorProps {
  index: number;
  element: Component;
  isEdit: boolean;
  onBlur: () => void;
  onImageUpload: (index: number, file: File) => void;
}

const NavbarEditor: React.FC<NavbarEditorProps> = ({
  index,
  element,
  isEdit,
  onBlur,
  onImageUpload,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState(element.elements || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newItemText, setNewItemText] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>(
    element.style?.backgroundColor || '#ffffff',
  );
  const [navItemColor, setNavItemColor] = useState<string>(
    element.style?.navItemColor || '#000000',
  );
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const {
    userInfo,
    status: { logoutLoading, logoutSuccess, logoutFailed },
  } = useAppSelector((state) => state.clientAuth);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch(); // 使用 useAppDispatch 直接获得 dispatch

  useEffect(() => {
    setContent(element.elements || []);
    const logoElement = element.elements?.find((el) => el.tagName === 'img');
    if (logoElement) {
      setLogo(logoElement.src || null);
    }
  }, [element]);

  const handleChange = (linkIndex: number, key: string, value: string) => {
    const updatedContent = content.map((item, idx) => {
      if (idx === linkIndex) {
        return { ...item, [key]: value, style: { color: navItemColor } };
      }
      return item;
    });
    setContent(updatedContent);
    dispatch(
      updateBlock({ index, block: { ...element, elements: updatedContent } }),
    );
  };

  const addLink = () => {
    const newLink = {
      tagName: 'a',
      context: '新連結',
      href: '#',
      style: { color: navItemColor },
    };
    const updatedContent = [...content, newLink];
    setContent(updatedContent);
    dispatch(
      updateBlock({ index, block: { ...element, elements: updatedContent } }),
    );
    setNewItemText('');
  };

  const removeLink = (linkIndex: number) => {
    const updatedContent = content.filter((_, idx) => idx !== linkIndex);
    setContent(updatedContent);
    dispatch(
      updateBlock({ index, block: { ...element, elements: updatedContent } }),
    );
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setUploadedLogo(event.target.result as string); // 预览上传的图片
          onImageUpload(index, file); // 上传图片文件
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClassNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateBlock({ index, block: { ...element, className: e.target.value } }),
    );
  };

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setBgColor(color);
    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          className: `navbar`,
          style: { ...element.style, backgroundColor: color },
        },
      }),
    );
  };

  const handleNavItemColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setNavItemColor(color);
    const updatedContent = content.map((item) => ({
      ...item,
      style: { ...item.style, color },
    }));
    setContent(updatedContent);
    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          elements: updatedContent,
          style: { ...element.style, navItemColor: color },
        },
      }),
    );
  };

  const toggleColorPicker = () => {
    setColorPickerVisible(!colorPickerVisible);
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Flex
        className={`navbar ${element.className} ${
          isEdit ? 'navbar--edit' : ''
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <Box className='navbar__logo'>
          {uploadedLogo ? (
            <Image src={uploadedLogo} alt='Logo' w='auto' maxH='60px' />
          ) : logo ? (
            <Image src={logo} alt='Logo' w='auto' maxH='60px' />
          ) : (
            <Box>Logo</Box>
          )}
          {isEdit && (
            <>
              <IconButton
                icon={<FaPlus />}
                aria-label='Upload Image'
                onClick={handleIconClick}
                size='sm'
                ml='1rem'
              />
              <Input
                type='file'
                accept='image/*'
                onChange={uploadImage}
                className='navbar__upload'
                ref={fileInputRef}
                display='none'
              />
            </>
          )}
        </Box>
        <Flex className='navbar__search'>
          <Search />
        </Flex>
        <Flex className='navbar__items'>
          {content.map((link, linkIndex) =>
            link.tagName !== 'img' ? (
              <Flex key={linkIndex} className='navbar__item navbar__link-item'>
                <a
                  href={link.href}
                  className='navbar__link'
                  onClick={(event) => event.preventDefault()}
                  style={{ color: navItemColor }}
                >
                  {link.context}
                </a>
                {isEdit && (
                  <>
                    <span
                      className='navbar__link-edit'
                      onClick={() =>
                        setEditingIndex(
                          linkIndex === editingIndex ? null : linkIndex,
                        )
                      }
                    >
                      <FaEdit />
                    </span>
                    {editingIndex === linkIndex && (
                      <Box className='navbar__edit-fields'>
                        <Box
                          className='navbar__input'
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleChange(
                              linkIndex,
                              'context',
                              e.currentTarget.textContent || '',
                            )
                          }
                        >
                          {link.context}
                        </Box>
                        <Box
                          className='navbar__input'
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleChange(
                              linkIndex,
                              'href',
                              e.currentTarget.textContent || '',
                            )
                          }
                        >
                          {link.href}
                        </Box>
                        <IconButton
                          icon={<FaTrash />}
                          onClick={() => removeLink(linkIndex)}
                          aria-label='刪除連結'
                          className='navbar__delete-button'
                        />
                      </Box>
                    )}
                  </>
                )}
              </Flex>
            ) : null,
          )}
          {isEdit && (
            <Flex className='navbar__item navbar__item--add'>
              <IconButton
                icon={<FaPlus />}
                onClick={addLink}
                aria-label='新增連結'
              />
            </Flex>
          )}
          {!isEdit && (
            <>
              <Box className='navbar__item navbar__link-item'>
                <Cart icon={BsCart4} />
              </Box>
              {userInfo && (
                <Box className='navbar__item navbar__link-item'>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FaUser />}
                      variant='ghost'
                    />
                    <MenuList>
                      <MenuItem>會員管理</MenuItem>
                      <MenuItem onClick={() => dispatch(clientLogoutAsync())}>
                        登出
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              )}
            </>
          )}
          <Flex className='navbar__item navbar__hamburger'>
            <IconButton
              icon={<FaBars />}
              aria-label='開啟菜單'
              onClick={onOpen}
            />
          </Flex>
        </Flex>
      </Flex>
      {isEdit && (
        <Box position='absolute' top='50px' right='0' zIndex='20'>
          <Input
            type='text'
            id='className'
            value={element.className || ''}
            onChange={handleClassNameChange}
            display='none'
          />
          <Tooltip label='編輯背景顏色與文字顏色' aria-label='編輯背景顏色'>
            <IconButton
              icon={<FaPalette />}
              aria-label='選擇背景顏色'
              onClick={toggleColorPicker}
              size='xs'
            />
          </Tooltip>
          {colorPickerVisible && (
            <>
              <Input
                type='color'
                id='navbarColor'
                value={bgColor}
                onChange={handleBgColorChange}
                display='block'
                size='xs'
                mt={2}
              />
              <Input
                type='color'
                id='navItemColor'
                value={navItemColor}
                onChange={handleNavItemColorChange}
                display='block'
                size='xs'
                mt={2}
              />
            </>
          )}
        </Box>
      )}
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            {content.map((link, linkIndex) => (
              <Box key={linkIndex} className='navbar__drawer-item'>
                <a
                  href={link.href}
                  className='navbar__link'
                  onClick={(event) => event.preventDefault()}
                  style={{ color: navItemColor }}
                >
                  {link.context}
                </a>
              </Box>
            ))}
            <Box className='navbar__drawer-item'>
              <Cart icon={BsCart4} />
            </Box>
            {userInfo && (
              <Box className='navbar__drawer-item'>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FaUser />}
                    variant='ghost'
                  />
                  <MenuList>
                    <MenuItem>會員管理</MenuItem>
                    <MenuItem onClick={() => dispatch(clientLogoutAsync())}>
                      登出
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarEditor;
