import { Box, Spinner } from '@chakra-ui/react';

type Props = {
  isLoading: boolean;
  arrayData?: any[] | null;
  children?: React.ReactNode;
};

const LoadingLayout = ({ isLoading, arrayData, children }: Props) => {
  if (isLoading)
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Box>
    );

  if (arrayData && !arrayData?.length) {
    return (
      <Box as='article' className='main__container'>
        <Box as='main' className='main__info-show'>
          <Box as='h3' className='text-center' m='40px'>
            目前暫無資料
          </Box>
        </Box>
      </Box>
    );
  }

  return <>{children}</>;
};

export default LoadingLayout;
