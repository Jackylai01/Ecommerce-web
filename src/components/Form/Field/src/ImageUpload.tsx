import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Box,
  FormLabel,
  Image,
  Input,
  Progress,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import { dotKeysValue } from '@helpers/object';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  adminDeleteFilesAsync,
  adminUploadAsync,
} from '@reducers/admin/upload/actions';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { InnerProps } from '..';

const ImageUploadForm: React.FC<InnerProps> = ({
  formState: { errors },
  fieldConfig: {
    name,
    label,
    required,
    disabled,
    defaultValue,
    accept,
    pattern,
    validate,
    folderName,
  },
}) => {
  const { register, watch, setValue, getValues } = useFormContext();
  const imageValues = getValues(name) || [];
  const dispatch = useAppDispatch();
  const {
    uploadedImages,
    status: {
      deleteSuccess,
      deleteFailed,
      deleteLoading,
      uploadLoading,
      uploadSuccess,
    },
  } = useAppSelector((state) => state.adminUpload);
  const [localImages, setLocalImages] = useState<string[]>([]);
  const isEditMode = Array.isArray(defaultValue) && defaultValue.length > 0;
  const [deletedImageId, setDeletedImageId] = useState<string | null>(null);
  const [showProgressBar, setShowProgressBar] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setLocalImages(defaultValue);
    }
  }, [defaultValue, isEditMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setShowProgressBar(true);
      if (files.length > 12) {
        alert('您最多只能選擇12張相片。');
        return;
      }
      if (!isEditMode) {
        const newImagePreviews = files.map((file) => URL.createObjectURL(file));
        setLocalImages((prev) => [...prev, ...newImagePreviews]);
      }
      const effectiveFolderName = folderName || '預設資料夾名稱';

      // 遍歷每個文件並調用 adminUploadAsync
      files.forEach((file) => {
        dispatch(
          adminUploadAsync({ file, folderName: effectiveFolderName }),
        ).finally(() => setShowProgressBar(false));
      });
    }
  };
  const handleDeleteImage = async (imageId: string) => {
    setDeletedImageId(imageId);
    await dispatch(adminDeleteFilesAsync(imageId));
  };

  useEffect(() => {
    if (deleteSuccess) {
      setLocalImages((currentImages) =>
        currentImages.filter((image: any) => image.imageId !== deletedImageId),
      );
    }
  }, [deleteSuccess, deletedImageId]);

  return (
    <Box>
      <FormLabel ml='1.5rem' color='white'>
        {label}
      </FormLabel>
      <Input
        {...register(name, {
          required: required && `${label}為必填欄位`,
          pattern,
          validate,
        })}
        type='file'
        name={name}
        style={{ display: 'none' }}
        multiple
        accept={accept || 'image/*'}
        disabled={disabled}
        id={`${name}File`}
        onChange={handleFileChange}
      />
      <label htmlFor={`${name}File`}>
        <Box
          as='span'
          display='inline-flex'
          alignItems='center'
          justifyContent='center'
          boxSize='80px'
          border='2px solid'
          borderRadius='md'
          cursor='pointer'
          p={2}
          ml='1.5rem'
          color='white'
        >
          <Box as={AddIcon} boxSize='24px' color='white' />
        </Box>
      </label>
      <Box mt={4} ml='1.5rem'>
        <Wrap spacing={4} mt={2}>
          {(isEditMode ? localImages : [...localImages, ...imageValues]).map(
            (image, idx) => {
              const isBlob = image instanceof Blob;
              const imageId = image.imageId;
              const src = isBlob
                ? URL.createObjectURL(image)
                : image.imageUrl || image;

              return (
                <WrapItem key={idx}>
                  <Box position='relative'>
                    <AspectRatio ratio={1} width='120px'>
                      <Image
                        src={src}
                        alt={`Uploaded preview ${idx}`}
                        objectFit='cover'
                      />
                    </AspectRatio>
                    {showProgressBar && <Progress size='xs' isIndeterminate />}
                    {imageId && (
                      <Box
                        as='button'
                        position='absolute'
                        top='0'
                        right='0'
                        onClick={() => handleDeleteImage(imageId)}
                      >
                        <DeleteIcon color='red.500' />
                      </Box>
                    )}
                  </Box>
                </WrapItem>
              );
            },
          )}
        </Wrap>
      </Box>

      {dotKeysValue(errors, name) && (
        <span className='form__error-message'>
          {dotKeysValue(errors, name)?.message}
        </span>
      )}
    </Box>
  );
};

export default ImageUploadForm;
