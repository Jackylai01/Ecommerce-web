import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  IconButton,
  Image,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface PreviewImage {
  file?: File | null;
  url: string;
  imageId?: string;
}

interface ImageUploadProps {
  name: string;
  label: string;
  multiple?: boolean;
  isRequired?: boolean;
  previewUrls?: string[];
  previewUrl?: string;
  productId?: string | any;
  onRemoveImage?: (imageId: string) => void;
  deleteLoading?: boolean;
  deleteSuccess?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  label,
  multiple = false,
  isRequired = false,
  previewUrls = [],
  previewUrl,
  productId,
  onRemoveImage,
  deleteSuccess,
  deleteLoading,
}) => {
  const [filePreviews, setFilePreviews] = useState<any[]>([]);
  const [propPreviews, setPropPreviews] = useState<PreviewImage[]>([]);
  const { setValue } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      setFilePreviews(filesArray);

      setValue(
        name,
        multiple ? filesArray.map((f) => f.file) : filesArray[0].file,
      );
    }
  };

  const handleRemoveImage = (
    index: number,
    isFilePreview: boolean,
    imageId?: string,
  ) => {
    if (isFilePreview) {
      setFilePreviews((prev) => prev.filter((_, i) => i !== index));
    } else if (imageId && onRemoveImage) {
      onRemoveImage(imageId);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const newPropPreviews = previewUrl
      ? [{ url: previewUrl, file: null }]
      : previewUrls.map((url) => ({ url, file: null }));

    if (JSON.stringify(newPropPreviews) !== JSON.stringify(propPreviews)) {
      setPropPreviews(newPropPreviews);
    }
  }, [previewUrl, previewUrls]);

  const singlePreview = previewUrl
    ? [{ url: previewUrl, file: null, imageId: undefined }]
    : [];

  const previews = [...filePreviews, ...singlePreview, ...previewUrls];

  return (
    <Box>
      <Text mb={2}>
        {label} {isRequired && <span style={{ color: 'red' }}>*</span>}
      </Text>
      <IconButton
        icon={<AddIcon />}
        onClick={handleButtonClick}
        aria-label={`Upload ${label}`}
      />
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Stack direction='row' flexWrap='wrap' marginTop='4'>
        {previews.map((preview, index) => (
          <Box
            key={index}
            position='relative'
            width='100px'
            height='100px'
            marginRight='4'
            marginBottom='4'
          >
            <Image
              src={preview.url}
              alt={`preview ${index}`}
              boxSize='100%'
              objectFit='cover'
            />
            <IconButton
              aria-label='Delete image'
              icon={<CloseIcon />}
              size='sm'
              position='absolute'
              top='-2'
              right='-2'
              onClick={() =>
                handleRemoveImage(
                  index,
                  index < filePreviews.length,
                  preview.imageId,
                )
              }
            />
            {deleteLoading && <Progress size='xs' isIndeterminate />}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ImageUpload;
