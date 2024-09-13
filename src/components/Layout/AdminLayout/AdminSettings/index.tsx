import {
  Box,
  Heading,
  IconButton,
  Select,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import FormModal from '@components/Modal/FormModal';
import MessageModal from '@components/Modal/MessageModal';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetSettingStatus } from '@reducers/admin/admin-settings';
import {
  setInvoiceIssuingModeAsync,
  setShoppingModeAsync,
} from '@reducers/admin/admin-settings/actions';

import { Settings } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AdminSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeSetting, setActiveSetting] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {
    status: {
      setInvoiceIssuingModeFailed,
      setInvoiceIssuingModeLoading,
      setInvoiceIssuingModeSuccess,
      setShoppingModeFailed,
      setShoppingModeLoading,
      setShoppingModeSuccess,
    },
    error: { setInvoiceIssuingModeError, setShoppingModeError },
  } = useAppSelector((state) => state.adminSetting);

  const methods = useForm();
  const { register, handleSubmit } = methods;

  const [invoiceMode, setInvoiceMode] = useState<'immediate' | 'delayed'>(
    'immediate',
  );
  const [shoppingMode, setShoppingMode] = useState<
    'memberOnly' | 'guestAllowed'
  >('memberOnly');

  const cards = [
    { title: '發票設定', key: 'invoice', icon: Settings, color: 'green.50' },
    { title: '購物設定', key: 'shopping', icon: Settings, color: 'yellow.50' },
  ];

  const handleCardClick = (key: string) => {
    setActiveSetting(key);
    onOpen();
  };

  const onSubmit = (data: any) => {
    if (activeSetting === 'invoice') {
      dispatch(setInvoiceIssuingModeAsync(data.invoiceMode));
    } else if (activeSetting === 'shopping') {
      dispatch(setShoppingModeAsync(data.shoppingMode));
    }
    onClose();
  };

  const getFormContent = () => {
    if (activeSetting === 'invoice') {
      return (
        <Select
          {...register('invoiceMode')}
          defaultValue={invoiceMode}
          onChange={(e) =>
            setInvoiceMode(e.target.value as 'immediate' | 'delayed')
          }
        >
          <option value='immediate'>即時</option>
          <option value='delayed'>延遲</option>
        </Select>
      );
    } else if (activeSetting === 'shopping') {
      return (
        <Select
          {...register('shoppingMode')}
          defaultValue={shoppingMode}
          onChange={(e) =>
            setShoppingMode(e.target.value as 'memberOnly' | 'guestAllowed')
          }
        >
          <option value='memberOnly'>註冊會員結帳</option>
          <option value='guestAllowed'>訪客購買</option>
        </Select>
      );
    }
    return null;
  };

  const closeMessageModal = () => {
    dispatch(resetSettingStatus());
  };

  return (
    <LoadingLayout
      isLoading={setInvoiceIssuingModeLoading || setShoppingModeLoading}
    >
      <Box minH='100vh' bg='gray.50' p={8}>
        <Heading as='h1' size='xl' mb={8} color='gray.800' fontWeight='light'>
          系統設置
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {cards.map((card, index) => (
            <Box
              key={index}
              bg={card.color}
              p={6}
              borderRadius='md'
              boxShadow='sm'
              _hover={{ boxShadow: 'md', cursor: 'pointer' }}
              transition='all 0.3s'
              onClick={() => handleCardClick(card.key)}
              textAlign='center'
            >
              <IconButton
                icon={<card.icon size={48} />}
                aria-label={card.title}
                variant='unstyled'
                mb={4}
                size='lg'
                color='gray.600'
              />
              <Heading as='h2' size='md' color='gray.800'>
                {card.title}
              </Heading>
            </Box>
          ))}
        </SimpleGrid>

        <FormModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit(onSubmit)}
          title={activeSetting === 'invoice' ? '發票設定' : '購物設定'}
        >
          {getFormContent()}
        </FormModal>

        {/* 發票設定訊息彈窗 */}
        <MessageModal
          title='發票設定'
          isActive={setInvoiceIssuingModeSuccess || setInvoiceIssuingModeFailed}
          error={setInvoiceIssuingModeError}
          onClose={closeMessageModal}
        >
          {setInvoiceIssuingModeSuccess && <Box>發票模式已成功更新</Box>}
        </MessageModal>

        {/* 購物設定訊息彈窗 */}
        <MessageModal
          title='購物設定'
          isActive={setShoppingModeSuccess || setShoppingModeFailed}
          error={setShoppingModeError}
          onClose={closeMessageModal}
        >
          {setShoppingModeSuccess && <Box>購物模式已成功更新</Box>}
        </MessageModal>
      </Box>
    </LoadingLayout>
  );
};

export default AdminSettings;
