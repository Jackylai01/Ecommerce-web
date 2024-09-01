import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Component, testImage } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';

import { updateBlock } from '@reducers/admin/design-pages';
import { uploadImageAsync } from '@reducers/admin/design-pages/actions';
import { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

interface DynamicCategoryShowcaseProps {
  index: number;
  element: Component;
  isEdit: boolean;
  onBlur: () => void;
}

const DynamicCategoryShowcase: React.FC<DynamicCategoryShowcaseProps> = ({
  index,
  element,
  isEdit,
  onBlur,
}) => {
  const [activeCategory, setActiveCategory] = useState(element.elements?.[0]);
  const [categories, setCategories] = useState(element.elements || []);
  const [backgroundColor, setBackgroundColor] = useState(
    element.style?.backgroundColor || '#ffffff',
  );
  const [buttonText, setButtonText] = useState('Explore Now');
  const [buttonLink, setButtonLink] = useState('#');
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bg = useColorModeValue('gray.100', 'gray.900');

  const boxWidth = useBreakpointValue({ base: '100%', md: '33%' });
  const imageBoxWidth = useBreakpointValue({ base: '100%', md: '67%' });
  const flexDirection =
    useBreakpointValue<'row' | 'column'>({ base: 'column', md: 'row' }) ||
    'row';

  useEffect(() => {
    if (element.elements) {
      setCategories(element.elements);
      setActiveCategory(element.elements[0]);
    }
  }, [element.elements]);

  const handleBackgroundChange = (color: string) => {
    setBackgroundColor(color);
    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          style: {
            ...element.style,
            backgroundColor: color,
          },
        },
      }),
    );
  };

  const uploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    categoryIndex: number,
    elementId: string,
  ) => {
    const elementUuid = categories[categoryIndex].elementUuid;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      dispatch(uploadImageAsync({ file, index, elementUuid, elementId }));
    }
  };

  const handleIconClick = (categoryIndex: number, elementId: any) => {
    const elementUuid = categories[categoryIndex].elementUuid;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.dataset.elementUuid = elementUuid;
      fileInputRef.current.dataset.elementId = elementId;
      fileInputRef.current.dataset.categoryIndex = `${categoryIndex}`;
      fileInputRef.current.click();
    }
  };

  const handleAddCategory = () => {
    const newCategory = {
      id: uuidv4(),
      elementUuid: uuidv4(),
      tagName: 'img',
      src: testImage,
      context: 'Online Store',
      className: 'category-image',
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    setActiveCategory(newCategory);

    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          elements: updatedCategories,
        },
      }),
    );
  };

  const handleCategoryTextChange = (id: any, text: string) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, context: text } : category,
    );
    setCategories(updatedCategories);
    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          elements: updatedCategories,
        },
      }),
    );
  };

  const handleCategoryLinkChange = (id: any, link: string) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, href: link } : category,
    );
    setCategories(updatedCategories);
    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          elements: updatedCategories,
        },
      }),
    );
  };

  const handleDeleteCategory = (id: any) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id,
    );
    setCategories(updatedCategories);

    if (activeCategory?.id === id) {
      setActiveCategory(updatedCategories[0] || null);
    }

    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          elements: updatedCategories,
        },
      }),
    );
  };

  return (
    <Flex
      height='auto'
      bg={bg}
      p={8}
      flexDirection={flexDirection}
      style={{ backgroundColor }}
    >
      <Box
        width={boxWidth}
        bg='white'
        rounded={{ base: 'none', md: '3xl' }}
        shadow='xl'
        overflow='hidden'
      >
        <Box p={6} bgGradient='linear(to-r, gray.800, gray.900)'>
          <Heading as='h2' size='xl' mb={4} color='white'>
            {activeCategory?.context || 'Default Category'}
          </Heading>
        </Box>
        <List py={4}>
          {categories.map((category, categoryIndex) => (
            <ListItem
              key={category.id}
              display='flex'
              alignItems='center'
              py={3}
              px={6}
              cursor='pointer'
              color={activeCategory?.id === category.id ? 'blue' : 'gray.800'}
              onMouseEnter={() => setActiveCategory(category)}
            >
              {isEdit ? (
                <Flex alignItems='center' width='100%'>
                  <Input
                    value={category.context}
                    onChange={(e) =>
                      handleCategoryTextChange(category.id, e.target.value)
                    }
                    placeholder='Category Name'
                    borderColor='black'
                  />
                  <Input
                    value={category.href || ''}
                    onChange={(e) =>
                      handleCategoryLinkChange(category.id, e.target.value)
                    }
                    placeholder='Category Link'
                    ml={2}
                    borderColor='black'
                  />
                  <IconButton
                    icon={<FaTrashAlt />}
                    colorScheme='red'
                    variant='outline'
                    aria-label='Delete'
                    onClick={() => handleDeleteCategory(category.id)}
                    ml={2}
                  />
                </Flex>
              ) : (
                <Text fontWeight='medium'>{category.context}</Text>
              )}
            </ListItem>
          ))}
        </List>
        {isEdit && (
          <Button colorScheme='blue' onClick={handleAddCategory}>
            Add Category
          </Button>
        )}
      </Box>
      <Box
        width={imageBoxWidth}
        bg='white'
        rounded={{ base: 'none', md: '3xl' }}
        shadow='xl'
        overflow='hidden'
        mt={{ base: 4, md: 0 }}
      >
        <Box position='relative' height={{ base: 'auto', md: '67%' }}>
          <Image
            src={activeCategory?.src || ''}
            alt={activeCategory?.context || 'Category Image'}
            objectFit='cover'
            width='100%'
            height='auto'
          />
          {isEdit && (
            <IconButton
              icon={<FaEdit />}
              position='absolute'
              bottom={4}
              right={4}
              colorScheme='teal'
              aria-label='Edit Image'
              zIndex={120}
              onClick={() =>
                handleIconClick(
                  categories.findIndex((c) => c.id === activeCategory?.id),
                  activeCategory?.id || '',
                )
              }
            />
          )}
          {isEdit && (
            <Input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) =>
                uploadImage(
                  e,
                  parseInt(
                    fileInputRef.current?.dataset.categoryIndex || '0',
                    10,
                  ),
                  fileInputRef.current?.dataset.elementId || '',
                )
              }
            />
          )}
          <Box
            position='absolute'
            top={0}
            left={0}
            right={0}
            bottom={0}
            opacity={0.6}
          />
        </Box>
      </Box>
      {isEdit && (
        <Box position='absolute' top={4} right={4}>
          <Button onClick={onOpen} size='sm'>
            Edit Background
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Background Color</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SketchPicker
                  color={backgroundColor}
                  onChangeComplete={(color) =>
                    handleBackgroundChange(color.hex)
                  }
                />
                <Button mt={4} onClick={onClose}>
                  Save
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Flex>
  );
};

export default DynamicCategoryShowcase;
