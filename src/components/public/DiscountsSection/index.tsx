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
}

const DiscountsSection: React.FC<DiscountsSectionProps> = ({
  selectedDiscounts,
  handleDiscountSelection,
  handleExclusiveDiscountSelection,
  uniqueId,
}) => {
  const { list: publicDiscountList } = useAppSelector(
    (state) => state.publicDiscounts,
  );

  if (uniqueId) {
    return null;
  }

  return (
    <Box>
      <Heading size='md' my='1rem'>
        Available Discounts
      </Heading>
      <Stack>
        <Heading size='sm' mb='2'>
          Combinable Discounts
        </Heading>
        {publicDiscountList
          ?.filter((d: IDiscount) => d.combinableWithOtherDiscounts)
          .map((discount: IDiscount) => (
            <Checkbox
              key={discount._id}
              borderColor='black'
              isChecked={selectedDiscounts.includes(discount._id)}
              isDisabled={selectedDiscounts.some(
                (id) =>
                  !publicDiscountList.find((d: IDiscount) => d._id === id)
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
        {publicDiscountList
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
