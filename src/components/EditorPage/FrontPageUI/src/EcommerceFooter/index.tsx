import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Component } from '@fixtures/componentLibrary';
import { updateBlock } from '@reducers/admin/design-pages';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import {
  FaEdit,
  FaFacebookF,
  FaInstagram,
  FaPlus,
  FaTrashAlt,
  FaTwitter,
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const baseQuillToolbar = [
  [{ header: [1, 2, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
  [{ color: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['link'],
  [{ align: [] }],
  ['clean'],
];

interface FooterEditorProps {
  element: Component;
  index: number;
  isEdit: boolean;
  onBlur: () => void;
}

const EcommerceFooter: React.FC<FooterEditorProps> = ({
  element,
  index,
  isEdit,
  onBlur,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedLink, setEditedLink] = useState<string>('');
  const [editedText, setEditedText] = useState<string>('');
  const [content, setContent] = useState(element.elements || []);

  // 初次渲染時初始化 content，避免重複設置
  useEffect(() => {
    if (!content.length && element.elements) {
      setContent(element.elements);
    }
  }, [element.elements]);

  const handleEditClick = (section: string, text: string, link: string) => {
    setEditingSection(section);
    setEditedText(text);
    setEditedLink(link);
    onOpen();
  };

  const handleAddItem = (sectionIndex: number) => {
    const updatedContent = content.map((section, idx) => {
      if (idx === sectionIndex) {
        return {
          ...section,
          elements: [
            ...(section.elements || []),
            {
              id: `new-item-${Math.random()}`,
              tagName: 'a',
              context: '新項目',
              href: '#',
              className: 'ecommerce-footer__link',
            },
          ],
        };
      }
      return section;
    });
    setContent(updatedContent);
    dispatch(
      updateBlock({ index, block: { ...element, elements: updatedContent } }),
    ); // 更新 Redux 狀態
  };

  const handleRemoveItem = (sectionIndex: number, itemIndex: number) => {
    const updatedContent = content.map((section, idx) => {
      if (idx === sectionIndex) {
        const updatedElements = [...(section.elements || [])];
        updatedElements.splice(itemIndex, 1);
        return { ...section, elements: updatedElements };
      }
      return section;
    });
    setContent(updatedContent);
    dispatch(
      updateBlock({ index, block: { ...element, elements: updatedContent } }),
    ); // 更新 Redux 狀態
  };

  const saveEdits = () => {
    console.log('新連結文字:', editedText);
    console.log('新連結網址:', editedLink);
    onClose();
  };

  const handleQuillChange = (
    value: string,
    sectionIndex: number,
    itemIndex: number,
  ) => {
    const currentContext =
      content[sectionIndex]?.elements?.[itemIndex]?.context;
    if (currentContext !== value) {
      const updatedContent = content.map((section, idx) => {
        if (idx === sectionIndex) {
          const updatedElements = [...(section.elements || [])];
          updatedElements[itemIndex] = {
            ...updatedElements[itemIndex],
            context: value,
          };
          return { ...section, elements: updatedElements };
        }
        return section;
      });
      setContent(updatedContent);
      dispatch(
        updateBlock({ index, block: { ...element, elements: updatedContent } }),
      ); // 更新 Redux 狀態
    }
  };

  return (
    <Box
      as='footer'
      className={element.className || 'ecommerce-footer'}
      bgGradient={
        element.style?.backgroundGradient || 'linear(to-r, gray.700, gray.900)'
      }
      color='white'
    >
      <Container
        className='ecommerce-footer__container'
        maxW='container.lg'
        py={8}
      >
        <Flex className='ecommerce-footer__sections' justify='space-between'>
          {content.map((section, sectionIndex) => (
            <Box
              className={section.className || 'ecommerce-footer__section'}
              key={sectionIndex}
            >
              {section.elements?.map((item, itemIndex) => (
                <Box key={itemIndex} position='relative'>
                  {item.tagName === 'h3' ? (
                    <Heading
                      className={item.className || 'ecommerce-footer__title'}
                      size='md'
                    >
                      {item.context}
                      {isEdit && (
                        <IconButton
                          icon={<FaEdit />}
                          aria-label={`Edit ${item.context}`}
                          variant='ghost'
                          colorScheme='teal'
                          size='sm'
                          ml={2}
                          onClick={() =>
                            handleEditClick(
                              section.id || '',
                              item.context || '',
                              item.href || '',
                            )
                          }
                        />
                      )}
                    </Heading>
                  ) : item.tagName === 'a' ? (
                    <Box as='li'>
                      {isEdit ? (
                        <>
                          <ReactQuill
                            theme='bubble'
                            modules={{ toolbar: baseQuillToolbar }}
                            value={item.context || ''}
                            onChange={(value) =>
                              handleQuillChange(value, sectionIndex, itemIndex)
                            }
                          />
                          <IconButton
                            icon={<FaTrashAlt />}
                            aria-label='Remove item'
                            variant='ghost'
                            colorScheme='red'
                            size='sm'
                            position='absolute'
                            top={0}
                            right={0}
                            onClick={() =>
                              handleRemoveItem(sectionIndex, itemIndex)
                            }
                          />
                        </>
                      ) : (
                        <Box
                          dangerouslySetInnerHTML={{
                            __html: item.context || '',
                          }}
                        />
                      )}
                    </Box>
                  ) : null}
                </Box>
              ))}
              {isEdit && (
                <IconButton
                  icon={<FaPlus />}
                  aria-label='Add item'
                  variant='outline'
                  colorScheme='teal'
                  size='sm'
                  onClick={() => handleAddItem(sectionIndex)}
                  mt={2}
                />
              )}
            </Box>
          ))}

          <Box className='ecommerce-footer__social'>
            <Heading className='ecommerce-footer__title' size='md'>
              關注我們
            </Heading>
            <Flex className='ecommerce-footer__social-icons' gap={4}>
              <IconButton
                as='a'
                href='#'
                aria-label='Facebook'
                icon={<FaFacebookF />}
              />
              <IconButton
                as='a'
                href='#'
                aria-label='Instagram'
                icon={<FaInstagram />}
              />
              <IconButton
                as='a'
                href='#'
                aria-label='Twitter'
                icon={<FaTwitter />}
              />
            </Flex>
          </Box>
        </Flex>

        <Box className='ecommerce-footer__copyright' textAlign='center' mt={8}>
          &copy; 2024 您的電商網站名稱. 保留所有權利。
        </Box>

        {/* 編輯彈窗 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>編輯 {editingSection}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Input
                  placeholder='修改連結文字'
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  mb={4}
                />
                <Input
                  placeholder='修改連結網址'
                  value={editedLink}
                  onChange={(e) => setEditedLink(e.target.value)}
                />
              </Box>
              <Button colorScheme='teal' mt={4} onClick={saveEdits}>
                保存
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default EcommerceFooter;
