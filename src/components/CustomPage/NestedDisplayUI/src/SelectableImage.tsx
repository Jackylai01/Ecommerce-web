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
  const fileInputRef = useRef<any>(null);
  const [imageId, setImageId] = useState<string>(() => generateUUID());
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
    const file = event.target.files[0];
    if (file) {
      const action = await dispatch(
        adminUploadAsync({ file, imageId }),
      ).unwrap();
      setSrc(action.imageUrl);
      onImageUpdate(imageId, action.imageUrl);
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
            display='none'
            ref={fileInputRef}
          />
          <Text
            onClick={() => fileInputRef.current.click()}
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
