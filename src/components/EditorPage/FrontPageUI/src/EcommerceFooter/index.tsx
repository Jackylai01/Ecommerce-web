import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
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
import { mediaIconsMap } from '@fixtures/icons';
import { updateBlock } from '@reducers/admin/design-pages';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
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

interface IconTextBlock {
  id: string;
  icon: keyof typeof mediaIconsMap;
  href: string;
  alt: string;
}

const EcommerceFooter: React.FC<FooterEditorProps> = ({
  element,
  index,
  isEdit,
  onBlur,
}) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState(element.elements || []);

  const [iconTextBlocks, setIconTextBlocks] = useState<any>(
    content.find((el) => el.id === 'social-media')?.elements || [],
  );

  const [editingBlock, setEditingBlock] = useState<IconTextBlock | null>(null);

  const {
    isOpen: isIconOpen,
    onOpen: onIconOpen,
    onClose: onIconClose,
  } = useDisclosure();

  useEffect(() => {
    if (!content.length && element.elements) {
      setContent(element.elements);
    }
  }, [element.elements]);

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

  const handleRemoveIconBlock = (iconId: string) => {
    const updatedIconTextBlocks = iconTextBlocks.filter(
      (block: any) => block.id !== iconId,
    );
    setIconTextBlocks(updatedIconTextBlocks);

    const updatedElements = content.map((el) =>
      el.id === 'social-media'
        ? { ...el, elements: updatedIconTextBlocks }
        : el,
    );

    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          elements: updatedElements,
        },
      }),
    );
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

  const handleEditBlock = (block: IconTextBlock) => {
    setEditingBlock(block);
    onIconOpen(); // 打開編輯彈窗
  };

  const handleSaveBlock = () => {
    if (editingBlock) {
      const updatedIconTextBlocks = iconTextBlocks.map((block: any) =>
        block.id === editingBlock.id
          ? { ...block, icon: editingBlock.icon, href: editingBlock.href }
          : block,
      );
      setIconTextBlocks(updatedIconTextBlocks);

      const updatedElements = content.map((el) =>
        el.id === 'social-media'
          ? { ...el, elements: updatedIconTextBlocks }
          : el,
      );

      dispatch(
        updateBlock({
          index,
          block: {
            ...element,
            elements: updatedElements,
          },
        }),
      );

      setEditingBlock(null);
      onIconClose(); // 關閉彈窗
    }
  };

  const handleAddSocialIcon = () => {
    const newIconBlock = {
      id: `icon-${Math.random()}`,
      icon: 'FaFacebook',
      href: '#',
      alt: 'Facebook',
    };

    const existingElements = element.elements || [];

    setIconTextBlocks((prev: any) => [...prev, newIconBlock]);

    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          elements: [
            ...existingElements.filter((el: any) => el.id !== 'social-media'),
            {
              id: 'social-media',
              tagName: 'section',
              className: 'ecommerce-footer__social',
              elements: [...iconTextBlocks, newIconBlock],
            },
          ],
        },
      }),
    );
  };

  return (
    <Box
      as='footer'
      className={element.className || 'ecommerce-footer'}
      bgGradient={
        element.style?.backgroundGradient || 'linear(to-r, gray.700, gray.900)'
      }
    >
      <Container maxW='container.lg' py={8}>
        <Flex justify='space-between'>
          {content.map((section, sectionIndex) => (
            <Box key={sectionIndex}>
              {section.elements?.map((item, itemIndex) => (
                <Box key={itemIndex} position='relative'>
                  {item.tagName === 'h3' ? (
                    <Heading size='md'>{item.context}</Heading>
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
          <Grid
            templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }}
            gap={4}
          >
            {iconTextBlocks?.map((block: any) => (
              <Flex
                key={block.id}
                className='socks-subscription__icon-text'
                cursor={isEdit ? 'pointer' : 'default'}
              >
                <a href={block.href} target='_blank' rel='noopener noreferrer'>
                  <Icon
                    as={mediaIconsMap[block.icon]}
                    className='socks-subscription__icon'
                    boxSize={6}
                  />
                </a>
                {isEdit && (
                  <IconButton
                    icon={<FaTrashAlt />}
                    aria-label='Remove icon'
                    variant='ghost'
                    colorScheme='red'
                    size='sm'
                    position='absolute'
                    top={-1}
                    right={-1}
                    onClick={() => handleRemoveIconBlock(block.id)}
                  />
                )}
                {isEdit && (
                  <Button
                    onClick={() => handleEditBlock(block)}
                    size='sm'
                    ml={2}
                  >
                    Edit
                  </Button>
                )}
              </Flex>
            ))}
          </Grid>
        </Flex>

        {isEdit && (
          <>
            <Button onClick={handleAddSocialIcon} leftIcon={<FaPlus />}>
              Add Social Icon
            </Button>
            {editingBlock && (
              <Modal isOpen={isIconOpen} onClose={onIconClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Social Icon</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Grid templateColumns='repeat(4, 1fr)' gap={2}>
                      {Object.keys(mediaIconsMap).map((iconKey) => (
                        <Button
                          key={iconKey}
                          onClick={() =>
                            setEditingBlock({
                              ...editingBlock,
                              icon: iconKey,
                            })
                          }
                        >
                          <Icon as={mediaIconsMap[iconKey]} />
                        </Button>
                      ))}
                    </Grid>
                    <Box mt={4}>
                      <Input
                        placeholder='Enter URL'
                        value={editingBlock.href}
                        onChange={(e) =>
                          setEditingBlock({
                            ...editingBlock,
                            href: e.target.value,
                          })
                        }
                      />
                    </Box>
                    <Button mt={4} colorScheme='blue' onClick={handleSaveBlock}>
                      Save
                    </Button>
                  </ModalBody>
                </ModalContent>
              </Modal>
            )}
          </>
        )}
        <Box className='ecommerce-footer__copyright' textAlign='center' mt={8}>
          &copy; 2024 您的電商網站名稱. 保留所有權利。
        </Box>
      </Container>
    </Box>
  );
};

export default EcommerceFooter;
