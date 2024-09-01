import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { Faq } from '@models/responses/faq.res';
import { addFaqAsync, updateFaqAsync } from '@reducers/admin/admin-faq/actions';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type FaqModalProps = {
  isOpen: boolean;
  onClose: () => void;
  faq: Faq | null;
  isEditing: boolean;
};

export default function FaqModal({
  isOpen,
  onClose,
  faq,
  isEditing,
}: FaqModalProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const methods = useForm({
    defaultValues: {
      question: faq?.question || '',
      answer: faq?.answer || '',
      category: faq?.category || '',
    },
  });

  const { list: categories } = useAppSelector(
    (state) => state.adminFaqCategory,
  );

  useEffect(() => {
    if (faq) {
      methods.reset({
        question: faq.question || '',
        answer: faq.answer || '',
        category: faq.category || '',
      });
    }
  }, [faq, methods]);

  const onSubmit = async (data: any) => {
    const faqData = {
      question: data.question,
      answer: data.answer,
      category: data.category,
    };

    if (isEditing && faq?._id) {
      dispatch(updateFaqAsync({ id: faq._id, body: faqData }));
    } else {
      dispatch(addFaqAsync(faqData));
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW='90%'>
          <ModalHeader>
            {isEditing ? '編輯常見問答' : '新增常見問答'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='question'>問題</FormLabel>
                <Input
                  id='question'
                  {...methods.register('question', {
                    required: '此欄位為必填',
                  })}
                  placeholder='輸入問題'
                />
              </FormControl>
              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='answer'>回答</FormLabel>
                <Textarea
                  id='answer'
                  {...methods.register('answer', { required: '此欄位為必填' })}
                  placeholder='輸入回答'
                />
              </FormControl>

              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='category'>類別</FormLabel>
                <Select id='category' {...methods.register('category')}>
                  {categories?.map((cat: any) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <ModalFooter>
                <Button type='submit' colorScheme='purple' mr='3'>
                  保存
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
}
