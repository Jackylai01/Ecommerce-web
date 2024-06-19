import { Box, Button, Input } from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  publicShipmentCreateByTempTradeAsync,
  publicShipmentUpdateTempTradeAsync,
} from '@reducers/public/shipment/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ShipmentCallbackPage = () => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      tempLogisticsID: '',
      goodsAmount: 0,
      goodsName: '',
      senderName: '',
      senderZipCode: '',
      senderAddress: '',
      remark: '',
      returnStoreID: '',
      serverReplyURL: '',
      specification: '',
      receiverAddress: '',
      receiverZipCode: '',
      receiverCellPhone: '',
      receiverPhone: '',
      receiverName: '',
    },
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    updateTempTradeRes,
    status: { updateTempTradeSuccess, updateTempTradeLoading },
  } = useAppSelector((state) => state.publicShipment);

  const onSubmit = (data: any) => {
    dispatch(publicShipmentUpdateTempTradeAsync(data));
  };

  const createOrder = () => {
    const { tempLogisticsID } = router.query;
    if (typeof tempLogisticsID === 'string') {
      dispatch(
        publicShipmentCreateByTempTradeAsync({
          tempLogisticsID,
          merchantTradeNo: `merchantTradeNo_${Date.now()}`,
        }),
      );
    }
  };

  useEffect(() => {
    const {
      TempLogisticsID,
      GoodsAmount,
      GoodsName,
      SenderName,
      SenderZipCode,
      SenderAddress,
      Remark,
      ReturnStoreID,
      ServerReplyURL,
      Specification,
      ReceiverAddress,
      ReceiverZipCode,
      ReceiverCellPhone,
      ReceiverPhone,
      ReceiverName,
    } = router.query;

    if (typeof TempLogisticsID === 'string')
      setValue('tempLogisticsID', TempLogisticsID);
    if (typeof GoodsAmount === 'string')
      setValue('goodsAmount', parseInt(GoodsAmount, 10));
    if (typeof GoodsName === 'string') setValue('goodsName', GoodsName);
    if (typeof SenderName === 'string') setValue('senderName', SenderName);
    if (typeof SenderZipCode === 'string')
      setValue('senderZipCode', SenderZipCode);
    if (typeof SenderAddress === 'string')
      setValue('senderAddress', SenderAddress);
    if (typeof Remark === 'string') setValue('remark', Remark);
    if (typeof ReturnStoreID === 'string')
      setValue('returnStoreID', ReturnStoreID);
    if (typeof ServerReplyURL === 'string')
      setValue('serverReplyURL', ServerReplyURL);
    if (typeof Specification === 'string')
      setValue('specification', Specification);
    if (typeof ReceiverAddress === 'string')
      setValue('receiverAddress', ReceiverAddress);
    if (typeof ReceiverZipCode === 'string')
      setValue('receiverZipCode', ReceiverZipCode);
    if (typeof ReceiverCellPhone === 'string')
      setValue('receiverCellPhone', ReceiverCellPhone);
    if (typeof ReceiverPhone === 'string')
      setValue('receiverPhone', ReceiverPhone);
    if (typeof ReceiverName === 'string')
      setValue('receiverName', ReceiverName);
  }, [router.query, setValue]);

  useEffect(() => {
    if (updateTempTradeSuccess && updateTempTradeRes) {
      createOrder();
    }
  }, [updateTempTradeSuccess, updateTempTradeRes]);

  return (
    <LoadingLayout isLoading={updateTempTradeLoading}>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('tempLogisticsID')} hidden />
          <Input {...register('goodsAmount', { valueAsNumber: true })} />
          <Input {...register('goodsName')} />
          <Input {...register('senderName')} />
          <Input {...register('senderZipCode')} />
          <Input {...register('senderAddress')} />
          <Input {...register('remark')} />
          <Input {...register('returnStoreID')} />
          <Input {...register('serverReplyURL')} />
          <Input {...register('specification')} />
          <Input {...register('receiverAddress')} />
          <Input {...register('receiverZipCode')} />
          <Input {...register('receiverCellPhone')} />
          <Input {...register('receiverPhone')} />
          <Input {...register('receiverName')} />
          <Button type='submit'>更新物流訂單</Button>
        </form>
      </Box>
    </LoadingLayout>
  );
};

export default ShipmentCallbackPage;
