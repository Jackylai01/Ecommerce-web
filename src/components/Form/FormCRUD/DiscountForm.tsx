import { Button, VStack } from '@chakra-ui/react';
import CustomSelect from '@components/Form/FormCRUD/Field/CustomSelect';
import TextInput from '@components/Form/FormCRUD/Field/TextInput';
import ToggleSwitch from '@components/Form/FormCRUD/Field/ToggleSwitch';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  generateDiscountCodeAsync,
  getDiscountByIdAsync,
} from '@reducers/admin/discount/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const DiscountForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id: discountId } = router.query as any;
  const { discountDetails } = useAppSelector((state) => state.adminDiscount);
  const { setValue, getValues, control } = useFormContext();

  useEffect(() => {
    if (discountId) {
      dispatch(getDiscountByIdAsync(discountId));
    }
  }, [dispatch, discountId]);

  useEffect(() => {
    if (discountDetails) {
      setValue('name', discountDetails.name);
      setValue('type', discountDetails.type);
      setValue('value', discountDetails.value);
      setValue('calculationMethod', discountDetails.calculationMethod);
      setValue(
        'startDate',
        discountDetails.startDate
          ? new Date(discountDetails.startDate).toISOString().slice(0, 10)
          : '',
      );
      setValue(
        'endDate',
        discountDetails.endDate
          ? new Date(discountDetails.endDate).toISOString().slice(0, 10)
          : '',
      );
      setValue('minimumAmount', discountDetails.minimumAmount);
      setValue('discountCode', discountDetails.discountCode);
      setValue('usageLimit', discountDetails.usageLimit);
      setValue('isActive', discountDetails.isActive);
    }
  }, [discountDetails, setValue]);

  const handleGenerateDiscountCode = async () => {
    if (discountId) {
      const usageLimit = getValues('usageLimit');
      await dispatch(generateDiscountCodeAsync({ discountId, usageLimit }));
    }
  };

  return (
    <VStack spacing={4}>
      <TextInput
        name='name'
        label='折扣名稱'
        placeholder='請輸入折扣名稱'
        isRequired
        defaultValue={discountDetails?.name || ''}
      />
      <CustomSelect
        name='type'
        label='折扣類型'
        options={[
          { value: 'orderDiscount', label: '訂單折扣' },
          { value: 'productDiscount', label: '產品折扣' },
          { value: 'orderFreeShipping', label: '訂單免運費' },
          { value: 'productFreeShipping', label: '產品免運費' },
          { value: 'productCodeDiscount', label: '產品代碼折扣' },
          { value: 'orderCodeDiscount', label: '訂單代碼折扣' },
        ]}
        isRequired
        defaultValue={discountDetails?.type || ''}
      />
      <TextInput
        name='value'
        label='折扣值'
        placeholder='請輸入折扣值'
        type='number'
        isRequired
        defaultValue={discountDetails?.value || ''}
      />
      <CustomSelect
        name='calculationMethod'
        label='計算方式'
        options={[
          { value: 'percentage', label: '百分比' },
          { value: 'fixedAmount', label: '固定金額' },
        ]}
        isRequired
        defaultValue={discountDetails?.calculationMethod || ''}
      />

      <Controller
        name='startDate'
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            type='date'
            label='开始日期'
            placeholder=''
            isRequired
          />
        )}
      />
      <Controller
        name='endDate'
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            type='date'
            placeholder=''
            label='结束日期'
            isRequired
          />
        )}
      />
      <TextInput
        name='minimumAmount'
        label='最低金額'
        placeholder='請填入最低金額'
        type='number'
        defaultValue={discountDetails?.minimumAmount || ''}
      />
      <TextInput
        name='discountCode'
        label='折扣碼'
        placeholder='請填入折扣碼'
        isReadOnly
        defaultValue={discountDetails?.discountCode || ''}
      />
      <Button onClick={handleGenerateDiscountCode}>生成折扣碼</Button>
      <TextInput
        name='usageLimit'
        label='使用上限次數'
        placeholder='請填入使用上限次數'
        type='number'
        defaultValue={discountDetails?.usageLimit || ''}
      />
      <Controller
        name='isActive'
        control={control}
        defaultValue={discountDetails?.isActive || false}
        render={({ field: { onChange, value } }) => (
          <ToggleSwitch
            name='isActive'
            label='折扣狀態'
            onValue={true}
            offValue={false}
            onLabel='啟用'
            offLabel='停用'
            value={value}
            onChange={onChange}
          />
        )}
      />
    </VStack>
  );
};

export default DiscountForm;
