import {
  Badge,
  Box,
  Button,
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
  Switch,
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
import { resetArticleState } from '@reducers/admin/admin-articles';
import {
  addArticleAsync,
  deleteArticleAsync,
  editArticleAsync,
  getAllArticlesAsync,
} from '@reducers/admin/admin-articles/actions';
import { useEffect, useState } from 'react';
import ArticleCustomBlocks from './ArticleCustomBlocks';

export default function ArticleManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [readTime, setReadTime] = useState<number>(0);
  const [excerpt, setExcerpt] = useState('');
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [status, setStatus] = useState('draft');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [category, setCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.adminAuth);
  const {
    list: articles,
    status: {
      addArticleLoading,
      addArticleFailed,
      addArticleSuccess,
      deleteArticleLoading,
      deleteArticleFailed,
      deleteArticleSuccess,
    },
    error: { addArticleError, deleteArticleError },
  } = useAppSelector((state) => state.adminArticles);

  useEffect(() => {
    dispatch(getAllArticlesAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleSaveArticle = async () => {
    if (!userInfo) return;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('tags', tags.join(','));
    formData.append('readTime', readTime.toString());
    formData.append('excerpt', excerpt);
    formData.append('status', status);
    formData.append('author', userInfo._id);
    formData.append('isFeatured', isFeatured.toString());
    formData.append('category', category);

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
    setTags(article.tags || []);
    setReadTime(article.readTime || 0);
    setExcerpt(article.excerpt || '');
    setStatus(article.status);
    setContentBlocks(article.blocks);
    setIsFeatured(article.isFeatured || false);
    setCategory(article.category || '');
    setCurrentArticleId(article._id);
    setIsEditing(true);
    onOpen();
  };

  const handleDeleteArticle = (articleId: string) => {
    dispatch(deleteArticleAsync(articleId));
  };

  const resetForm = () => {
    setTitle('');
    setTags([]);
    setReadTime(0);
    setExcerpt('');
    setStatus('draft');
    setContentBlocks([]);
    setCoverImage(null);
    setIsFeatured(false);
    setCategory('');
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

  useEffect(() => {
    if (deleteArticleSuccess) {
      toast({
        title: '刪除文章成功',
        description: '刪除文章成功',
        status: 'success',
        isClosable: true,
      });
      dispatch(resetArticleState());
    } else if (deleteArticleFailed) {
      toast({
        title: '刪除文章失敗',
        description: deleteArticleError,
        status: 'error',
        isClosable: true,
      });
    }
  }, [toast, deleteArticleFailed, deleteArticleSuccess, deleteArticleError]);

  return (
    <LoadingLayout isLoading={addArticleLoading || deleteArticleLoading}>
      <Box py='2rem' w='100%'>
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
                        <Button
                          colorScheme='red'
                          size='sm'
                          onClick={() => handleDeleteArticle(article._id)}
                        >
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
                <FormLabel htmlFor='tags'>標籤</FormLabel>
                <Input
                  id='tags'
                  placeholder='輸入文章標籤 (用逗號分隔)'
                  value={tags.join(', ')}
                  onChange={(e) =>
                    setTags(e.target.value.split(',').map((tag) => tag.trim()))
                  }
                />
              </FormControl>

              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='readTime'>閱讀時間（分鐘）</FormLabel>
                <Input
                  id='readTime'
                  type='number'
                  value={readTime}
                  onChange={(e) => setReadTime(Number(e.target.value))}
                  placeholder='輸入預估閱讀時間（分鐘）'
                />
              </FormControl>

              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='excerpt'>文章摘要</FormLabel>
                <Input
                  id='excerpt'
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder='輸入文章摘要'
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

              <FormControl display='flex' alignItems='center' mb='1.5rem'>
                <FormLabel htmlFor='isFeatured' mb='0'>
                  設為精選文章
                </FormLabel>
                <Switch
                  id='isFeatured'
                  isChecked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
              </FormControl>

              <FormControl mb='1.5rem'>
                <FormLabel htmlFor='category'>文章類別</FormLabel>
                <Select
                  id='category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value='前端框架'>前端框架</option>
                  <option value='CSS技巧'>CSS技巧</option>
                  <option value='JavaScript進階'>JavaScript進階</option>
                  <option value='性能優化'>性能優化</option>
                  <option value='開發工具'>開發工具</option>
                  <option value='Web安全'>Web安全</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='purple' mr='3' onClick={handleSaveArticle}>
                {isEditing ? '保存修改' : '保存'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </LoadingLayout>
  );
}
