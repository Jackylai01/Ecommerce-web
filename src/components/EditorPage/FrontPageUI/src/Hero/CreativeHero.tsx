import {
  Box,
  Button,
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
import { Edit2, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color'; // 引入react-color包

// 動態引入ReactQuill
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

interface CreativeHeroEditorProps {
  index: number;
  element: Component;
  isEdit: boolean;
  onBlur: () => void;
}

const CreativeHeroEditor: React.FC<CreativeHeroEditorProps> = ({
  index,
  element,
  isEdit,
  onBlur,
}) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState(element.elements || []);
  const [buttonText, setButtonText] = useState(
    content.find((el) => el.tagName === 'button')?.context || '開始探索',
  );
  const [buttonHref, setButtonHref] = useState(
    content.find((el) => el.tagName === 'button')?.href || '#',
  );
  const [isHovered, setIsHovered] = useState(false);

  // 單色和漸層控制
  const [backgroundType, setBackgroundType] = useState<'solid' | 'gradient'>(
    element.style?.backgroundGradient ? 'gradient' : 'solid',
  );
  const [backgroundColor, setBackgroundColor] = useState(
    element.style?.backgroundColor || '#ffffff',
  );
  const [gradientStart, setGradientStart] = useState('#6b46c1');
  const [gradientEnd, setGradientEnd] = useState('#2c5282');

  useEffect(() => {
    if (JSON.stringify(element.elements) !== JSON.stringify(content)) {
      setContent(element.elements || []);
    }
  }, [element.elements, content]);

  const handleBackgroundChange = () => {
    const newBackgroundGradient = `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`;
    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          style: {
            ...element.style,
            backgroundColor: backgroundType === 'solid' ? backgroundColor : '',
            backgroundGradient:
              backgroundType === 'gradient' ? newBackgroundGradient : '',
          },
        },
      }),
    );
  };

  const uploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    elIndex: number,
  ) => {
    const elementUuid = content[elIndex].elementUuid;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      dispatch(
        uploadImageAsync({
          file,
          index,
          elementUuid,
          elementId: content[elIndex].id,
        }),
      );
    }
  };

  const handleChange = (elIndex: number, key: string, value: string) => {
    const updatedContent = content.map((item, idx) =>
      idx === elIndex ? { ...item, [key]: value } : item,
    );
    if (JSON.stringify(updatedContent) !== JSON.stringify(content)) {
      setContent(updatedContent);
      dispatch(
        updateBlock({ index, block: { ...element, elements: updatedContent } }),
      );
    }
  };

  const renderQuillEditor = (
    elIndex: number,
    placeholder: string,
    className: string,
  ) => (
    <ReactQuill
      className={className}
      theme='bubble'
      modules={{ toolbar: baseQuillToolbar }}
      placeholder={placeholder}
      value={content[elIndex]?.context || ''}
      onChange={(value) => handleChange(elIndex, 'context', value)}
    />
  );

  return (
    <Box
      className={`creative-hero ${element.className}`}
      bg={backgroundType === 'solid' ? backgroundColor : undefined}
      background={
        backgroundType === 'gradient'
          ? `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`
          : undefined
      }
    >
      <Box className='creative-hero__container'>
        {isEdit && (
          <Box mb={4}>
            <IconButton
              icon={<Edit2 />}
              aria-label='設定背景'
              onClick={onOpen}
              variant='outline'
              zIndex='100'
              position='absolute'
              left='500px'
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
                      onChangeComplete={(color) => {
                        setBackgroundColor(color.hex);
                        handleBackgroundChange();
                      }}
                    />
                  ) : (
                    <Box>
                      <Text>起始顏色</Text>
                      <SketchPicker
                        color={gradientStart}
                        onChangeComplete={(color) => {
                          setGradientStart(color.hex);
                          handleBackgroundChange();
                        }}
                      />
                      <Text>結束顏色</Text>
                      <SketchPicker
                        color={gradientEnd}
                        onChangeComplete={(color) => {
                          setGradientEnd(color.hex);
                          handleBackgroundChange();
                        }}
                      />
                    </Box>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        )}

        {/* 圖片區域 */}
        <Box className='creative-hero__images'>
          {content
            .filter((el) => el.tagName === 'img')
            .map((imgEl, elIndex) => (
              <Box key={elIndex} position='relative'>
                <Image
                  src={imgEl.src || ''}
                  alt={imgEl.alt || ''}
                  className={`${imgEl.className} creative-hero__images-image--${imgEl.id}`}
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                />
                {isEdit && (
                  <Input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => uploadImage(e, elIndex)}
                  />
                )}
              </Box>
            ))}
        </Box>

        {/* 內容區域 */}
        <Box className='creative-hero__content'>
          <Zap className='creative-hero__zap-icon' />

          {/* 標題 */}
          <Box className='creative-hero__content-title'>
            {isEdit ? (
              renderQuillEditor(
                content.findIndex((el) => el.id === 'heading'),
                '輸入標題',
                'creative-hero__content-title-editor',
              )
            ) : (
              <Text
                dangerouslySetInnerHTML={{
                  __html:
                    content.find((el) => el.id === 'heading')?.context ||
                    '創新視界，無限可能',
                }}
              />
            )}
          </Box>

          {/* 副標題 */}
          <Box className='creative-hero__content-subtitle'>
            {isEdit ? (
              renderQuillEditor(
                content.findIndex((el) => el.id === 'subtitle'),
                '輸入副標題',
                'creative-hero__content-subtitle-editor',
              )
            ) : (
              <Text
                dangerouslySetInnerHTML={{
                  __html:
                    content.find((el) => el.id === 'subtitle')?.context ||
                    '我們融合藝術與科技，打造前所未有的數字體驗。讓我們一同探索未來！',
                }}
              />
            )}
          </Box>

          {/* 按鈕 */}
          <Box
            className='creative-hero__button-container'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isEdit ? (
              <Box>
                <Input
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder='編輯按鈕文字'
                  mb={2}
                />
                <Input
                  value={buttonHref}
                  onChange={(e) => setButtonHref(e.target.value)}
                  placeholder='編輯按鈕連結'
                />
              </Box>
            ) : (
              <Button
                className='creative-hero__button'
                onClick={() => (window.location.href = buttonHref)}
              >
                {buttonText}
              </Button>
            )}
            {isHovered && <Box className='creative-hero__hover-effect' />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreativeHeroEditor;
