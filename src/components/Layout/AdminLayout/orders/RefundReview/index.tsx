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
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import Pagination from '@components/Pagination';
import {
  getReviewsStatusColors,
  reasonMapping,
  reviewStatusMapping,
} from '@fixtures/shipment';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { setReviewData } from '@reducers/admin/admin-refunds';
import {
  approveReturnRequestAsync,
  archiveReturnRequestAsync,
  getPendingRefundRequestsAsync,
  rejectReturnRequestAsync,
} from '@reducers/admin/admin-refunds/actions';
import { useEffect, useState } from 'react';

const RefundReview = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    reviewData,
    metadata,
    archiveReturn,
    status: {
      approveReturnRequestLoading,
      approveReturnRequestSuccess,
      approveReturnRequestFailed,
      rejectReturnRequestSuccess,
      rejectReturnRequestFailed,
      rejectReturnRequestLoading,
      archiveReturnFailed,
      archiveReturnLoading,
      archiveReturnSuccess,
    },
    error: {
      approveReturnRequestError,
      rejectReturnRequestError,
      archiveReturnError,
    },
  } = useAppSelector((state) => state.adminRefunds);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectRefundId, setRejectRefundId] = useState<string | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [filters, setFilters] = useState({});

  const handleApprove = (id: string) => {
    dispatch(approveReturnRequestAsync(id));
  };

  const handleReject = () => {
    if (rejectRefundId) {
      dispatch(
        rejectReturnRequestAsync({
          refundId: rejectRefundId,
          emailSubject,
          emailBody,
        }),
      );
      setIsRejectModalOpen(false);
      setEmailSubject('');
      setEmailBody('');
    }
  };

  const handleArchive = (id: string) => {
    dispatch(archiveReturnRequestAsync(id));
  };

  const openRejectModal = (refund: any) => {
    if (refund.status === 'Rejected') {
      toast({
        title: '該訂單已被拒絕',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setRejectRefundId(refund._id);
    setIsRejectModalOpen(true);
  };

  const handleSearch = () => {
    dispatch(
      getPendingRefundRequestsAsync({
        page: 1,
        limit: 10,
        keyword: searchTerm,
        ...filters,
      }),
    );
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
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
    dispatch,
    toast,
    approveReturnRequestSuccess,
    approveReturnRequestFailed,
    approveReturnRequestError,
  ]);

  useEffect(() => {
    if (archiveReturnSuccess) {
      toast({
        title: `退貨請求已封存`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(
        setReviewData(
          reviewData?.filter((item) => item._id !== archiveReturn._id),
        ),
      );
    } else if (archiveReturnFailed) {
      toast({
        title: '封存退貨請求失敗',
        description: archiveReturnError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast, archiveReturnFailed, archiveReturnLoading, archiveReturnSuccess]);

  return (
    <LoadingLayout
      isLoading={
        approveReturnRequestLoading ||
        rejectReturnRequestLoading ||
        archiveReturnLoading
      }
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
            <Select
              name='sortBy'
              placeholder='排序依據'
              onChange={handleFilterChange}
            >
              <option value='createdAt'>創建日期</option>
              <option value='modifiedAt'>編輯日期</option>
            </Select>
            <Select
              name='isArchived'
              placeholder='是否封存'
              onChange={handleFilterChange}
            >
              <option value='false'>未封存</option>
              <option value='true'>已封存</option>
            </Select>
            <Button
              colorScheme='blue'
              borderRadius='25px'
              onClick={handleSearch}
            >
              搜索
            </Button>
          </Flex>
        </Flex>
        {reviewData && reviewData.length > 0 ? (
          <List spacing='2rem'>
            {reviewData?.map((refund: any) => (
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
                    {refund?.orderId?.paymentResult?.ecpayData?.MerchantTradeNo}
                  </Text>
                  {refund?.orderId?.products &&
                    refund.orderId.products.map((product: any) => (
                      <Text key={product._id}>
                        <strong>商品：</strong>
                        {product.name} x {product.quantity} - NT$
                        {product.priceAtPurchase}
                      </Text>
                    ))}
                  <Text>
                    <strong>金額：</strong>NT$ {refund.orderId.totalPrice}
                  </Text>
                  <Box display='flex'>
                    <strong>審核狀態：</strong>
                    <Text color={getReviewsStatusColors(refund.status)}>
                      {reviewStatusMapping[refund.status]}
                    </Text>
                  </Box>
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
                    onClick={() => openRejectModal(refund)}
                    isDisabled={refund.status === 'Rejected'}
                  >
                    <i className='fas fa-times'></i> 拒絕
                  </Button>
                  <Button
                    colorScheme='gray'
                    flex='1'
                    borderRadius='25px'
                    onClick={() => handleArchive(refund._id)}
                  >
                    <i className='fas fa-archive'></i> 封存
                  </Button>
                </Flex>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box textAlign='center' mt='4rem' fontSize='1.5rem' color='gray.500'>
            無此商品
          </Box>
        )}
        {metadata && <Pagination metadata={metadata} />}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent
          bg='rgba(0, 0, 0, 0.8)'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <ModalCloseButton color='white' />
          <ModalBody display='flex' justifyContent='center' alignItems='center'>
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
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>拒絕退貨請求</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing='1rem'>
              <Input
                placeholder='Email 主題'
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              <Textarea
                placeholder='Email 內容'
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <Flex justify='flex-end' p='1rem'>
            <Button colorScheme='red' onClick={handleReject}>
              拒絕
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </LoadingLayout>
  );
};

export default RefundReview;
