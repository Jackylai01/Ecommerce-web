import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { Cart } from '@components/Cart/Cart';
import { Search } from '@components/Search/Search';
import { Component } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { updateBlock } from '@reducers/admin/admin-edit-pages';
import { clientLogoutAsync } from '@reducers/client/auth/actions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaBars, FaEdit, FaPlus, FaTrash, FaUser } from 'react-icons/fa';

interface NavbarEditorProps {
  index: number;
  element: Component;
  isEdit: boolean;
  onBlur: () => void;
}

const NavbarEditor: React.FC<NavbarEditorProps> = ({
  index,
  element,
  isEdit,
  onBlur,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState(element.elements || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newItemText, setNewItemText] = useState('');
  const [logo, setLogo] = useState<string | null>(null);

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
        return { ...item, [key]: value };
      }
      return item;
    });
    setContent(updatedContent);
    dispatch(
      updateBlock({ index, block: { ...element, elements: updatedContent } }),
    );
  };

  const addLink = () => {
    const newLink = { tagName: 'a', context: '新連結', href: '#' };
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

  const handleLinkClick = (href: string, event: React.MouseEvent) => {
    if (router.pathname.includes('/design')) {
      event.preventDefault();
    } else {
      router.push(href);
    }
  };

  const handleClassNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateBlock({ index, block: { ...element, className: e.target.value } }),
    );
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    dispatch(
      updateBlock({
        index,
        block: { ...element, className: `navbar ${color}` },
      }),
    );
  };

  return (
    <Box className={`navbar-editor ${element.className}`}>
      <Flex className={`navbar ${isEdit ? 'navbar--edit' : ''}`}>
        <Box className='navbar__logo'>
          {logo ? <Image src={logo} alt='Logo' /> : <Box>Logo</Box>}
          {isEdit && (
            <input
              type='file'
              accept='image/*'
              onChange={uploadImage}
              className='navbar__upload'
            />
          )}
        </Box>
        <Flex className='navbar__search'>
          <Search />
        </Flex>
        <Flex className='navbar__items'>
          {content.map((link, linkIndex) => (
            <Flex key={linkIndex} className='navbar__item navbar__link-item'>
              <a
                href={link.href}
                className='navbar__link'
                onClick={(event) => handleLinkClick(link.href, event)}
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
          ))}
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
                <Cart />
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
                      <MenuItem onClick={() => handleNavigation('/client')}>
                        會員管理
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>登出</MenuItem>
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
        <Box mt={4}>
          <label htmlFor='className'>Class Name: </label>
          <input
            type='text'
            id='className'
            value={element.className || ''}
            onChange={handleClassNameChange}
          />
          <label htmlFor='navbarColor'>Navbar Color: </label>
          <input type='color' id='navbarColor' onChange={handleColorChange} />
        </Box>
      )}
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>導航欄</DrawerHeader>
          <DrawerBody>
            {content.map((link, linkIndex) => (
              <Box key={linkIndex} className='navbar__drawer-item'>
                <a
                  href={link.href}
                  className='navbar__link'
                  onClick={(event) => handleLinkClick(link.href, event)}
                >
                  {link.context}
                </a>
              </Box>
            ))}
            <Box className='navbar__drawer-item'>
              <Cart />
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
    </Box>
  );
};

export default NavbarEditor;
