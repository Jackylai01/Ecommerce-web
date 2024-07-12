import { Box, Checkbox, Divider, Heading, Stack } from '@chakra-ui/react';
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
}

const DiscountsSection: React.FC<DiscountsSectionProps> = ({
  selectedDiscounts,
  handleDiscountSelection,
  handleExclusiveDiscountSelection,
  uniqueId,
  checkoutProducts,
}) => {
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
      if (discount.productId && discount.productId.length > 0) {
        return discount.productId.some((id) =>
          checkoutProducts.includes(id.toString()),
        );
      }
      return true;
    },
  );

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
          .sort((a: any, b: any) => a.priority - b.priority)
          .map((discount: IDiscount) => (
            <Checkbox
              key={discount._id}
              borderColor='black'
              isChecked={selectedDiscounts.includes(discount._id)}
              isDisabled={selectedDiscounts.some(
                (id) =>
                  !filteredDiscountList.find((d: IDiscount) => d._id === id)
                    .combinableWithOtherDiscounts,
              )}
              onChange={(e) => handleDiscountSelection(e, discount)}
            >
              {`${discount.name} - ${discount.value}${
                discount.calculationMethod === 'percentage' ? '%' : 'NTD'
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
              isChecked={selectedDiscounts.includes(discount._id)}
              onChange={(e) => handleExclusiveDiscountSelection(e, discount)}
            >
              {`${discount.name} ${
                discount.calculationMethod === 'percentage' ? '%' : 'NTD'
              }`}
            </Checkbox>
          ))}
      </Stack>
    </Box>
  );
};

export default DiscountsSection;
