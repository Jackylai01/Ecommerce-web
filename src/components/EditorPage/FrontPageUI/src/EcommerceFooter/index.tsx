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
import { baseQuillToolbar } from '@fixtures/quill-configs';
import { parseGradient } from '@helpers/gradient';
import { updateBlock } from '@reducers/admin/design-pages';
import { Edit2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isIconOpen,
    onOpen: onIconOpen,
    onClose: onIconClose,
  } = useDisclosure();

  const [backgroundType, setBackgroundType] = useState<'solid' | 'gradient'>(
    element.style?.backgroundGradient ? 'gradient' : 'solid',
  );
  const [backgroundColor, setBackgroundColor] = useState(
    element.style?.backgroundColor || '#ffffff',
  );

  const initialGradient = element.style?.backgroundGradient
    ? parseGradient(element.style.backgroundGradient)
    : ['#fbbf24', '#f97316'];

  const [gradientStart, setGradientStart] = useState(initialGradient[0]);
  const [gradientEnd, setGradientEnd] = useState(initialGradient[1]);

  const [content, setContent] = useState(element.elements || []);

  const [copyright, setCopyright] = useState<any>(
    content.find((ml) => ml.id === 'copyright')?.context || [],
  );

  const [iconTextBlocks, setIconTextBlocks] = useState<any>(
    content.find((el) => el.id === 'social-media')?.elements || [],
  );

  const [editingBlock, setEditingBlock] = useState<IconTextBlock | null>(null);

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

  const handleQuillCopyrightChange = (value: string) => {
    // 更新本地狀態
    setCopyright(value);

    // 更新 Redux 中的 state
    const updatedContent = content.map((section) => {
      if (section.id === 'copyright') {
        return {
          ...section,
          context: value, // 更新 copyright section 的 context
        };
      }
      return section;
    });

    setContent(updatedContent);

    // 將更新發送到 Redux
    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          elements: updatedContent,
        },
      }),
    );
  };

  const handleBackgroundChange = (
    type: 'solid' | 'gradient',
    color: string,
  ) => {
    if (type === 'solid') {
      setBackgroundColor(color);
      dispatch(
        updateBlock({
          index,
          block: {
            ...element,
            style: {
              ...element.style,
              backgroundColor: color,
              backgroundGradient: '', // 清除漸層背景
            },
          },
        }),
      );
    } else if (type === 'gradient') {
      const newGradient = `linear-gradient(to right, ${gradientStart}, ${color})`;
      setGradientEnd(color);

      dispatch(
        updateBlock({
          index,
          block: {
            ...element,
            style: {
              ...element.style,
              backgroundGradient: newGradient,
              backgroundColor: '',
            },
          },
        }),
      );
    }
  };

  const handleBackgroundSave = () => {
    if (backgroundType === 'solid') {
      dispatch(
        updateBlock({
          index,
          block: {
            ...element,
            style: {
              ...element.style,
              backgroundColor,
              backgroundGradient: '', // 清除漸層背景
            },
          },
        }),
      );
    } else if (backgroundType === 'gradient') {
      const newBackgroundGradient = `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`;

      dispatch(
        updateBlock({
          index,
          block: {
            ...element,
            style: {
              ...element.style,
              backgroundColor: '', // 清除單色背景
              backgroundGradient: newBackgroundGradient,
            },
          },
        }),
      );
    }
    onClose(); // 關閉彈窗
  };

  return (
    <Box
      as='footer'
      className={element.className || 'ecommerce-footer'}
      style={{
        background:
          backgroundType === 'gradient'
            ? `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`
            : backgroundColor,
      }}
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

            <IconButton
              icon={<Edit2 />}
              aria-label='設定背景'
              onClick={onOpen}
              variant='outline'
              zIndex='100'
              position='absolute'
              left='100px'
              top='10%'
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay backgroundColor='rgba(0, 0, 0, 0)' />
              <ModalContent>
                <ModalHeader>設定背景</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box display='flex' mb={2}>
                    <Button
                      mr={2}
                      onClick={() => setBackgroundType('solid')}
                      isActive={backgroundType === 'solid'}
                    >
                      單色
                    </Button>
                    <Button
                      onClick={() => setBackgroundType('gradient')}
                      isActive={backgroundType === 'gradient'}
                    >
                      漸層
                    </Button>
                  </Box>
                  {backgroundType === 'solid' ? (
                    <Box
                      style={{
                        transform: 'scale(0.75)',
                        transformOrigin: 'top left',
                      }}
                    >
                      <SketchPicker
                        color={backgroundColor}
                        onChangeComplete={(color) =>
                          handleBackgroundChange('solid', color.hex)
                        }
                      />
                    </Box>
                  ) : (
                    <Flex justify='space-between'>
                      <Box>
                        <Box mb={2}>起始顏色</Box>
                        <Box
                          style={{
                            transform: 'scale(0.75)',
                            transformOrigin: 'top left',
                          }}
                        >
                          <SketchPicker
                            color={gradientStart}
                            onChangeComplete={(color) =>
                              setGradientStart(color.hex)
                            }
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Box mb={2}>結束顏色</Box>
                        <Box
                          style={{
                            transform: 'scale(0.75)',
                            transformOrigin: 'top left',
                          }}
                        >
                          <SketchPicker
                            color={gradientEnd}
                            onChangeComplete={(color) =>
                              handleBackgroundChange('gradient', color.hex)
                            }
                          />
                        </Box>
                      </Box>
                    </Flex>
                  )}
                  <Button mt={4} onClick={handleBackgroundSave}>
                    確認
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )}

        <Box>
          {isEdit ? (
            <ReactQuill
              theme='bubble'
              modules={{ toolbar: baseQuillToolbar }}
              value={copyright}
              onChange={handleQuillCopyrightChange}
            />
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: copyright || '',
              }}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default EcommerceFooter;
