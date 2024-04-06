import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons';
import { Box, Button, Icon, VStack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import ContentSelectionModal from '@components/CustomPage/ContentSelectionModal';
import NestedDisplayUI from '@components/CustomPage/NestedDisplayUI';
import { customPageTemplates } from '@fixtures/custom-page-templates';
import {
  CustomPageBlock,
  CustomPageTemplate,
} from '@models/entities/custom-page-template';

const ProductCustomBlocks = () => {
  const { setValue } = useFormContext();
  const [blocks, setBlocks] = useState<CustomPageBlock[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddBlock = (template: CustomPageTemplate) => {
    const newBlocks = [...blocks, template.block];
    setBlocks(newBlocks);
    setValue('detailDescription', newBlocks);
  };

  const handleDeleteBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(newBlocks);
    setValue('detailDescription', newBlocks);
  };

  const onDragStart = (e: any, index: number) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const onDrop = (e: any, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData('text');
    if (dragIndex === dropIndex.toString()) return;

    const itemToMove = blocks[dragIndex];
    const remainingItems = blocks.filter(
      (_, index) => index !== parseInt(dragIndex),
    );
    remainingItems.splice(dropIndex, 0, itemToMove);

    setBlocks(remainingItems);
    setValue('detailDescription', remainingItems);
  };

  return (
    <VStack spacing={4} className='custom-page__selected-items'>
      {blocks.map((block, index) => (
        <Box
          key={index}
          className='custom-block'
          position='relative'
          onDragOver={(e) => e.preventDefault()}
        >
          <NestedDisplayUI elements={block.elements} isEdit={true} />
          <Icon
            as={DeleteIcon}
            cursor='pointer'
            position='absolute'
            top='-10'
            right='0'
            color='red.500'
            w={6}
            h={6}
            onClick={() => handleDeleteBlock(index)}
          />
          <span
            draggable='true'
            onDragStart={(e) => onDragStart(e, index)}
            onDrop={(e) => onDrop(e, index)}
          >
            <Icon
              as={DragHandleIcon}
              cursor='grab'
              position='absolute'
              top='-20px'
              left='0'
              color='gray.500'
              w={6}
              h={6}
            />
          </span>
        </Box>
      ))}
      <Button onClick={onOpen} color='white' bg='black'>
        新增組件
      </Button>
      <ContentSelectionModal
        isOpen={isOpen}
        onClose={onClose}
        onSelect={handleAddBlock}
        templates={customPageTemplates}
      />
    </VStack>
  );
};

export default ProductCustomBlocks;
