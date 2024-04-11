import {
  Alert,
  AlertIcon,
  Box,
  Image,
  Input,
  Progress,
  Text,
} from '@chakra-ui/react';
import generateUUID from '@helpers/generate-uuid';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminUploadAsync } from '@reducers/admin/upload/actions';
import { useEffect, useRef, useState } from 'react';
import { ElementProps } from '..';

const SelectableImage = ({ element, isEdit, onImageUpdate }: ElementProps) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageId, setImageId] = useState(() => element.id || generateUUID());
  const [src, setSrc] = useState<any>(element.src);

  const {
    uploadedImages,
    status: { uploadLoading },
    error: { uploadError },
  } = useAppSelector((state) => state.adminUpload);

  useEffect(() => {
    const uploadedImage = uploadedImages.find((img) => img.imageId === imageId);
    if (uploadedImage) {
      setSrc(uploadedImage.imageUrl);
    }
  }, [uploadedImages, imageId]);

  const handleImageChange = async (event: any) => {
    console.log('handleImageChange called');
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      try {
        const action = await dispatch(
          adminUploadAsync({ file, imageId }),
        ).unwrap();
        console.log('Upload successful:', action);
        setSrc(action.imageUrl);
        if (onImageUpdate) onImageUpdate(imageId, action.imageUrl);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <Box position='relative' textAlign='center'>
      {uploadLoading && <Progress size='xs' isIndeterminate />}
      {uploadError && (
        <Alert status='error'>
          <AlertIcon />
          {uploadError}
        </Alert>
      )}
      <Image src={src} alt='Selectable' maxWidth='100%' />
      {isEdit && (
        <>
          <Input
            type='file'
            onChange={handleImageChange}
            size='sm'
            accept='image/*'
            ref={fileInputRef}
          />
          <Text
            onClick={() => fileInputRef.current?.click()}
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            bgColor='rgba(255, 255, 255, 0.6)'
            p={2}
            borderRadius='md'
          >
            Click to change image
          </Text>
        </>
      )}
    </Box>
  );
};

export default SelectableImage;
