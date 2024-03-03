// hooks/useStatus.js
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface UseStatusArgs {
  Success: boolean;
  Failed: boolean;
  Error: string | null;
  SuccessMessage: string;
  ErrorMessage: string;
}

const useStatus = ({
  Success,
  Failed,
  Error,
  SuccessMessage,
  ErrorMessage,
}: UseStatusArgs) => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (Success) {
      toast({
        title: SuccessMessage,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/');
    }

    if (Failed && Error) {
      toast({
        title: ErrorMessage,
        description: Error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [Success, Failed, Error, SuccessMessage, ErrorMessage, router, toast]);
};

export default useStatus;
