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
import useAppDispatch from '@hooks/useAppDispatch';
import { CustomPageTemplate } from '@models/entities/custom-page-template';
import { setPageBlocks } from '@reducers/admin/custom-page';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ProductCustomBlockType {
  name: string;
  label: string;
}

const ProductCustomBlocks = ({ name, label }: ProductCustomBlockType) => {
  const dispatch = useAppDispatch();
  const { setValue, getValues } = useFormContext();
  const blocks = getValues(name) || [];
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
    setValue(name, updatedBlocks, { shouldValidate: true });
  };

  const handleDeleteBlock = (index: number) => {
    const updatedBlocks = blocks.filter((_: any, idx: number) => idx !== index);
    setValue(name, updatedBlocks, { shouldValidate: true });
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

    const updatedBlocks = blocks.filter(
      (_: any, index: number) => index !== parseInt(dragIndex),
    );
    updatedBlocks.splice(dropIndex, 0, itemToMove);

    dispatch(setPageBlocks(updatedBlocks));
    setValue('detailDescription', remainingItems);
  };

  const handleImageUploadSuccess = (imageId: string, imageUrl: any) => {
    const newBlocks = blocks.map((block: any) => {
      return {
        ...block,
        elements: block.elements.map((el: any) =>
          el.id === imageId ? { ...el, src: imageUrl } : el,
        ),
      };
    });
    setValue(name, newBlocks, { shouldValidate: true });
  };

  return (
    <VStack spacing={4} align='flex-start' w='100%' mt='2rem'>
      <Box fontSize='xl' mb='4'>
        {label}
      </Box>
      <Button
        leftIcon={<EditIcon />}
        colorScheme='blue'
        onClick={() => setIsEdit(!isEdit)}
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
          <NestedDisplayUI
            elements={block.elements}
            isEdit={isEdit}
            onImageUpdate={handleImageUploadSuccess}
          />
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
        aria-label='新增组件'
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

export default ProductCustomBlocks;
