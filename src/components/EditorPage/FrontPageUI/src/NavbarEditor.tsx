import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { Component } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import { updateBlock } from '@reducers/admin/admin-edit-pages';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

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
  const [content, setContent] = useState(element.elements || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newItemText, setNewItemText] = useState('');
  const [logo, setLogo] = useState<string | null>(null);

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

  return (
    <Box className='navbar-editor' width='100%'>
      <Flex className={`navbar ${isEdit ? 'navbar--edit' : ''}`} width='100%'>
        <Box className='navbar__logo'>
          {logo ? <Image src={logo} alt='Logo' /> : <Text>Logo</Text>}
          {isEdit && (
            <input
              type='file'
              accept='image/*'
              onChange={uploadImage}
              className='navbar__upload'
            />
          )}
        </Box>
        <Flex className='navbar__items'>
          {content.map((link, linkIndex) => (
            <Flex key={linkIndex} className='navbar__item'>
              <a href={link.href} className='navbar__link'>
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
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavbarEditor;
