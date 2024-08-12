import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function ArticleManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');

  return (
    <Container maxW='1200px' py='2rem'>
      <Heading as='h1' mb='2rem' textAlign='center'>
        文章管理後台
      </Heading>

      <Box bg='white' boxShadow='lg' borderRadius='12px' p='2rem' mb='2rem'>
        <Button colorScheme='purple' onClick={onOpen}>
          + 新增文章
        </Button>

        <Box overflowX='auto' mt='2rem'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>標題</Th>
                <Th>狀態</Th>
                <Th>編輯人</Th>
                <Th>封面圖片</Th>
                <Th>操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>如何提高工作效率</Td>
                <Td>
                  <Badge colorScheme='green'>已發佈</Badge>
                </Td>
                <Td>張三</Td>
                <Td>
                  <Image
                    src='/api/placeholder/48/48'
                    alt='封面'
                    boxSize='48px'
                    borderRadius='6px'
                    objectFit='cover'
                    boxShadow='md'
                  />
                </Td>
                <Td>
                  <Flex gap='0.5rem'>
                    <Button colorScheme='purple' size='sm'>
                      編輯
                    </Button>
                    <Button colorScheme='red' size='sm'>
                      刪除
                    </Button>
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>2024年科技趨勢預測</Td>
                <Td>
                  <Badge colorScheme='yellow'>草稿</Badge>
                </Td>
                <Td>李四</Td>
                <Td>
                  <Image
                    src='/api/placeholder/48/48'
                    alt='封面'
                    boxSize='48px'
                    borderRadius='6px'
                    objectFit='cover'
                    boxShadow='md'
                  />
                </Td>
                <Td>
                  <Flex gap='0.5rem'>
                    <Button colorScheme='purple' size='sm'>
                      編輯
                    </Button>
                    <Button colorScheme='red' size='sm'>
                      刪除
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>編輯文章</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='title'>標題</FormLabel>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='輸入文章標題'
              />
            </FormControl>

            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='content'>內容</FormLabel>
              <Textarea
                id='content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='輸入文章內容'
                resize='vertical'
                height='120px'
              />
            </FormControl>

            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='status'>狀態</FormLabel>
              <Select
                id='status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value='draft'>草稿</option>
                <option value='published'>發佈</option>
              </Select>
            </FormControl>

            <FormControl mb='1.5rem'>
              <FormLabel htmlFor='cover'>封面圖片</FormLabel>
              <Input id='cover' type='file' accept='image/*' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' mr='3' onClick={onClose}>
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
