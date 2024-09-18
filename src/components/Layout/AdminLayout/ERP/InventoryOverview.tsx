import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useEditableControls,
  useToast,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  getInventoryAsync,
  updateInventoryAsync,
} from '@reducers/admin/admin-erp/inventory/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const InventoryOverview = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  const {
    list: inventoryList,
    status: {
      updateInventoryFailed,
      updateInventoryLoading,
      updateInventorySuccess,
    },
    error: { updateInventoryError },
  } = useAppSelector((state) => state.adminERPInventory);

  const {
    list: products,
    status: { getAllProductsLoading },
  } = useAppSelector((state) => state.adminProducts);

  const { list: purchaseOrderList } = useAppSelector(
    (state) => state.adminERPPurchaseOrder,
  );

  const recentInbound = [...(purchaseOrderList || [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 8);

  useEffect(() => {
    const page = parseInt(router.query.page as string) || 1;
    const limit = 10;
    dispatch(getInventoryAsync({ page, limit }));
  }, [dispatch, router.query.page]);

  useEffect(() => {
    if (updateInventorySuccess) {
      toast({
        title: '更新成功',
        description: '庫存信息已成功更新',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }

    if (updateInventoryFailed) {
      toast({
        title: '更新失敗',
        description: updateInventoryError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [
    updateInventorySuccess,
    updateInventoryFailed,
    updateInventoryError,
    toast,
  ]);

  const getProductStock = (productId: string) => {
    const product = products?.find((product) => product._id === productId);
    return product && product.stock !== undefined ? product.stock : '尚未設定';
  };

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          aria-label='Submit'
        />
        <IconButton
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
          aria-label='Cancel'
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton
          size='sm'
          icon={<EditIcon />}
          {...getEditButtonProps()}
          aria-label='Edit'
        />
      </Flex>
    );
  };

  if (getAllProductsLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100%'
      >
        <Spinner size='xl' />
      </Box>
    );
  }

  return (
    <Box bg='white' p='25px' borderRadius='10px' boxShadow='md'>
      <Heading
        fontSize='20px'
        mb='20px'
        color='blue.400'
        borderBottom='2px'
        borderColor='blue.400'
        pb='10px'
      >
        庫存概覽
      </Heading>
      <Table width='100%'>
        <Thead>
          <Tr>
            <Th bg='blue.400' color='white' fontWeight='600'>
              產品名稱
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              庫存數量
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              補貨點
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              補貨量
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventoryList &&
            inventoryList.map((item) => (
              <Tr
                key={item._id}
                bg='gray.50'
                _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
              >
                <Td>{item?.name}</Td>
                <Td>
                  <Editable
                    textAlign='center'
                    defaultValue={getProductStock(item._id)?.toString()}
                    fontSize='md'
                    isPreviewFocusable={false}
                    onSubmit={(nextValue) => {
                      const newValue = parseInt(nextValue, 10);
                      if (!isNaN(newValue)) {
                        dispatch(
                          updateInventoryAsync({
                            productId: item._id,
                            data: {
                              productId: item._id,
                              productName: item.name,
                              reason: item.reason,
                              stock: newValue,
                              reorderLevel: item.reorderLevel,
                              reorderAmount: item.reorderAmount,
                              movementId: item.movementId,
                            },
                          }),
                        );
                      }
                    }}
                  >
                    <EditablePreview />
                    <EditableInput />
                    <EditableControls />
                  </Editable>
                </Td>
                <Td>
                  <Editable
                    textAlign='center'
                    defaultValue={item.reorderLevel?.toString() || '尚未設定'}
                    fontSize='md'
                    isPreviewFocusable={false}
                    onSubmit={(nextValue) => {
                      const newValue = parseInt(nextValue, 10);
                      if (!isNaN(newValue)) {
                        dispatch(
                          updateInventoryAsync({
                            productId: item._id,
                            data: {
                              productId: item._id,
                              productName: item.name,
                              reason: item.reason,
                              stock: item.stock,
                              reorderLevel: newValue,
                              reorderAmount: item.reorderAmount,
                              movementId: item.movementId,
                            },
                          }),
                        );
                      }
                    }}
                  >
                    <EditablePreview />
                    <EditableInput />
                    <EditableControls />
                  </Editable>
                </Td>
                <Td>
                  <Editable
                    textAlign='center'
                    defaultValue={item.reorderAmount?.toString() || '尚未設定'}
                    fontSize='md'
                    isPreviewFocusable={false}
                    onSubmit={(nextValue) => {
                      const newValue = parseInt(nextValue, 10);
                      if (!isNaN(newValue)) {
                        dispatch(
                          updateInventoryAsync({
                            productId: item._id,
                            data: {
                              productId: item._id,
                              productName: item.name,
                              reason: item.reason,
                              stock: item.stock,
                              reorderLevel: item.reorderLevel,
                              reorderAmount: newValue,
                              movementId: item.movementId,
                            },
                          }),
                        );
                      }
                    }}
                  >
                    <EditablePreview />
                    <EditableInput />
                    <EditableControls />
                  </Editable>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Heading
        fontSize='20px'
        mt='40px'
        mb='20px'
        color='blue.400'
        borderBottom='2px'
        borderColor='blue.400'
        pb='10px'
      >
        最近進貨
      </Heading>
      <Table width='100%'>
        <Thead>
          <Tr>
            <Th bg='blue.400' color='white' fontWeight='600'>
              日期
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              產品
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              數量
            </Th>
            <Th bg='blue.400' color='white' fontWeight='600'>
              供應商
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {recentInbound &&
            recentInbound.map((item) =>
              item.products.map((productItem) => (
                <Tr
                  key={productItem._id}
                  bg='gray.50'
                  _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                >
                  <Td>{new Date(item?.orderDate).toLocaleDateString()}</Td>
                  <Td>{productItem?.product?.name}</Td>
                  <Td>{productItem?.quantity}</Td>
                  <Td>{item?.supplier?.name}</Td>
                </Tr>
              )),
            )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryOverview;
