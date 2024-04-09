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
import useAppSelector from '@hooks/useAppSelector';
import { CustomPageTemplate } from '@models/entities/custom-page-template';
import {
  addBlock,
  removeBLockItem,
  setPageBlocks,
} from '@reducers/admin/custom-page';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ProductCustomBlocks = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { setValue } = useFormContext();

  const blocks = useAppSelector((state) => state.customPage.pageBlocks);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddBlock = (template: CustomPageTemplate) => {
    const newBlock = JSON.parse(JSON.stringify(template.block));

    const tagNamesRequiringId = new Set(['img', 'table']);

    newBlock.elements.forEach((element: any) => {
      if (tagNamesRequiringId.has(element.tagName) && !element.id) {
        element.id = generateUUID();
      }
    });

    dispatch(addBlock(newBlock));
  };

  const handleDeleteBlock = (index: number) => {
    dispatch(removeBLockItem(index));
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

    const updatedBlocks = blocks.filter(
      (_, index) => index !== parseInt(dragIndex),
    );
    updatedBlocks.splice(dropIndex, 0, itemToMove);

    dispatch(setPageBlocks(updatedBlocks));
    setValue('detailDescription', remainingItems);
  };

  return (
    <VStack
      spacing={4}
      className='custom-page__selected-items'
      w='100%'
      mt='2rem'
    >
      <Button
        leftIcon={<EditIcon />}
        colorScheme='blue'
        onClick={() => setIsEdit(!isEdit)}
        bg={isEdit ? 'red.300' : 'blue.300'}
      >
        {isEdit ? '退出編輯模式' : '進入編輯模式'}
      </Button>
      {blocks.map((block, index) => (
        <Box
          key={index}
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
