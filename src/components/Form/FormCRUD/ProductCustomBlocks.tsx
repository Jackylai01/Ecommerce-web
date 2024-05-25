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
import { setPageBlocks } from '@reducers/admin/custom-page';
import { updateProductDetailDescription } from '@reducers/admin/products';
import { adminDeleteFilesAsync } from '@reducers/admin/upload/actions';
import { useEffect, useState } from 'react';
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
  const { uploadedImages } = useAppSelector((state) => state.adminUpload);
  const { productDetails } = useAppSelector((state) => state.adminProducts);

  const handleAddBlock = (template: CustomPageTemplate) => {
    const newBlock = JSON.parse(JSON.stringify(template.block));
    newBlock.elements.forEach((element: any) => {
      if (!element.id) {
        element.id = generateUUID();
      }
    });

    const updatedBlocks = [...blocks, newBlock];
    setValue(name, updatedBlocks, { shouldValidate: true });
    dispatch(setPageBlocks(updatedBlocks));
  };

  const handleDeleteBlock = async (index: number) => {
    const blockToDelete = blocks[index];

    for (const element of blockToDelete.elements) {
      if (element.tagName === 'img' && element.imageId) {
        const isEditMode = !!productDetails?._id;

        if (isEditMode) {
          const newDetailDescription = productDetails.detailDescription
            .map((detail: any) => ({
              ...detail,
              elements: detail.elements.filter(
                (img: any) => img.imageId !== element.imageId,
              ),
            }))
            .filter((detail: any) => detail.elements.length > 0);

          dispatch(updateProductDetailDescription(newDetailDescription));

          const imageExists = newDetailDescription.some((detail: any) =>
            detail.elements.some((img: any) => img.imageId === element.imageId),
          );

          if (!imageExists) {
            try {
              await dispatch(adminDeleteFilesAsync(element.imageId));
              console.log('Image deleted successfully');
            } catch (error) {
              console.error('Failed to delete image:', error);
            }
          }
        } else {
          // 如果不在编辑模式，从uploadedImages中查找并删除图片
          const imageIndex = uploadedImages.findIndex(
            (img) => img.imageId === element.imageId,
          );
          if (imageIndex !== -1) {
            try {
              await dispatch(adminDeleteFilesAsync(element.imageId));
              console.log('Image deleted successfully');
            } catch (error) {
              console.error('Failed to delete image:', error);
            }
          }
        }
      }
    }

    // 移除选定的区块来更新区块数组
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
    setValue(name, remainingItems);
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
    setValue(name, newBlocks, { shouldValidate: true });
    dispatch(setPageBlocks(newBlocks)); // 确保状态被正确保存到 Redux 中
  };

  const handleBlur = () => {
    const updatedBlocks = getValues(name);
    dispatch(setPageBlocks(updatedBlocks));
  };

  useEffect(() => {
    if (productDetails) {
      setValue('detailDescription', productDetails.detailDescription);
    }
  }, [productDetails, setValue]);

  useEffect(() => {
    // 每当uploadedImages更新时，同步更新blocks中的imageId
    const imageBlocks = uploadedImages.map((image) => ({
      className: 'image-selectable',
      elements: [
        {
          tagName: 'img',
          src: image.imageUrl,
          imageId: image.imageId,
        },
      ],
    }));
    setValue('detailDescription', imageBlocks);
  }, [uploadedImages, setValue]);

  const toggleEditMode = () => {
    if (isEdit) {
      const updatedBlocks = getValues(name);
      dispatch(setPageBlocks(updatedBlocks));
    }
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
          <NestedDisplayUI
            elements={block.elements}
            isEdit={isEdit}
            onImageUpdate={handleImageUploadSuccess}
            onBlur={handleBlur} // 添加 onBlur 事件
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
