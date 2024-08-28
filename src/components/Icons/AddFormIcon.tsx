import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import FormModal from '@components/Modal/FormModal';
import useAppDispatch from '@hooks/useAppDispatch';
import { resetCustomPage } from '@reducers/admin/custom-page';
import { resetCategoryState } from '@reducers/admin/product-category';
import {
  resetTagsDetailState,
  resetTagsState,
} from '@reducers/admin/product-tags';
import { resetProductDetails, resetProductId } from '@reducers/admin/products';
import { bulkUploadProductsAsync } from '@reducers/admin/products/actions';
import { useRouter } from 'next/router';
import { FC, ReactNode, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { AiOutlineUpload } from 'react-icons/ai';

interface AddButtonProps<T extends FieldValues> {
  formTitle: string;
  formContent: ReactNode;
  onSubmit: SubmitHandler<T>;
}

const AddButton: FC<AddButtonProps<any>> = ({
  formTitle,
  formContent,
  onSubmit,
}) => {
  const router = useRouter();
  const isProductPage = router.pathname === '/product';
  const [file, setFile] = useState<File | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isUploadModalOpen,
    onOpen: onUploadModalOpen,
    onClose: onUploadModalClose,
  } = useDisclosure();
  const dispatch = useAppDispatch();

  const handleAddButtonClick = () => {
    dispatch(resetProductDetails());
    dispatch(resetTagsDetailState());
    dispatch(resetCategoryState());
    dispatch(resetCustomPage());
    dispatch(resetProductId());
    dispatch(resetTagsState());
    onOpen();
  };

  const handleFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      dispatch(bulkUploadProductsAsync(formData));
    }
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDownloadSample = () => {
    const link = document.createElement('a');
    link.href = '/samples/sample-upload.xlsx';
    link.download = 'sample-upload.xlsx';
    link.click();
  };

  const topPosition = useBreakpointValue({
    base: '30px',
    md: '8%',
    sm: '15%',
  });
  const marginRight = useBreakpointValue({ base: '8px', md: '20px' });
  const uploadFileMarginRight = useBreakpointValue({
    base: '60px',
    md: '80px',
  });
  const uploadFileTopPosition = useBreakpointValue({
    base: '30px',
    md: '8%',
    sm: '15%',
  });

  return (
    <>
      <IconButton
        icon={<AddIcon />}
        isRound
        colorScheme='teal'
        aria-label='Add product button'
        onClick={handleAddButtonClick}
        position='absolute'
        right={marginRight}
        top={topPosition}
        zIndex={1}
      />

      {isProductPage && (
        <>
          <IconButton
            icon={<AiOutlineUpload />}
            aria-label='Upload products'
            colorScheme='blue'
            ml={4}
            onClick={onUploadModalOpen}
            position='absolute'
            right={uploadFileMarginRight}
            top={uploadFileTopPosition}
            zIndex={1}
          />

          <Modal
            isOpen={isUploadModalOpen}
            onClose={onUploadModalClose}
            size='xl'
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>批量上傳產品</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <input type='file' onChange={handleFileChange} />

                <Button
                  mt={4}
                  colorScheme='teal'
                  onClick={handleDownloadSample}
                >
                  下載範例檔案
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' onClick={handleFileUpload}>
                  上傳
                </Button>
                <Button variant='ghost' onClick={onUploadModalClose}>
                  取消
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        title={formTitle}
      >
        {formContent}
      </FormModal>
    </>
  );
};

export default AddButton;
