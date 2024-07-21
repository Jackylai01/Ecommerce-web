import {
  Box,
  Checkbox,
  Divider,
  Heading,
  Stack,
  useToast,
} from '@chakra-ui/react';
import useAppSelector from '@hooks/useAppSelector';
import { IDiscount } from '@models/responses/discounts';

interface DiscountsSectionProps {
  selectedDiscounts: string[];
  handleDiscountSelection: (
    e: React.ChangeEvent<HTMLInputElement>,
    discount: IDiscount,
  ) => void;
  handleExclusiveDiscountSelection: (
    e: React.ChangeEvent<HTMLInputElement>,
    discount: IDiscount,
  ) => void;
  uniqueId: any;
  checkoutProducts: string[];
  subTotal: number;
}

const DiscountsSection: React.FC<DiscountsSectionProps> = ({
  selectedDiscounts,
  handleDiscountSelection,
  handleExclusiveDiscountSelection,
  uniqueId,
  checkoutProducts,
  subTotal,
}) => {
  const toast = useToast();
  const { list: publicDiscountList } = useAppSelector(
    (state) => state.publicDiscounts,
  );

  if (uniqueId) {
    return null;
  }

  const filteredDiscountList = publicDiscountList?.filter(
    (discount: IDiscount) => {
      if (
        discount.type === 'productCodeDiscount' ||
        discount.type === 'orderCodeDiscount'
      ) {
        return false;
      }
      if (
        discount.minimumAmount !== undefined &&
        subTotal < discount.minimumAmount
      ) {
        return false;
      }
      if (discount.productId && discount.productId.length > 0) {
        return discount.productId.some((id) =>
          checkoutProducts.includes(id.toString()),
        );
      }
      return true;
    },
  );

  const handleSelection = (
    e: React.ChangeEvent<HTMLInputElement>,
    discount: IDiscount,
    isCombinable: boolean,
  ) => {
    const { checked } = e.target;
    const currentSelectedDiscounts = checked
      ? [...selectedDiscounts, discount._id.toString()]
      : selectedDiscounts.filter((id) => id !== discount._id.toString());

    if (currentSelectedDiscounts.length > 2) {
      toast({
        title: '選擇的折扣超過上限',
        description: '您最多只能選擇兩個折扣',
        status: 'warning',
        isClosable: true,
      });
      return;
    }

    if (checked) {
      handleDiscountSelection(e, discount);
    } else {
      handleExclusiveDiscountSelection(e, discount);
    }
  };

  return (
    <Box>
      <Heading size='md' my='1rem'>
        Available Discounts
      </Heading>
      <Stack spacing={3}>
        <Heading size='sm' mb='2'>
          Combinable Discounts
        </Heading>
        {filteredDiscountList
          ?.filter((d: IDiscount) => d.combinableWithOtherDiscounts)
          .map((discount: IDiscount) => (
            <Checkbox
              key={discount._id}
              borderColor='black'
              isChecked={selectedDiscounts.includes(discount._id.toString())}
              isDisabled={selectedDiscounts.some(
                (id) =>
                  !filteredDiscountList.find(
                    (d: IDiscount) => d._id.toString() === id,
                  )?.combinableWithOtherDiscounts,
              )}
              onChange={(e) => handleSelection(e, discount, true)}
            >
              {`${discount.name} ${
                discount.type === 'orderFreeShipping' ||
                discount.type === 'productFreeShipping'
                  ? '免運費'
                  : discount.calculationMethod === 'percentage'
                  ? `${discount.value}%`
                  : `${discount.value} NTD`
              }`}
            </Checkbox>
          ))}
        <Divider my='2' />
        <Heading size='sm' mb='2'>
          Exclusive Discounts
        </Heading>
        {filteredDiscountList
          ?.filter((d: IDiscount) => !d.combinableWithOtherDiscounts)
          .map((discount: IDiscount) => (
            <Checkbox
              key={discount._id}
              borderColor='black'
              isChecked={selectedDiscounts.includes(discount._id.toString())}
              onChange={(e) => handleSelection(e, discount, false)}
            >
              {`${discount.name} ${
                discount.type === 'orderFreeShipping' ||
                discount.type === 'productFreeShipping'
                  ? '免運費'
                  : discount.calculationMethod === 'percentage'
                  ? `${discount.value}%`
                  : `${discount.value} NTD`
              }`}
            </Checkbox>
          ))}
      </Stack>
    </Box>
  );
};

export default DiscountsSection;
