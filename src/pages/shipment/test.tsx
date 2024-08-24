import { Box, Button, Input } from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { publicShipmentLogisticsAsync } from '@reducers/public/shipment/actions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ShipmentTestPage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      goodsAmount: 500,
      isCollection: 'Y',
      goodsName: '商品名',
      senderName: '王小明',
      senderZipCode: '123',
      senderAddress: '新北市三重區五華街180巷36號1樓',
      remark: '無',
      serverReplyURL: 'http://localhost:3001',
      clientReplyURL: 'http://localhost:3000/shipment/callback',
      temperature: '0001',
      specification: '0001',
      scheduledPickupTime: '4',
      receiverAddress: '新北市三重區五華街180巷36號3樓',
      receiverCellPhone: '0927713220',
      receiverPhone: '0927713220',
      receiverName: '陳小明',
      enableSelectDeliveryTime: 'Y',
      eshopMemberID: 'xxxxyyyy123',
    },
  });

  const dispatch = useAppDispatch();
  const {
    ecPayLogisticsRes,
    status: { ecPayLogisticsSuccess, ecPayLogisticsLoading },
  } = useAppSelector((state) => state.publicShipment);

  const onSubmit = (data: any) => {
    dispatch(publicShipmentLogisticsAsync(data));
  };

  useEffect(() => {
    if (ecPayLogisticsSuccess && ecPayLogisticsRes) {
      const htmlContent = ecPayLogisticsRes;
      if (htmlContent) {
        const container = document.createElement('div');
        container.innerHTML = htmlContent;
        document.body.appendChild(container);
        const form = container.querySelector('form');

        if (form) {
          form.submit();
        }
      }
    }
  }, [ecPayLogisticsSuccess, ecPayLogisticsRes]);

  return (
    <LoadingLayout isLoading={ecPayLogisticsLoading}>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('goodsAmount')} />
          <Input {...register('isCollection')} />
          <Input {...register('goodsName')} />
          <Input {...register('senderName')} />
          <Input {...register('senderZipCode')} />
          <Input {...register('senderAddress')} />
          <Input {...register('remark')} />
          <Input {...register('serverReplyURL')} />
          <Input {...register('clientReplyURL')} />
          <Input {...register('temperature')} />
          <Input {...register('specification')} />
          <Input {...register('scheduledPickupTime')} />
          <Input {...register('receiverAddress')} />
          <Input {...register('receiverCellPhone')} />
          <Input {...register('receiverPhone')} />
          <Input {...register('receiverName')} />
          <Input {...register('enableSelectDeliveryTime')} />
          <Input {...register('eshopMemberID')} />
          <Button type='submit'>送出表單</Button>
        </form>
      </Box>
    </LoadingLayout>
  );
};

export default ShipmentTestPage;
