import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  IconButton,
  Image,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
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
  previewUrls?: any;
  previewUrl?: any;
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

  deleteLoading,
}) => {
  const [filePreviews, setFilePreviews] = useState<any[]>([]);
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
    console.log(imageId);
    if (imageId && onRemoveImage) {
      onRemoveImage(imageId);
    }
    if (isFilePreview) {
      setFilePreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const propPreviews = useMemo(() => {
    let previews = [];

    if (previewUrl && previewUrl.url) {
      previews.push({
        url: previewUrl.url,
        file: null,
        imageId: previewUrl.imageId,
      });
    }

    if (previewUrls && previewUrls.length > 0) {
      previews = [
        ...previews,
        ...previewUrls.map((pv: any) => ({
          url: pv.url,
          file: null,
          imageId: pv.imageId,
        })),
      ];
    }

    return previews;
  }, [previewUrl, previewUrls]);

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
        {[...filePreviews, ...propPreviews].map((preview, index) => (
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
