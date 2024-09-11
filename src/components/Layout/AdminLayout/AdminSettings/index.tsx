import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { Bell, FileText, Settings, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const AdminSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeCard, setActiveCard] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 只在客戶端渲染
  }, []);

  const cards = [
    { title: '用戶管理', icon: Users, color: 'blue.50' },
    { title: '系統設置', icon: Settings, color: 'green.50' },
    { title: '內容管理', icon: FileText, color: 'yellow.50' },
    { title: '通知設置', icon: Bell, color: 'purple.50' },
  ];

  const handleCardClick = (card: any) => {
    setActiveCard(card);
    onOpen();
  };

  return (
    <Box minH='100vh' bg='gray.50' p={8}>
      <Heading as='h1' size='xl' mb={8} color='gray.800' fontWeight='light'>
        管理後台
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {isClient &&
          cards.map((card, index) => (
            <Box
              key={index}
              bg={card.color}
              p={6}
              borderRadius='md'
              boxShadow='sm'
              _hover={{ boxShadow: 'md', cursor: 'pointer' }}
              transition='all 0.3s'
              onClick={() => handleCardClick(card)}
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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW='425px'>
          <ModalHeader>{activeCard?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>名稱</FormLabel>
              <Input placeholder='輸入名稱' />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>描述</FormLabel>
              <Input placeholder='輸入描述' />
            </FormControl>
            <Button colorScheme='blue' w='full' onClick={onClose}>
              保存
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminSettings;
