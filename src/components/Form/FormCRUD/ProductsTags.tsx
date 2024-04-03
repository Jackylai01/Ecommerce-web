import { VStack } from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getProductTagsByIdAsync } from '@reducers/admin/product-tags/actions';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextInput } from './Field/TextInput';

interface ProductTagsContentType {
  tagsId?: string;
}

export const ProductTagsForm = ({ tagsId }: ProductTagsContentType) => {
  const dispatch = useAppDispatch();

  const { setValue } = useFormContext();
  const { tagsDetails } = useAppSelector((state) => state.adminProductsTags);

  useEffect(() => {
    if (tagsId) {
      dispatch(getProductTagsByIdAsync(tagsId));
    }
  }, [tagsId, dispatch]);

  useEffect(() => {
    if (tagsDetails) {
      setValue('name', tagsDetails.name);
      setValue('description', tagsDetails.description);
    }
  }, [tagsDetails, setValue]);

  return (
    <VStack spacing={4} align='flex-start'>
      <TextInput
        name='name'
        label='標籤名稱'
        placeholder='請輸入標籤名稱'
        isRequired
      />
      <TextInput
        name='description'
        label='標籤描述'
        placeholder='請輸入標籤描述'
      />
    </VStack>
  );
};
