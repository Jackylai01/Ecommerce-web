import { Box } from '@chakra-ui/react';
import React from 'react';

type Props = {
  isLoading: boolean;
  arrayData?: any[] | null;
  loadingText?: string;
  children?: React.ReactNode;
};

const DotAnimationLoadingLayout = ({
  isLoading,
  arrayData,
  loadingText,
  children,
}: Props) => {
  if (isLoading)
    return (
      <Box
        as='main'
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Box as='section' className='loading'>
          <Box className='loading__spinner'>
            <Box className='loading__spinner-circle'></Box>
            <Box className='loading__spinner-circle'></Box>
            <Box className='loading__spinner-circle'></Box>
          </Box>
          <p className='loading__text'>{loadingText || '處理您的請求中...'}</p>
        </Box>
      </Box>
    );

  if (arrayData && !arrayData.length) {
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

export default DotAnimationLoadingLayout;
