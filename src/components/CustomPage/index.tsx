import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  List,
  ListItem,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { customPageTemplates } from '@fixtures/custom-page-templates';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  CustomPageBlock,
  CustomPageTemplate,
} from '@models/entities/custom-page-template';
import {
  formLayoutDataReset,
  setPageBlocks,
} from '@reducers/admin/custom-page';
import React, { useEffect, useState } from 'react';
import ContentSelectionModal from './ContentSelectionModal';
import NestedDisplayUI from './NestedDisplayUI';

type Props = {
  copySelectedItems: CustomPageBlock[];
  clickSaveButton: () => void;
};

const CustomPage = ({ copySelectedItems }: Props) => {
  const dispatch = useAppDispatch();
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { active } = useAppSelector((state) => state.customPage);
  const [isLargerThanTablet] = useMediaQuery('(min-width: 1400px)');

  const handleTemplateSelection = (template: CustomPageTemplate) => {
    dispatch(setPageBlocks([...copySelectedItems, template.block]));
    onClose();
  };

  useEffect(() => {
    return () => {
      dispatch(formLayoutDataReset());
    };
  }, [dispatch]);

  // 删除元素
  const handleDelete = (index: any) => {
    const updatedItems = [...copySelectedItems];
    updatedItems.splice(index, 1);
    dispatch(setPageBlocks(updatedItems));
  };

  const handleDragStart = (index: any) => (event: any) => {
    event.dataTransfer.setData('drag-index', index);
    setIsDragging(true);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const fromIndex = event.dataTransfer.getData('drag-index');
    const toIndex = event.currentTarget.dataset.index;

    let updatedItems = [...copySelectedItems];
    const itemToMove = updatedItems.splice(fromIndex, 1)[0];
    updatedItems.splice(toIndex, 0, itemToMove);

    dispatch(setPageBlocks(updatedItems));
    setIsDragging(false);
    setDragOverIndex(null);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    if (isDragging) {
      const currentIndex = parseInt(event.currentTarget.dataset.index, 10);
      if (dragOverIndex !== currentIndex) {
        setDragOverIndex(currentIndex);
      }
    }
  };

  const handleDragLeave = () => {
    if (isDragging) {
      setDragOverIndex(null);
    }
  };

  const handleAddIconClick = () => {
    if (active) {
      onOpen();
    }
  };

  return (
    <Flex
      minWidth={isLargerThanTablet ? '65vw' : '100vw'}
      direction='column'
      alignItems='center'
      className='custom-page__selected-items'
      bg='white'
      p='0rem 1.5rem'
    >
      <List spacing={3} w='full' className='custom-block'>
        {copySelectedItems.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <ListItem
                draggable={active}
                onDragStart={handleDragStart(index)}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                data-index={index}
              >
                <Box as='article' className={item.className} color='black'>
                  <NestedDisplayUI elements={item.elements} isEdit={active} />
                  {active && (
                    <Icon
                      as={DeleteIcon}
                      onClick={() => handleDelete(index)}
                      cursor='pointer'
                      w={4}
                      h={4}
                      color='red.500'
                    />
                  )}
                </Box>
              </ListItem>
            </React.Fragment>
          );
        })}
        <ListItem display='flex' justifyContent='center' alignItems='center'>
          <Icon
            as={AddIcon}
            w={6}
            h={6}
            onClick={handleAddIconClick}
            cursor='pointer'
            color='black'
          />
        </ListItem>
      </List>

      <ContentSelectionModal
        isOpen={isOpen}
        onClose={onClose}
        onSelect={handleTemplateSelection}
        templates={customPageTemplates}
      />
    </Flex>
  );
};

export default CustomPage;
