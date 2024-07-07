import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { refundsResponse } from '@models/responses/refunds';
import {
  approveReturnRequestAsync,
  getPendingRefundRequestsAsync,
  rejectReturnRequestAsync,
  searchPendingRefundAsync,
} from '@reducers/admin/admin-refunds/actions';

import { useEffect, useState } from 'react';

const RefundReview = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    reviewData,
    refunds,
    status: {
      approveReturnRequestLoading,
      approveReturnRequestSuccess,
      approveReturnRequestFailed,
      rejectReturnRequestSuccess,
      rejectReturnRequestFailed,
      rejectReturnRequestLoading,
    },
    error: { approveReturnRequestError, rejectReturnRequestError },
  } = useAppSelector((state) => state.adminRefunds);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleApprove = (id: string) => {
    dispatch(approveReturnRequestAsync(id));
  };

  const handleReject = (id: string) => {
    dispatch(rejectReturnRequestAsync(id));
  };

  const handleImageClick = (images: string[]) => {
    setSelectedImages(images);
    setCurrentImageIndex(0);
    onOpen();
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1,
    );
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(searchPendingRefundAsync(searchTerm));
    } else {
      dispatch(getPendingRefundRequestsAsync({ page: 1, limit: 10 }));
    }
  };

  useEffect(() => {
    dispatch(getPendingRefundRequestsAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (rejectReturnRequestSuccess) {
      toast({
        title: `拒絕退貨請求已批准`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (rejectReturnRequestFailed) {
      toast({
        title: '拒絕退貨請求失敗',
        description: rejectReturnRequestError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    rejectReturnRequestSuccess,
    rejectReturnRequestFailed,
    rejectReturnRequestError,
  ]);

  useEffect(() => {
    if (approveReturnRequestSuccess) {
      toast({
        title: `退貨請求已批准`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (approveReturnRequestFailed) {
      toast({
        title: '批准退貨請求失敗',
        description: approveReturnRequestError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    approveReturnRequestSuccess,
    approveReturnRequestFailed,
    approveReturnRequestError,
  ]);

  const reasonMapping: any = {
    'quality-issue': '商品質量問題',
    'wrong-item': '收到錯誤商品',
    damaged: '商品損壞',
    'not-as-described': '商品與描述不符',
    other: '其他原因',
  };

  const dataToDisplay: refundsResponse[] = Array.isArray(
    searchTerm.trim() ? refunds : reviewData,
  )
    ? searchTerm.trim()
      ? refunds
      : reviewData
    : [];

  return (
    <LoadingLayout
      isLoading={approveReturnRequestLoading || rejectReturnRequestLoading}
    >
      <Box w='100%'>
        <Flex
          justify='space-between'
          align='center'
          mb='2rem'
          p='1.5rem'
          bg='white'
          borderRadius='10px'
          boxShadow='sm'
        >
          <Heading fontSize='1.8rem' color='blue.600'>
            退貨審核管理
          </Heading>
          <Flex gap='1rem'>
            <Input
              placeholder='搜索訂單號或客戶名稱'
              width='100%'
              borderRadius='25px'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              colorScheme='blue'
              borderRadius='25px'
              onClick={handleSearch}
            >
              搜索
            </Button>
          </Flex>
        </Flex>
        <List spacing='2rem'>
          {dataToDisplay?.map((refund: any) => (
            <ListItem
              key={refund._id}
              p='1.5rem'
              bg='white'
              borderRadius='10px'
              boxShadow='sm'
              border='1px solid #e0e0e0'
            >
              <Flex
                justify='space-between'
                align='center'
                mb='1rem'
                pb='0.5rem'
                borderBottom='2px solid #f0f0f0'
              >
                <Text fontWeight='700' color='blue.600'>
                  {refund._id}
                </Text>
                <Text color='gray.500' fontWeight='500'>
                  {new Date(refund.createdAt).toLocaleDateString()}
                </Text>
              </Flex>
              <VStack align='start' spacing='0.5rem' mb='1rem'>
                <Text>
                  <strong>客戶：</strong>
                  {refund.userId.username}
                </Text>
                <Text>
                  <strong>訂單：</strong>
                  {refund.orderId.paymentResult.ecpayData.MerchantTradeNo}
                </Text>
                {refund.orderId.products.map((product: any) => (
                  <Text key={product._id}>
                    <strong>商品：</strong>
                    {product.name} x {product.quantity} - NT$
                    {product.priceAtPurchase}
                  </Text>
                ))}
                <Text>
                  <strong>金額：</strong>NT$ {refund.orderId.totalPrice}
                </Text>
              </VStack>
              <Box
                bg='gray.50'
                p='1rem'
                borderRadius='6px'
                mb='1rem'
                fontStyle='italic'
                borderLeft='3px solid blue.600'
              >
                {reasonMapping[refund.reason]}
              </Box>
              <Box
                bg='gray.50'
                p='1rem'
                borderRadius='6px'
                mb='1rem'
                fontStyle='italic'
                borderLeft='3px solid blue.600'
              >
                {refund.description || ''}
              </Box>
              <Box>
                <Button
                  colorScheme='blue'
                  onClick={() =>
                    handleImageClick(
                      refund.images.map((image: any) => image.imageUrl),
                    )
                  }
                >
                  查看證據
                </Button>
              </Box>
              <Flex justify='space-between' gap='1rem' mt='1rem'>
                <Button
                  colorScheme='green'
                  flex='1'
                  borderRadius='25px'
                  onClick={() => handleApprove(refund._id)}
                >
                  <i className='fas fa-check'></i> 批准
                </Button>
                <Button
                  colorScheme='red'
                  flex='1'
                  borderRadius='25px'
                  onClick={() => handleReject(refund._id)}
                >
                  <i className='fas fa-times'></i> 拒絕
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
        <Modal isOpen={isOpen} onClose={onClose} size='full'>
          <ModalOverlay />
          <ModalContent
            bg='rgba(0, 0, 0, 0.8)'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <ModalCloseButton color='white' />
            <ModalBody
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <Button
                onClick={handlePrevImage}
                colorScheme='teal'
                size='sm'
                variant='outline'
                position='absolute'
                left='10px'
              >
                上一張
              </Button>
              <Image
                src={selectedImages[currentImageIndex]}
                style={{ maxHeight: '80%', maxWidth: '80%' }}
              />
              <Button
                onClick={handleNextImage}
                colorScheme='teal'
                size='sm'
                variant='outline'
                position='absolute'
                right='10px'
              >
                下一張
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </LoadingLayout>
  );
};

export default RefundReview;
