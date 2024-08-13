import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

interface NotificationConfig {
  success: boolean | null;
  error: boolean | null;
  successTitle: string;
  successDescription?: string;
  errorTitle: string;
  errorDescription?: string;
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

  useEffect(() => {
    if (success) {
      toast({
        title: successTitle,
        description: successDescription,
        status: 'success',
        isClosable: true,
      });
      if (onSuccess) {
        onSuccess();
      }
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
}
