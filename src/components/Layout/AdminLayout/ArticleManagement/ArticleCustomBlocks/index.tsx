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
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import ContentSelectionModal from '@components/CustomPage/ContentSelectionModal';
import NestedDisplayUI from '@components/CustomPage/NestedDisplayUI';
import { customPageTemplates } from '@fixtures/custom-page-templates';
import generateUUID from '@helpers/generate-uuid';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { CustomPageTemplate } from '@models/entities/custom-page-template';
import { setPageBlocks } from '@reducers/admin/custom-page';
import { adminDeleteFilesAsync } from '@reducers/admin/upload/actions';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ArticleCustomBlockType {
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
}: ArticleCustomBlockType) => {
  const dispatch = useAppDispatch();
  const { setValue, getValues } = useFormContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const { uploadedImages } = useAppSelector((state) => state.adminUpload);

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

    setBlocks(updatedBlocks); // 使用 setBlocks 更新狀態
    dispatch(setPageBlocks(updatedBlocks));
    setValue(name, remainingItems);
  };
  const handleAddBlock = (template: CustomPageTemplate) => {
    const newBlock = JSON.parse(JSON.stringify(template.block));
    newBlock.elements.forEach((element: any) => {
      if (!element.id) {
        element.id = generateUUID();
      }
    });

    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    setValue(name, updatedBlocks, { shouldValidate: true });
    dispatch(setPageBlocks(updatedBlocks));
  };

  const handleDeleteBlock = async (index: number) => {
    const blockToDelete = blocks[index];

    for (const element of blockToDelete.elements) {
      if (element.tagName === 'img' && element.imageId) {
        const imageIndex = uploadedImages.findIndex(
          (img) => img.imageId === element.imageId,
        );
        if (imageIndex !== -1) {
          try {
            await dispatch(adminDeleteFilesAsync(element.imageId));
          } catch (error) {
            console.error('Failed to delete image:', error);
          }
        }
      }
    }

    const updatedBlocks = blocks.filter((_: any, idx: number) => idx !== index);
    setBlocks(updatedBlocks);
    setValue(name, updatedBlocks, { shouldValidate: true });
  };

  const handleImageUploadSuccess = (imageId: string, imageUrl: string) => {
    const newBlocks = blocks.map((block: any) => {
      return {
        ...block,
        elements: block.elements.map((element: any) => {
          if (element.tagName === 'img') {
            return { ...element, src: imageUrl, imageId: imageId };
          }
          return element;
        }),
      };
    });
    setBlocks(newBlocks);
    setValue(name, newBlocks, { shouldValidate: true });
    dispatch(setPageBlocks(newBlocks));
  };

  const handleBlur = () => {
    const updatedBlocks = getValues(name);
    setBlocks(updatedBlocks);
    setValue(name, updatedBlocks, { shouldValidate: true });
    dispatch(setPageBlocks(updatedBlocks));
  };

  const toggleEditMode = () => {
    if (isEdit) {
      handleBlur();
    }
    setIsEdit(!isEdit);
  };

  return (
    <VStack spacing={4} align='flex-start' w='100%' mt='2rem'>
      <HStack justify='space-between' w='100%' mb='4'>
        <Box fontSize='xl'>{label}</Box>
        <Button
          leftIcon={<EditIcon />}
          colorScheme='blue'
          onClick={toggleEditMode}
          bg={isEdit ? 'red.300' : 'blue.300'}
        >
          {isEdit ? '退出編輯模式' : '進入編輯模式'}
        </Button>
      </HStack>
      {blocks?.map((block: any, index: number) => (
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
            onBlur={handleBlur}
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

export default ArticleCustomBlocks;
