import { Flex, VStack } from '@chakra-ui/react';
import generateUUID from '@helpers/generate-uuid';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { fileSelectReset, setSelectActive } from '@reducers/file-select';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ElementProps } from '..';

export const SelectableImage = ({ element, isEdit }: ElementProps) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [elementId, setElementId] = useState(element.id);

useEffect(() => {
  if (!elementId) {
    setElementId(generateUUID());
  }
}, [elementId]);

  const pageBlocks = useAppSelector((state) => state.customPage.pageBlocks);

  const currentElement =
    pageBlocks
      .flatMap((block) => block.elements)
      .find((el) => el.id === element.id) || element;

  const [size, setSize] = useState(element.size || 'medium');
  const [alignment, setAlignment] = useState(element.alignment || 'center');

  const name = useMemo(() => generateUUID(), []);
  const { fileUrl, fieldName } = useAppSelector((store) => store.fileSelect);

  useEffect(() => {
    if (currentElement) {
      setSize(currentElement.size || 'medium');
      setAlignment(currentElement.alignment || 'center');
    }
  }, [currentElement]);

  useEffect(() => {
    if (fileUrl && fieldName === name) {
      element.src = fileUrl;
      dispatch(fileSelectReset());
    }
  }, [dispatch, element, fieldName, fileUrl, name]);

  useEffect(() => {
    const updatedElement = pageBlocks
      .flatMap((block) => block.elements)
      .find((el) => el.id === element.id);

    if (updatedElement) {
      setSize(updatedElement.size || 'medium');
      setAlignment(updatedElement.alignment || 'center');
    }
  }, [element.id, pageBlocks]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      element.src = newImageUrl;
      dispatch(
        setSelectActive({
          active: true,
          fieldName: name,
          fileType: 'IMAGE',
        }),
      );
    }
  };

  const handleImageClick = () => {
    if (isEdit && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getImageStyle = () => {
    switch (size) {
      case 'large':
        return { width: '100%', height: 'auto' };
      case 'medium':
        return { width: '50%', height: 'auto' };
      case 'small':
        return { width: '25%', height: 'auto' };
      default:
        return { width: '50%', height: 'auto' };
    }
  };

  const getFlexAlignment = () => {
    switch (alignment) {
      case 'left':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'center';
    }
  };

  return (
    <VStack align='stretch' spacing={4}>
      <Flex justifyContent={getFlexAlignment()}>
        <img
          className={isEdit ? 'select-img' : ''}
          src={element.src}
          alt={element.alt || 'Selectable Image'}
          style={getImageStyle()}
          onClick={handleImageClick}
        />
      </Flex>
      {isEdit && (
        <Flex justifyContent='center' wrap='wrap'>
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </Flex>
      )}
    </VStack>
  );
};

export default SelectableImage;
