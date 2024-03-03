import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FieldConfig } from '@components/Form';
import Field from '@components/Form/Field';
import LoadingLayout from '@components/Layout/LoadingLayout';
import { fieldSetDefault } from '@helpers/field-set-default';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
  title: string;
  isLoading: boolean;
  detailData: unknown | null;
  fieldConfigs?: FieldConfig[];
  onSubmit: (data: any) => void;
  error?: string | null;
  actions: React.ReactNode;
  children?: React.ReactNode;
};

const FormLayoutUI = ({
  title,
  isLoading,
  detailData,
  fieldConfigs,
  onSubmit,
  error,
  actions,
  children,
}: Props) => {
  const methods = useForm();
  const fontSize = useBreakpointValue({ base: '28', md: 'md', lg: 'lg' });

  useEffect(() => {
    if (!detailData) return;
    const editData = fieldSetDefault(fieldConfigs || [], detailData);
    methods.reset(editData);
  }, [detailData, fieldConfigs, methods]);

  return (
    <Box as='form' onSubmit={methods.handleSubmit(onSubmit)}>
      <LoadingLayout isLoading={isLoading}>
        <VStack spacing={4}>
          <Flex
            w='100%'
            justifyContent='space-between'
            alignItems='center'
            bg='primary.dark'
            p={4}
          >
            <Heading as='h2' size='lg' color='white' fontSize={fontSize}>
              {title}
            </Heading>
            <Box>{actions}</Box>
          </Flex>
          <Box w='100%' p={4}>
            <FormProvider {...methods}>
              <VStack spacing={4}>
                {error && <Text color='red.500'>{error}</Text>}
                {fieldConfigs?.map((fieldConfig) => (
                  <Field key={fieldConfig.name} fieldConfig={fieldConfig} />
                ))}
                {children}
              </VStack>
            </FormProvider>
          </Box>
        </VStack>
      </LoadingLayout>
    </Box>
  );
};

export default FormLayoutUI;
