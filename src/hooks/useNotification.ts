import { useToast } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

interface NotificationConfig {
  success: boolean | null;
  error: boolean | null;
  successTitle: string;
  successDescription?: string;
  errorTitle: string;
  errorDescription?: any;
  onSuccess?: () => void;
}

export function useNotification({
  success,
  error,
  successTitle,
  successDescription,
  errorTitle,
  errorDescription,
  onSuccess,
}: NotificationConfig) {
  const toast = useToast();
  const hasExecutedSuccess = useRef(false);

  useEffect(() => {
    if (success && !hasExecutedSuccess.current) {
      toast({
        title: successTitle,
        description: successDescription,
        status: 'success',
        isClosable: true,
      });
      if (onSuccess) {
        onSuccess();
      }
      hasExecutedSuccess.current = true;
    } else if (error) {
      toast({
        title: errorTitle,
        description: errorDescription,
        status: 'error',
        isClosable: true,
      });
    }
  }, [
    success,
    error,
    toast,
    successTitle,
    successDescription,
    errorTitle,
    errorDescription,
    onSuccess,
  ]);

  useEffect(() => {
    if (!success) {
      hasExecutedSuccess.current = false;
    }
  }, [success]);
}
