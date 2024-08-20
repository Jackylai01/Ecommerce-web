import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
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

  const handleEditBlock = (block: any) => {
    setEditingBlock(block);
    onIconOpen();
  };

  // 初次渲染時初始化 content，避免重複設置
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

  const handleSaveBlock = () => {
    if (editingBlock) {
      // 更新本地的 iconTextBlocks 狀態
      const updatedIconTextBlocks = iconTextBlocks.map((block: any) =>
        block.id === editingBlock.id
          ? {
              ...block,
              icon: editingBlock.icon,
            }
          : block,
      );
      setIconTextBlocks(updatedIconTextBlocks);

      // 更新 Redux store 中的 block 狀態
      const updatedElements = content.map((el) =>
        el.id === 'icon-text-blocks'
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
      onIconClose();
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

          <Grid className='socks-subscription__grid'>
            {iconTextBlocks?.map((block: any) => (
              <Flex
                key={block.id}
                className='socks-subscription__icon-text'
                onClick={() => isEdit && handleEditBlock(block)}
                cursor={isEdit ? 'pointer' : 'default'}
              >
                <Icon
                  as={mediaIconsMap[block.icon]}
                  className='socks-subscription__icon'
                />
              </Flex>
            ))}
          </Grid>
        </Flex>

        {isEdit && editingBlock && (
          <Modal isOpen={isIconOpen} onClose={onIconClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>編輯區塊</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box>選擇圖標</Box>
                <Grid templateColumns='repeat(4, 1fr)' gap={2}>
                  {Object.keys(mediaIconsMap).map((iconKey) => (
                    <Button
                      key={iconKey}
                      onClick={() =>
                        setEditingBlock({ ...editingBlock, icon: iconKey })
                      }
                    >
                      <Icon as={mediaIconsMap[iconKey]} />
                    </Button>
                  ))}
                </Grid>
                <Button mt={4} colorScheme='blue' onClick={handleSaveBlock}>
                  保存
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        <Box className='ecommerce-footer__copyright' textAlign='center' mt={8}>
          &copy; 2024 您的電商網站名稱. 保留所有權利。
        </Box>
      </Container>
    </Box>
  );
};

export default EcommerceFooter;
