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
import { Component } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useEditModeNavigation from '@hooks/useEditModeNavigation';
import { updateBlock } from '@reducers/admin/admin-edit-pages';
import { clientLogoutAsync } from '@reducers/client/auth/actions';
import { Search, User } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsCart4 } from 'react-icons/bs';
import {
  FaBars,
  FaEdit,
  FaPalette,
  FaPlus,
  FaTrash,
  FaUser,
} from 'react-icons/fa';

interface NavbarEditorSecondProps {
  index: number;
  element: Component;
  isEdit: boolean;
  onBlur: () => void;
}

const NavbarEditorSecond: React.FC<NavbarEditorSecondProps> = ({
  index,
  element,
  isEdit,
  onBlur,
}) => {
  const { safeDispatch, safeNavigation } = useEditModeNavigation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();
  const [content, setContent] = useState(element.elements || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newItemText, setNewItemText] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
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

  useEffect(() => {
    setContent(element.elements || []);
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
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setLogo(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleLogout = () => {
    if (!router.pathname.includes('/design')) {
      dispatch(clientLogoutAsync());
      onClose();
    }
  };

  const handleNavigation = (href: string) => {
    if (!router.pathname.includes('/design')) {
      router.push(href);
      onClose();
    }
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

  return (
    <>
      <Box
        as='nav'
        className={`navbar_second ${element.className} ${
          isEdit ? 'navbar_second--edit' : ''
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <Box as='main' className='navbar_second__container'>
          <Box as='ul' className='navbar_second__menu'>
            {content.map((link, index) => (
              <Box as='li' className='navbar_second__item' key={index}>
                <Box
                  as='a'
                  href={link.href}
                  className='navbar_second__link'
                  onClick={(event: any) => safeNavigation(link.href)(event)}
                  style={{ color: navItemColor }}
                >
                  {link.context}
                </Box>
                {isEdit && (
                  <>
                    <Box
                      className='navbar_second__link-edit'
                      onClick={() =>
                        setEditingIndex(index === editingIndex ? null : index)
                      }
                    >
                      <FaEdit />
                    </Box>
                    {editingIndex === index && (
                      <Box className='navbar_second__edit-fields'>
                        <Box
                          className='navbar_second__input'
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleChange(
                              index,
                              'context',
                              e.currentTarget.textContent || '',
                            )
                          }
                        >
                          {link.context}
                        </Box>
                        <Box
                          className='navbar_second__input'
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleChange(
                              index,
                              'href',
                              e.currentTarget.textContent || '',
                            )
                          }
                        >
                          {link.href}
                        </Box>
                        <IconButton
                          icon={<FaTrash />}
                          onClick={() => removeLink(index)}
                          aria-label='刪除連結'
                          className='navbar__delete-button'
                        />
                      </Box>
                    )}
                  </>
                )}
              </Box>
            ))}
            {isEdit && (
              <Flex className='navbar_second__item navbar_second__item--add'>
                <IconButton
                  icon={<FaPlus />}
                  onClick={addLink}
                  aria-label='新增連結'
                />
              </Flex>
            )}
          </Box>
          <Box className='navbar_second__logo'>
            {logo ? <Image src={logo} alt='Logo' /> : 'MAISON'}
            {isEdit && (
              <Input
                type='file'
                accept='image/*'
                onChange={uploadImage}
                className='navbar__upload'
              />
            )}
          </Box>
          <Box className='navbar_second__actions'>
            <Box className='navbar_second__action-btn' position='relative'>
              <Search size={20} strokeWidth={1} onClick={onSearchOpen} />
              {isSearchOpen && (
                <Box className='navbar_second__search'>
                  <Input
                    placeholder='Search...'
                    autoFocus
                    onBlur={onSearchClose}
                  />
                </Box>
              )}
            </Box>
            <Menu>
              <MenuButton as={Box} className='navbar_second__action-btn'>
                <User size={20} strokeWidth={1} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleNavigation('/client')}>
                  會員管理
                </MenuItem>
                <MenuItem onClick={handleLogout}>登出</MenuItem>
              </MenuList>
            </Menu>
            <Box className='navbar_second__action-btn'>
              <Cart icon={BsCart4} />
            </Box>
          </Box>
          <Box className='navbar_second__hamburger'>
            <IconButton
              icon={<FaBars />}
              aria-label='開啟菜單'
              onClick={onOpen}
            />
          </Box>
        </Box>
        {isEdit && (
          <Box position='absolute' top='50px' right='0' zIndex='20'>
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
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            {content.map((link, index) => (
              <Box key={index} className='navbar_second__drawer-item'>
                <Box
                  as='a'
                  href={link.href}
                  className='navbar_second__link'
                  onClick={(event) => safeNavigation(link.href)(event)}
                  style={{ color: navItemColor }}
                >
                  {link.context}
                </Box>
              </Box>
            ))}
            <Box className='navbar_second__drawer-item'>
              <Cart icon={BsCart4} />
            </Box>
            {userInfo && (
              <Box className='navbar_second__drawer-item'>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FaUser />}
                    variant='ghost'
                  />
                  <MenuList>
                    <MenuItem onClick={() => handleNavigation('/client')}>
                      會員管理
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>登出</MenuItem>
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

export default NavbarEditorSecond;
