import {
  Avatar,
  Box,
  Flex,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import MessageModal from '@components/Modal/MessageModal';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminUploadProfileImageAsync } from '@reducers/admin/auth/actions';
import { useEffect, useRef, useState } from 'react';

interface HeaderType {
  backgroundHeader: any;
  backgroundProfile: any;
  avatarImage: any;
  name: string;
  email: string;
  tabs?: any[];
}

const Header = ({
  backgroundHeader,
  backgroundProfile,
  avatarImage,
  name,
  email,
  tabs,
}: HeaderType) => {
  const textColor = useColorModeValue('gray.700', 'white');
  const borderProfileColor = useColorModeValue(
    'white',
    'rgba(255, 255, 255, 0.31)',
  );
  const emailColor = useColorModeValue('gray.400', 'gray.300');
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('新增個人照片');
  const dispatch = useAppDispatch();
  const {
    userProfile,
    userInfo,
    status: {
      uploadProfileImageFailed,
      uploadProfileImageSuccess,
      uploadProfileImageLoading,
    },
    error: { uploadProfileImageError },
  } = useAppSelector((state) => state.adminAuth);

  const toast = useToast();

  const handleAvatarClick = () => {
    inputFileRef.current?.click();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', file);
    dispatch(adminUploadProfileImageAsync({ formData, userId: userInfo?.id }));
  };

  useEffect(() => {
    if (uploadProfileImageSuccess) {
      setIsModalOpen(true);
      setModalContent('新增圖片成功！');
    }

    if (uploadProfileImageFailed) {
      setIsModalOpen(true);
      setModalContent('');
    }
  }, [uploadProfileImageFailed, uploadProfileImageSuccess]);

  useEffect(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <LoadingLayout isLoading={uploadProfileImageLoading}>
      <Box
        mb={{ sm: '205px', md: '75px', xl: '70px' }}
        borderRadius='15px'
        px='0px'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Box
          bgImage={backgroundHeader}
          w='100%'
          h='300px'
          borderRadius='25px'
          bgPosition='50%'
          bgRepeat='no-repeat'
          position='relative'
          display='flex'
          justifyContent='center'
        >
          <Flex
            direction={{ sm: 'column', md: 'row' }}
            mx='1.5rem'
            maxH='330px'
            w={{ sm: '90%', xl: '95%' }}
            justifyContent={{ sm: 'center', md: 'space-between' }}
            align='center'
            backdropFilter='saturate(200%) blur(50px)'
            position='absolute'
            boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
            border='2px solid'
            borderColor={borderProfileColor}
            bg={backgroundProfile}
            p='24px'
            borderRadius='20px'
            transform={{
              sm: 'translateY(45%)',
              md: 'translateY(110%)',
              lg: 'translateY(160%)',
            }}
          >
            <Flex
              align='center'
              mb={{ sm: '10px', md: '0px' }}
              direction={{ sm: 'column', md: 'row' }}
              w={{ sm: '100%' }}
              textAlign={{ sm: 'center', md: 'start' }}
            >
              <input
                type='file'
                ref={inputFileRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept='image/*'
              />
              {userProfile?.profileImage ? (
                <Tooltip label='點擊替換圖片' hasArrow>
                  <Avatar
                    me={{ md: '22px' }}
                    src={userProfile.profileImage.imageUrl}
                    w='80px'
                    h='80px'
                    borderRadius='15px'
                    onClick={handleAvatarClick}
                    cursor='pointer'
                  />
                </Tooltip>
              ) : (
                <Tooltip label='點擊替換圖片' hasArrow>
                  <Avatar
                    me={{ md: '22px' }}
                    src={avatarImage}
                    w='80px'
                    h='80px'
                    borderRadius='15px'
                    onClick={handleAvatarClick}
                  />
                </Tooltip>
              )}
              <Flex direction='column' maxWidth='100%' my={{ sm: '14px' }}>
                <Text
                  fontSize={{ sm: 'lg', lg: 'xl' }}
                  color={textColor}
                  fontWeight='bold'
                  ms={{ sm: '8px', md: '0px' }}
                >
                  {name}
                </Text>
                <Text
                  fontSize={{ sm: 'sm', md: 'md' }}
                  color={textColor}
                  fontWeight='semibold'
                >
                  {email}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <MessageModal
          title={modalTitle}
          isActive={isModalOpen}
          error={uploadProfileImageError}
          onClose={handleCloseModal}
        >
          {modalContent}
        </MessageModal>
      </Box>
    </LoadingLayout>
  );
};

export default Header;
