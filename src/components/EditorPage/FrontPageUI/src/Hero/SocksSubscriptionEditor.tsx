import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Component } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import { updateBlock } from '@reducers/admin/design-pages';
import { uploadImageAsync } from '@reducers/admin/design-pages/actions';
import { Edit2, Package, PhoneCall, RefreshCcw, Truck } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';

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

interface SocksSubscriptionEditorProps {
  index: number;
  element: Component;
  isEdit: boolean;
  onBlur: () => void;
}

interface IconTextBlock {
  id: string;
  icon: any;
  text: string;
}

const icons = [
  { label: 'Truck', icon: Truck },
  { label: 'PhoneCall', icon: PhoneCall },
  { label: 'RefreshCcw', icon: RefreshCcw },
  { label: 'Package', icon: Package },
];

const parseGradient = (gradient: string) => {
  const regex = /linear-gradient\(to right, ([^,]+), ([^)]+)\)/;
  const match = gradient.match(regex);
  return match ? [match[1].trim(), match[2].trim()] : ['#fbbf24', '#f97316'];
};

const SocksSubscriptionEditor: React.FC<SocksSubscriptionEditorProps> = ({
  index,
  element,
  isEdit,
  onBlur,
}) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isIconOpen,
    onOpen: onIconOpen,
    onClose: onIconClose,
  } = useDisclosure();
  const [content, setContent] = useState(element.elements || []);
  const [buttonText, setButtonText] = useState(
    content.find((el) => el.tagName === 'button')?.context || 'Subscribe Now',
  );
  const [buttonHref, setButtonHref] = useState(
    content.find((el) => el.tagName === 'button')?.href || '#',
  );

  const [backgroundType, setBackgroundType] = useState<'solid' | 'gradient'>(
    element.style?.backgroundGradient ? 'gradient' : 'solid',
  );
  const [backgroundColor, setBackgroundColor] = useState(
    element.style?.backgroundColor || '#ffffff',
  );

  const [editingBlock, setEditingBlock] = useState<IconTextBlock | null>(null);
  const [blocks, setBlocks] = useState<IconTextBlock[]>([
    { id: '1', icon: Truck, text: 'Free Shipping' },
    { id: '2', icon: PhoneCall, text: 'Support 24/7' },
    { id: '3', icon: RefreshCcw, text: 'Money return' },
    { id: '4', icon: Package, text: 'Order Discounts' },
  ]);

  const initialGradient = element.style?.backgroundGradient
    ? parseGradient(element.style.backgroundGradient)
    : ['#fbbf24', '#f97316'];
  const [gradientStart, setGradientStart] = useState(initialGradient[0]);
  const [gradientEnd, setGradientEnd] = useState(initialGradient[1]);

  useEffect(() => {
    if (JSON.stringify(element.elements) !== JSON.stringify(content)) {
      setContent(element.elements || []);
    }
  }, [element.elements, content]);

  useEffect(() => {
    if (isEdit && content.length === 0) {
      setContent(element.elements || []);
    }
  }, [element.elements, isEdit, content]);

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

  const uploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    elementId: string,
  ) => {
    const elementUuid = content.find((el) => el.id === elementId)?.elementUuid;
    if (e.target.files && e.target.files[0] && elementUuid) {
      const file = e.target.files[0];
      dispatch(uploadImageAsync({ file, index, elementUuid, elementId }));
    }
  };

  const handleIconClick = (elementId: any) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.dataset.elementId = elementId;
      fileInputRef.current.click();
    }
  };
  const handleChange = (elIndex: number, key: string, value: string) => {
    const updatedContent = content.map((item, idx) =>
      idx === elIndex ? { ...item, [key]: value } : item,
    );
    if (JSON.stringify(updatedContent) !== JSON.stringify(content)) {
      setContent(updatedContent);
      dispatch(
        updateBlock({
          index,
          block: { ...element, elements: updatedContent },
        }),
      );
    }
  };

  const handleEditBlock = (block: IconTextBlock) => {
    setEditingBlock(block);
    onIconOpen();
  };

  const handleSaveBlock = () => {
    if (editingBlock) {
      setBlocks((prevBlocks) =>
        prevBlocks.map((block) =>
          block.id === editingBlock.id ? editingBlock : block,
        ),
      );
    }
    onIconClose();
  };

  const handleButtonTextChange = (value: string) => {
    setButtonText(value);
    handleChange(
      content.findIndex((el) => el.tagName === 'button'),
      'context',
      value,
    );
  };

  const handleButtonHrefChange = (value: string) => {
    setButtonHref(value);
    handleChange(
      content.findIndex((el) => el.tagName === 'button'),
      'href',
      value,
    );
  };

  return (
    <Box
      className={`socks-subscription ${element.className}`}
      style={{
        background:
          backgroundType === 'gradient'
            ? `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`
            : backgroundColor,
      }}
    >
      <Box className='socks-subscription__container'>
        <Flex className='socks-subscription__flex'>
          <Box className='socks-subscription__content'>
            {isEdit ? (
              <>
                <Heading className='socks-subscription__heading'>
                  <ReactQuill
                    theme='bubble'
                    value={
                      content.find((el) => el.id === 'heading')?.context || ''
                    }
                    onChange={(value) =>
                      handleChange(
                        content.findIndex((el) => el.id === 'heading'),
                        'context',
                        value,
                      )
                    }
                  />
                </Heading>
                <Text className='socks-subscription__subtitle'>
                  <ReactQuill
                    theme='bubble'
                    value={
                      content.find((el) => el.id === 'subtitle')?.context || ''
                    }
                    onChange={(value) =>
                      handleChange(
                        content.findIndex((el) => el.id === 'subtitle'),
                        'context',
                        value,
                      )
                    }
                  />
                </Text>
                <Input
                  value={buttonText}
                  onChange={(e) => handleButtonTextChange(e.target.value)}
                  placeholder='按鈕名稱'
                  w='50%'
                />
                <Input
                  value={buttonHref}
                  onChange={(e) => handleButtonHrefChange(e.target.value)}
                  placeholder='按鈕連結'
                  w='50%'
                />
                <IconButton
                  icon={<Edit2 />}
                  aria-label='設定背景'
                  onClick={onOpen}
                  variant='outline'
                  zIndex='100'
                  position='absolute'
                  left='500px'
                  top='10%'
                />
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
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
                        <SketchPicker
                          color={backgroundColor}
                          onChangeComplete={(color) =>
                            handleBackgroundChange('solid', color.hex)
                          }
                        />
                      ) : (
                        <Box>
                          <Text>起始顏色</Text>
                          <SketchPicker
                            color={gradientStart}
                            onChangeComplete={(color) =>
                              setGradientStart(color.hex)
                            }
                          />
                          <Text>結束顏色</Text>
                          <SketchPicker
                            color={gradientEnd}
                            onChangeComplete={(color) =>
                              handleBackgroundChange('gradient', color.hex)
                            }
                          />
                        </Box>
                      )}

                      <Button mt={4} onClick={handleBackgroundSave}>
                        確認
                      </Button>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </>
            ) : (
              <>
                <Heading className='socks-subscription__heading'>
                  <Box
                    as='span'
                    dangerouslySetInnerHTML={{
                      __html:
                        content.find((el) => el.id === 'heading')?.context ||
                        'Fresh Socks Delivered Monthly, Right to Your Doorstep!',
                    }}
                  />
                </Heading>
                <Text className='socks-subscription__subtitle'>
                  <Box
                    as='span'
                    dangerouslySetInnerHTML={{
                      __html:
                        content.find((el) => el.id === 'subtitle')?.context ||
                        'Receive two pairs of stylish, high-quality socks delivered to your door every month.',
                    }}
                  />
                </Text>
              </>
            )}
            {/* 按鈕 */}
            <Button
              className='socks-subscription__button'
              onClick={() => (window.location.href = buttonHref)}
            >
              {buttonText} →
            </Button>
          </Box>

          <Box className='socks-subscription__image-container'>
            {content
              .filter((el) => el.tagName === 'img')
              .map((imgEl) => (
                <Box key={imgEl.id} position='relative'>
                  <Image
                    src={content.find((el) => el.id === 'image')?.src || ''}
                    alt={content.find((el) => el.id === 'image')?.alt || ''}
                    className={`${imgEl.className} socks-subscription__image`}
                    onClick={() => handleIconClick(imgEl.id)}
                  />
                  {isEdit && (
                    <Input
                      type='file'
                      accept='image/*'
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) =>
                        uploadImage(
                          e,
                          fileInputRef.current?.dataset.elementId || '',
                        )
                      }
                    />
                  )}
                </Box>
              ))}
          </Box>
        </Flex>

        <Grid className='socks-subscription__grid'>
          {blocks.map((block) => (
            <Flex
              key={block.id}
              className='socks-subscription__icon-text'
              onClick={() => handleEditBlock(block)}
              cursor='pointer'
            >
              <Icon as={block.icon} className='socks-subscription__icon' />
              <Text className='socks-subscription__text'>{block.text}</Text>
            </Flex>
          ))}
        </Grid>

        {/* 編輯彈窗 */}
        <Modal isOpen={isIconOpen} onClose={onIconClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>編輯區塊</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {editingBlock && (
                <>
                  <Text mb={2}>選擇圖標</Text>
                  <Grid templateColumns='repeat(4, 1fr)' gap={2}>
                    {icons.map((iconOption) => (
                      <Button
                        key={iconOption.label}
                        onClick={() =>
                          setEditingBlock({
                            ...editingBlock,
                            icon: iconOption.icon,
                          })
                        }
                      >
                        <Icon as={iconOption.icon} />
                      </Button>
                    ))}
                  </Grid>

                  <Text mt={4} mb={2}>
                    編輯文字
                  </Text>
                  <Input
                    value={editingBlock.text}
                    onChange={(e) =>
                      setEditingBlock({
                        ...editingBlock,
                        text: e.target.value,
                      })
                    }
                  />

                  <Button mt={4} colorScheme='blue' onClick={handleSaveBlock}>
                    保存
                  </Button>
                </>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default SocksSubscriptionEditor;
