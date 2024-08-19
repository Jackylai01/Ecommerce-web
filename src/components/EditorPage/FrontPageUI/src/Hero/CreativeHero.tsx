import {
  Box,
  Button,
  IconButton,
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
import { Edit2, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
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

interface CreativeHeroEditorProps {
  index: number;
  element: Component;
  isEdit: boolean;
  onBlur: () => void;
}

const parseGradient = (gradient: string) => {
  const regex = /linear-gradient\(to right, ([^,]+), ([^)]+)\)/;
  const match = gradient.match(regex);
  return match ? [match[1].trim(), match[2].trim()] : ['#6b46c1', '#2c5282'];
};

const CreativeHeroEditor: React.FC<CreativeHeroEditorProps> = ({
  index,
  element,
  isEdit,
  onBlur,
}) => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState(element.elements || []);
  const [buttonText, setButtonText] = useState(
    content.find((el) => el.tagName === 'button')?.context || '開始探索',
  );
  const [buttonHref, setButtonHref] = useState(
    content.find((el) => el.tagName === 'button')?.href || '#',
  );
  const [isHovered, setIsHovered] = useState(false);

  const [backgroundType, setBackgroundType] = useState<'solid' | 'gradient'>(
    element.style?.backgroundGradient ? 'gradient' : 'solid',
  );
  const [backgroundColor, setBackgroundColor] = useState(
    element.style?.backgroundColor || '#ffffff',
  );

  // Initialize gradient values by parsing the existing backgroundGradient
  const initialGradient = element.style?.backgroundGradient
    ? parseGradient(element.style.backgroundGradient)
    : ['#6b46c1', '#2c5282'];
  const [gradientStart, setGradientStart] = useState(initialGradient[0]);
  const [gradientEnd, setGradientEnd] = useState(initialGradient[1]);

  useEffect(() => {
    if (JSON.stringify(element.elements) !== JSON.stringify(content)) {
      setContent(element.elements || []);
    }
  }, [element.elements, content]);

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
      style={{
        background:
          backgroundType === 'gradient'
            ? `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`
            : backgroundColor,
      }}
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
                  {/* 確認按鈕 */}
                  <Button mt={4} onClick={handleBackgroundSave}>
                    確認
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        )}

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
