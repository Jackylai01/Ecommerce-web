import {
  Box,
  Heading,
  IconButton,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import FormModal from '@components/Modal/FormModal';
import MessageModal from '@components/Modal/MessageModal';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetSettingStatus } from '@reducers/admin/admin-settings';
import { setInvoiceIssuingModeAsync } from '@reducers/admin/admin-settings/actions';
import { resetAdminStoreSetting } from '@reducers/admin/admin-store-setting';
import { updateStoreSettingsAsync } from '@reducers/admin/admin-store-setting/actions';
import { Plus, Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const AdminSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeSetting, setActiveSetting] = useState<string | null>(null);
  const [desktopLogoName, setDesktopLogoName] = useState<string | null>(null);
  const [desktopLogoPreview, setDesktopLogoPreview] = useState<string | null>(
    null,
  );
  const [mobileLogoName, setMobileLogoName] = useState<string | null>(null);
  const [mobileLogoPreview, setMobileLogoPreview] = useState<string | null>(
    null,
  );
  const [faviconName, setFaviconName] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  const desktopLogoInputRef = useRef<HTMLInputElement | null>(null);
  const mobileLogoInputRef = useRef<HTMLInputElement | null>(null);
  const faviconInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const {
    status: {
      setInvoiceIssuingModeFailed,
      setInvoiceIssuingModeLoading,
      setInvoiceIssuingModeSuccess,
    },
    error: { setInvoiceIssuingModeError },
  } = useAppSelector((state) => state.adminSetting);
  const {
    settings: storeSettings,
    status: {
      updateSettingsFailed,
      updateSettingsLoading,
      updateSettingsSuccess,
    },
    error: {},
  } = useAppSelector((state) => state.adminStoreSetting);

  const methods = useForm();
  const { register, handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    // 重置表單數據為現有商店設置
    if (storeSettings && activeSetting === 'store') {
      reset({
        storeName: storeSettings.storeName,
        storeDescription: storeSettings.storeDescription,
      });
      setDesktopLogoPreview(storeSettings.desktopLogo?.imageUrl || null);
      setMobileLogoPreview(storeSettings.mobileLogo?.imageUrl || null);
      setFaviconPreview(storeSettings.favicon?.imageUrl || null);
    }
  }, [storeSettings, activeSetting, reset]);

  const handleCardClick = (key: string) => {
    setActiveSetting(key);
    onOpen();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const fileName = file.name;
      if (field === 'desktopLogo') {
        setDesktopLogoPreview(previewUrl);
        setDesktopLogoName(fileName);
      } else if (field === 'mobileLogo') {
        setMobileLogoPreview(previewUrl);
        setMobileLogoName(fileName);
      } else if (field === 'favicon') {
        setFaviconPreview(previewUrl);
        setFaviconName(fileName);
      }
      setValue(field, file);
    }
  };

  const onSubmit = (data: any) => {
    if (activeSetting === 'store') {
      const formData = new FormData();
      formData.append('storeName', data.storeName);
      formData.append('storeDescription', data.storeDescription);
      if (data.desktopLogo instanceof File) {
        formData.append('desktopLogo', data.desktopLogo);
      }
      if (data.mobileLogo instanceof File) {
        formData.append('mobileLogo', data.mobileLogo);
      }
      if (data.favicon instanceof File) {
        formData.append('favicon', data.favicon);
      }
      dispatch(updateStoreSettingsAsync(formData));
    } else if (activeSetting === 'invoice') {
      dispatch(setInvoiceIssuingModeAsync(data.invoiceMode));
    }
    onClose();
  };

  const getFormContent = () => {
    if (activeSetting === 'invoice') {
      return (
        <Select {...register('invoiceMode')} defaultValue='immediate'>
          <option value='immediate'>即時</option>
          <option value='delayed'>延遲</option>
        </Select>
      );
    } else if (activeSetting === 'store') {
      return (
        <>
          <Input {...register('storeName')} placeholder='商店名稱' mb={4} />
          <Textarea
            {...register('storeDescription')}
            placeholder='商店描述'
            mb={4}
          />

          <Box mb={4} textAlign='center'>
            <Text mb={2}>電腦版Logo</Text>
            <IconButton
              icon={<Plus />}
              aria-label='Upload Desktop Logo'
              onClick={() => desktopLogoInputRef.current?.click()}
            />
            {desktopLogoName && <Text mt={2}>{desktopLogoName}</Text>}
            {desktopLogoPreview && (
              <Image
                src={desktopLogoPreview}
                alt='Desktop Logo Preview'
                mt={2}
              />
            )}
            <Input
              type='file'
              accept='image/*'
              ref={desktopLogoInputRef}
              onChange={(e) => handleFileChange(e, 'desktopLogo')}
              display='none'
            />
          </Box>

          <Box mb={4} textAlign='center'>
            <Text mb={2}>手機版Logo</Text>
            <IconButton
              icon={<Plus />}
              aria-label='Upload Mobile Logo'
              onClick={() => mobileLogoInputRef.current?.click()}
            />
            {mobileLogoName && <Text mt={2}>{mobileLogoName}</Text>}
            {mobileLogoPreview && (
              <Image src={mobileLogoPreview} alt='Mobile Logo Preview' mt={2} />
            )}
            <Input
              type='file'
              accept='image/*'
              ref={mobileLogoInputRef}
              onChange={(e) => handleFileChange(e, 'mobileLogo')}
              display='none'
            />
          </Box>

          <Box mb={4} textAlign='center'>
            <Text mb={2}>網站小圖示 (Favicon)</Text>
            <IconButton
              icon={<Plus />}
              aria-label='Upload Favicon'
              onClick={() => faviconInputRef.current?.click()}
            />
            {faviconName && <Text mt={2}>{faviconName}</Text>}
            {faviconPreview && (
              <Image src={faviconPreview} alt='Favicon Preview' mt={2} />
            )}
            <Input
              type='file'
              accept='image/*'
              ref={faviconInputRef}
              onChange={(e) => handleFileChange(e, 'favicon')}
              display='none'
            />
          </Box>
        </>
      );
    }
    return null;
  };

  const closeMessageModal = () => {
    dispatch(resetSettingStatus());
    dispatch(resetAdminStoreSetting());
    reset();
  };

  const cards = [
    { title: '發票設定', key: 'invoice', icon: Settings, color: 'green.50' },
    { title: '商店設置', key: 'store', icon: Settings, color: 'blue.50' },
  ];

  return (
    <LoadingLayout
      isLoading={setInvoiceIssuingModeLoading || updateSettingsLoading}
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
                icon={<Settings />}
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
          title={activeSetting === 'invoice' ? '發票設定' : '商店設置'}
        >
          {getFormContent()}
        </FormModal>

        <MessageModal
          title={activeSetting === 'invoice' ? '發票設定' : '商店設置'}
          isActive={
            setInvoiceIssuingModeSuccess ||
            setInvoiceIssuingModeFailed ||
            updateSettingsSuccess ||
            updateSettingsFailed
          }
          error={setInvoiceIssuingModeError}
          onClose={closeMessageModal}
        >
          {setInvoiceIssuingModeSuccess && <Box>發票模式已成功更新</Box>}
          {updateSettingsSuccess && <Box>商店設置已成功更新</Box>}
        </MessageModal>
      </Box>
    </LoadingLayout>
  );
};

export default AdminSettings;
