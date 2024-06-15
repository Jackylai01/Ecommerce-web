import { Box } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import DiscountForm from '../../../Form/FormCRUD/DiscountForm';

const EditDiscount = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box p='4'>
      <DiscountForm discountId={id as string} />
    </Box>
  );
};

export default EditDiscount;
