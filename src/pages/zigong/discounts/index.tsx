import { AddIcon } from '@chakra-ui/icons';
import { IconButton, useBreakpointValue } from '@chakra-ui/react';

import LoadingLayout from '@components/Layout/LoadingLayout';
import TabsLayout from '@components/Layout/TabsLayout';
import { tabsConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetDiscountState } from '@reducers/admin/discount';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect } from 'react';

const DiscountTableContainer = dynamic(
  () => import('@components/Layout/AdminLayout/Discount'),
  {
    ssr: false,
  },
);

const NewDiscount = () => {
  const dispatch = useAppDispatch();
  const {
    status: { addDiscountLoading, addDiscountSuccess, addDiscountFailed },
    error: { addDiscountError },
  } = useAppSelector((state) => state.adminDiscount);
  const topPosition = useBreakpointValue({ base: '80px', md: '10%' });
  const marginRight = useBreakpointValue({ base: '8px', md: '20px' });

  useEffect(() => {
    return () => {
      dispatch(resetDiscountState());
    };
  }, [dispatch]);

  return (
    <LoadingLayout isLoading={addDiscountLoading}>
      <Link href='/zigong/discounts/create'>
        <IconButton
          icon={<AddIcon />}
          isRound
          colorScheme='teal'
          aria-label='Add product button'
          position='absolute'
          right={marginRight}
          top={topPosition}
          zIndex={1}
        />
      </Link>
      <TabsLayout tabsConfig={tabsConfig}>
        <DiscountTableContainer />
      </TabsLayout>
    </LoadingLayout>
  );
};

export default NewDiscount;
