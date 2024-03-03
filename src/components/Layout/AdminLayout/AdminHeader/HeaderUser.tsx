import {
  Avatar,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ADMIN_ROUTE } from '@fixtures/constants';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminDetailUserProfileAsync } from '@reducers/admin/auth/actions';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HeaderUser = () => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const {
    userProfile,
    status: { adminDetailUserProfileLoading },
  } = useAppSelector((state) => state.adminAuth);

  const avatarSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const buttonSize = useBreakpointValue({ base: 'xs', md: 'md' });
  const fontSize = useBreakpointValue({ base: 'xs', md: 'md' });

  useEffect(() => {
    if (adminDetailUserProfileLoading) return;
    dispatch(adminDetailUserProfileAsync());
  }, [dispatch, adminDetailUserProfileLoading]);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsModalOpen(true);
    }
  };

  // TODO 要從Redux 設定

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('userId', userProfile?._id || 'defaultUserId');

    try {
      await axios.post('/api/zigong/upload-profile-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('上傳失敗。');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Flex
      as='nav'
      gap={{ base: '10px', md: '30px' }}
      alignItems='center'
      justifyContent='center'
    >
      <Avatar
        src={userProfile?.images?.[0]?.imageUrl}
        size={avatarSize}
        onClick={() => {
          const fileInput = document.getElementById(
            'file-upload',
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.click();
          }
        }}
      ></Avatar>

      <Input
        type='file'
        id='file-upload'
        hidden
        onChange={handleFileChange}
        accept='image/*'
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>上傳頭像</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedFile && (
              <Image src={URL.createObjectURL(selectedFile)} alt='Preview' />
            )}
            {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={handleUpload}
              isDisabled={isUploading}
            >
              {isUploading ? '上傳中' : '上傳'}
            </Button>
            <Button
              variant='ghost'
              onClick={() => setIsModalOpen(false)}
              isDisabled={isUploading}
            >
              取消
            </Button>
            {isUploading && <Spinner />}
          </ModalFooter>
        </ModalContent>
        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={handleUpload}
            isDisabled={isUploading}
          >
            {isUploading ? '上傳中...' : '上傳'}
          </Button>
          <Button
            variant='ghost'
            onClick={() => setIsModalOpen(false)}
            isDisabled={isUploading}
          >
            取消
          </Button>
          {isUploading && <Spinner />}
        </ModalFooter>
      </Modal>
      <HStack zIndex='1000' ml='2rem' mt='0.5rem'>
        <Menu>
          <MenuButton
            as={Button}
            size={buttonSize}
            _hover={{ bg: 'orange.600' }}
            bg='orange.400'
            color='white'
          >
            <Text fontSize={fontSize} color='white'>
              {userProfile?.username}
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem fontSize={fontSize}>
              <Link href={`/${ADMIN_ROUTE}/admin-profile`}>編輯帳號</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default HeaderUser;
