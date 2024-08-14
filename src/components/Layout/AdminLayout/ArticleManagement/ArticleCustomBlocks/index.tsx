import {
  AddIcon,
  DeleteIcon,
  DragHandleIcon,
  EditIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Icon,
  IconButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import ContentSelectionModal from '@components/CustomPage/ContentSelectionModal';
import NestedDisplayUI from '@components/CustomPage/NestedDisplayUI';
import { customPageTemplates } from '@fixtures/custom-page-templates';
import generateUUID from '@helpers/generate-uuid';
import { CustomPageTemplate } from '@models/entities/custom-page-template';
import { useState } from 'react';

interface ArticleCustomBlockProps {
  name: string;
  label: string;
  blocks: any[];
  setBlocks: (blocks: any[]) => void;
}

const ArticleCustomBlocks = ({
  name,
  label,
  blocks,
  setBlocks,
}: ArticleCustomBlockProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);

  const handleAddBlock = (template: CustomPageTemplate) => {
    const newBlock = JSON.parse(JSON.stringify(template.block));
    newBlock.elements.forEach((element: any) => {
      if (!element.id) {
        element.id = generateUUID();
      }
    });

    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
  };

  const handleDeleteBlock = (index: number) => {
    const updatedBlocks = blocks.filter((_: any, idx: number) => idx !== index);
    setBlocks(updatedBlocks);
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
      (_: any, index: number) => index !== parseInt(dragIndex),
    );
    remainingItems.splice(dropIndex, 0, itemToMove);

    setBlocks(remainingItems);
  };

  const toggleEditMode = () => {
    if (isEdit) {
      const updatedBlocks = blocks.map((block) => {
        return block;
      });

      setBlocks(updatedBlocks);
    }

    // 切换编辑模式
    setIsEdit(!isEdit);
  };

  return (
    <VStack spacing={4} align='flex-start' w='100%' mt='2rem'>
      <Box fontSize='xl' mb='4'>
        {label}
      </Box>
      <Button
        leftIcon={<EditIcon />}
        colorScheme='blue'
        onClick={toggleEditMode}
        bg={isEdit ? 'red.300' : 'blue.300'}
      >
        {isEdit ? '退出編輯模式' : '進入編輯模式'}
      </Button>
      {blocks.map((block: any, index: number) => (
        <Box
          key={block.id || index}
          className='custom-block'
          position='relative'
          onDragOver={(e) => e.preventDefault()}
        >
          <NestedDisplayUI elements={block.elements} isEdit={isEdit} />
          {isEdit && (
            <>
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
            </>
          )}
        </Box>
      ))}
      <IconButton
        aria-label='新增区块'
        icon={<AddIcon />}
        colorScheme='teal'
        size='lg'
        onClick={onOpen}
        isDisabled={!isEdit}
      />
      <ContentSelectionModal
        isOpen={isOpen}
        onClose={onClose}
        onSelect={handleAddBlock}
        templates={customPageTemplates}
      />
    </VStack>
  );
};

export default ArticleCustomBlocks;
