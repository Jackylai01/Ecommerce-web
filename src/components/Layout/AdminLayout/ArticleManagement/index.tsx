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
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  addArticleAsync,
  editArticleAsync,
  getAllArticlesAsync,
} from '@reducers/admin/admin-articles/actions';
import { useEffect, useState } from 'react';
import ArticleCustomBlocks from './ArticleCustomBlocks';

export default function ArticleManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [status, setStatus] = useState('draft');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.adminAuth);
  const {
    list: articles,
    status: { addArticleLoading, addArticleFailed, addArticleSuccess },
    error: { addArticleError },
  } = useAppSelector((state) => state.adminArticles);

  useEffect(() => {
    dispatch(getAllArticlesAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleSaveArticle = async () => {
    if (!userInfo) return;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('status', status);
    formData.append('author', userInfo._id);

    // 確保 blocks 是正確的 JSON 字串
    const blocksJson = JSON.stringify(contentBlocks);
    formData.append('blocks', blocksJson);

    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    if (isEditing && currentArticleId) {
      dispatch(
        editArticleAsync({ articleId: currentArticleId, body: formData }),
      );
    } else {
      dispatch(addArticleAsync(formData));
    }
  };

  const handleEditArticle = (article: any) => {
    setTitle(article.title);
    setStatus(article.status);
    setContentBlocks(article.blocks);
    setCurrentArticleId(article._id);
    setIsEditing(true);
    onOpen();
  };

  const resetForm = () => {
    setTitle('');
    setStatus('draft');
    setContentBlocks([]);
    setCoverImage(null);
    setCurrentArticleId(null);
    setIsEditing(false);
  };

  useEffect(() => {
    if (addArticleSuccess) {
      toast({
        title: isEditing ? '編輯成功' : '新增成功',
        description: isEditing ? '文章編輯成功' : '新增文章建立成功',
        status: 'success',
        isClosable: true,
      });
      onClose();
      resetForm();
      dispatch(getAllArticlesAsync({ page: 1, limit: 10 }));
    } else if (addArticleFailed) {
      toast({
        title: isEditing ? '編輯文章失敗' : '新增文章失敗',
        description: addArticleError,
        status: 'error',
        isClosable: true,
      });
    }
  }, [
    toast,
    addArticleSuccess,
    addArticleFailed,
    addArticleError,
    onClose,
    dispatch,
    isEditing,
  ]);

  return (
    <LoadingLayout isLoading={addArticleLoading}>
      <Container maxW='1200px' py='2rem'>
        <Heading as='h1' mb='2rem' textAlign='center'>
          文章管理後台
        </Heading>

        <Box bg='white' boxShadow='lg' borderRadius='12px' p='2rem' mb='2rem'>
          <Button
            colorScheme='purple'
            onClick={() => {
              resetForm();
              onOpen();
            }}
          >
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
                {articles?.map((article) => (
                  <Tr key={article._id}>
                    <Td>{article.title}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          article.status === 'published' ? 'green' : 'yellow'
                        }
                      >
                        {article.status === 'published' ? '已發佈' : '草稿'}
                      </Badge>
                    </Td>
                    <Td>{article.editor}</Td>
                    <Td>
                      <Image
                        src={article.coverImage}
                        alt='封面'
                        boxSize='48px'
                        borderRadius='6px'
                        objectFit='cover'
                        boxShadow='md'
                      />
                    </Td>
                    <Td>
                      <Flex gap='0.5rem'>
                        <Button
                          colorScheme='purple'
                          size='sm'
                          onClick={() => handleEditArticle(article)}
                        >
                          編輯
                        </Button>
                        <Button colorScheme='red' size='sm'>
                          刪除
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered size='5xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{isEditing ? '編輯文章' : '新增文章'}</ModalHeader>
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
                <ArticleCustomBlocks
                  name='blocks'
                  label='文章內容'
                  blocks={contentBlocks}
                  setBlocks={setContentBlocks}
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
                <Input
                  id='cover'
                  type='file'
                  accept='image/*'
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='purple' mr='3' onClick={handleSaveArticle}>
                {isEditing ? '保存修改' : '保存'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </LoadingLayout>
  );
}
