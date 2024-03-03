import { Flex, IconButton, VStack } from '@chakra-ui/react';
import generateUUID from '@helpers/generate-uuid';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { updateElementSizeAndPosition } from '@reducers/admin/custom-page';
import { fileSelectReset, setSelectActive } from '@reducers/file-select';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaArrowsAltH,
  FaCompressArrowsAlt,
  FaExpandArrowsAlt,
} from 'react-icons/fa';
import { ElementProps } from '..';

export const SelectableImage = ({ element, isEdit }: ElementProps) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!element.id) {
      element.id = generateUUID();
    }
  }, [element]);

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

  const handleSizeChange = useCallback(
    (newSize: string) => {
      setSize(newSize);
      dispatch(
        updateElementSizeAndPosition({
          elementId: element.id,
          newSize,
          alignment,
        }),
      );
    },
    [dispatch, element.id, alignment],
  );

  const handleAlignmentChange = useCallback(
    (newAlignment: string) => {
      setAlignment(newAlignment);
      dispatch(
        updateElementSizeAndPosition({
          elementId: element.id,
          size,
          newAlignment,
        }),
      );
    },
    [dispatch, element.id, size],
  );

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
          <IconButton
            aria-label='Large Size'
            icon={<FaExpandArrowsAlt />}
            onClick={() => isEdit && handleSizeChange('large')}
            m={1}
          />
          <IconButton
            aria-label='Medium Size'
            icon={<FaArrowsAltH />}
            onClick={() => isEdit && handleSizeChange('medium')}
            m={1}
          />
          <IconButton
            aria-label='Small Size'
            icon={<FaCompressArrowsAlt />}
            onClick={() => isEdit && handleSizeChange('small')}
            m={1}
          />
          <IconButton
            aria-label='Align Left'
            icon={<FaAlignLeft />}
            onClick={() => isEdit && handleAlignmentChange('left')}
            m={1}
          />
          <IconButton
            aria-label='Center Align'
            icon={<FaAlignCenter />}
            onClick={() => isEdit && handleAlignmentChange('center')}
            m={1}
          />
          <IconButton
            aria-label='Align Right'
            icon={<FaAlignRight />}
            onClick={() => isEdit && handleAlignmentChange('right')}
            m={1}
          />
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
