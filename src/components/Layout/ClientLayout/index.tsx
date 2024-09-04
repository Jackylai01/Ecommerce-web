import { Box, Flex } from '@chakra-ui/react';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { useRouter } from 'next/router';

type Props = {
  children?: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    userInfo,
    error: { refreshTokenError },
  } = useAppSelector((state) => state.clientAuth);

  return (
    <>
      <Flex direction='column'>
        <Box>{children}</Box>
      </Flex>
    </>
  );
};

export default ClientLayout;
