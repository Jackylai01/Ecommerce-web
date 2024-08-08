import { ArrowRightIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { Component } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import useEditModeNavigation from '@hooks/useEditModeNavigation';
import { updateBlock } from '@reducers/admin/admin-edit-pages';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
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

interface FashionHeroEditorProps {
  index: number;
  element: Component;
  isEdit: boolean;
  onBlur: () => void;
  onImageUpload: (index: number, file: File) => void;
}

const FashionHeroEditor: React.FC<FashionHeroEditorProps> = ({
  index,
  element,
  isEdit,
  onBlur,
  onImageUpload,
}) => {
  const dispatch = useAppDispatch();
  const { safeNavigation } = useEditModeNavigation();
  const [content, setContent] = useState(element.elements || []);
  const [gradientColors, setGradientColors] = useState([
    { color: 'rgba(59, 29, 116, 0.7)', stop: 0 },
    { color: 'rgba(204, 51, 153, 0.6)', stop: 50 },
    { color: 'transparent', stop: 100 },
  ]);
  const [backgroundImage, setBackgroundImage] = useState(
    element.style?.backgroundImage || '',
  );
  const [backgroundOpacity, setBackgroundOpacity] = useState(
    element.style?.backgroundOpacity || 1,
  );
  const [backgroundType, setBackgroundType] = useState('gradient');
  const [backgroundColor, setBackgroundColor] = useState(
    element.style?.backgroundColor || '#ffffff',
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tempBackgroundImage, setTempBackgroundImage] =
    useState(backgroundImage);
  const [tempBackgroundOpacity, setTempBackgroundOpacity] =
    useState(backgroundOpacity);
  const [buttonHref, setButtonHref] = useState(
    content.find((el) => el.tagName === 'button')?.href || '/default-route',
  );
  const [buttonText, setButtonText] = useState(
    content.find((el) => el.tagName === 'button')?.context || '立即選購',
  );
  const [isButtonHrefInputVisible, setIsButtonHrefInputVisible] =
    useState(false);
  const [isButtonTextInputVisible, setIsButtonTextInputVisible] =
    useState(false);

  const handleChange = (elIndex: number, key: string, value: string) => {
    const updatedContent = content.map((item, idx) => {
      if (idx === elIndex) {
        return { ...item, [key]: value };
      }
      return item;
    });

    if (JSON.stringify(updatedContent) !== JSON.stringify(content)) {
      setContent(updatedContent);
      dispatch(
        updateBlock({ index, block: { ...element, elements: updatedContent } }),
      );
    }
  };

  const uploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    elIndex: number,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          const updatedContent = content.map((item, idx) => {
            if (idx === elIndex) {
              return { ...item, src: result as string };
            }
            return item;
          });
          if (JSON.stringify(updatedContent) !== JSON.stringify(content)) {
            setContent(updatedContent);
            dispatch(
              updateBlock({
                index,
                block: { ...element, elements: updatedContent },
              }),
            );
          }
          onImageUpload(index, file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = (elIndex: number) => {
    fileInputRef.current?.click();
    fileInputRef.current?.addEventListener('change', (e) =>
      uploadImage(e as unknown as React.ChangeEvent<HTMLInputElement>, elIndex),
    );
  };

  const handleGradientColorChange = (color: any, index: number) => {
    const updatedGradientColors = [...gradientColors];
    updatedGradientColors[index].color = color.hex;
    setGradientColors(updatedGradientColors);
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setTempBackgroundImage(result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const applyBackgroundChanges = () => {
    let newBackground = '';
    if (backgroundType === 'gradient') {
      newBackground = `linear-gradient(to bottom right, ${gradientColors
        .map((colorStop) => `${colorStop.color} ${colorStop.stop}%`)
        .join(', ')})`;
      setBackgroundImage('');
    } else if (backgroundType === 'color') {
      newBackground = backgroundColor;
      setBackgroundImage('');
    } else if (backgroundType === 'image') {
      newBackground = '';
      setBackgroundImage(tempBackgroundImage);
    }

    setBackgroundOpacity(tempBackgroundOpacity);

    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          style: {
            ...element.style,
            backgroundGradient:
              backgroundType === 'gradient' ? newBackground : '',
            backgroundColor: backgroundType === 'color' ? newBackground : '',
            backgroundImage:
              backgroundType === 'image' ? tempBackgroundImage : '',
            backgroundOpacity:
              backgroundType === 'image' ? tempBackgroundOpacity : 1,
          },
        },
      }),
    );
    onClose();
  };

  useEffect(() => {
    setContent(element.elements || []);
    setGradientColors([
      { color: 'rgba(59, 29, 116, 0.7)', stop: 0 },
      { color: 'rgba(204, 51, 153, 0.6)', stop: 50 },
      { color: 'transparent', stop: 100 },
    ]);
    setBackgroundImage(element.style?.backgroundImage || '');
    setBackgroundOpacity(element.style?.backgroundOpacity || 1);
    setBackgroundColor(element.style?.backgroundColor || '#ffffff');
    setButtonHref(
      content.find((el) => el.tagName === 'button')?.href || '/default-route',
    );
    setButtonText(
      content.find((el) => el.tagName === 'button')?.context || '立即選購',
    );
  }, [element]);

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

  const stripTags = (input: string) => {
    return input.replace(/<\/?[^>]+(>|$)/g, '');
  };

  return (
    <Box className={`fashion-hero ${element.className}`}>
      <Box className='fashion-hero__container'>
        <Box className='fashion-hero__background'>
          {backgroundType === 'image' && (
            <Image
              src={backgroundImage}
              alt='時尚背景'
              className='fashion-hero__background-img'
              style={{ opacity: backgroundOpacity }}
            />
          )}
          {backgroundType === 'gradient' && (
            <Box
              className='fashion-hero__background-gradient'
              style={{
                background: `linear-gradient(to bottom right, ${gradientColors
                  .map((colorStop) => `${colorStop.color} ${colorStop.stop}%`)
                  .join(', ')})`,
              }}
            ></Box>
          )}
          {backgroundType === 'color' && (
            <Box
              className='fashion-hero__background-color'
              style={{ backgroundColor }}
            ></Box>
          )}
        </Box>

        <Box className='fashion-hero__content'>
          <Flex className='fashion-hero__main'>
            <Box className='fashion-hero__main-text'>
              <Heading as='h1' size='2xl' className='fashion-hero__heading'>
                {isEdit
                  ? renderQuillEditor(
                      content.findIndex(
                        (el) => el.className === 'fashion-hero__heading',
                      ),
                      '標題',
                      'fashion-hero__heading-input',
                    )
                  : stripTags(
                      content.find(
                        (el) => el.className === 'fashion-hero__heading',
                      )?.context || '秋冬 新風尚',
                    )}
              </Heading>
              <Box className='fashion-hero__subheading'>
                {isEdit
                  ? renderQuillEditor(
                      content.findIndex(
                        (el) => el.className === 'fashion-hero__subheading',
                      ),
                      '子標題',
                      'fashion-hero__subheading-input',
                    )
                  : stripTags(
                      content.find(
                        (el) => el.className === 'fashion-hero__subheading',
                      )?.context ||
                        '探索我們的2024秋冬系列，體驗前所未有的時尚魅力。每一件單品都是精心打造的藝術品。',
                    )}
              </Box>
              <Flex align='center'>
                <Button
                  className='fashion-hero__button'
                  onClick={safeNavigation(buttonHref)}
                >
                  {buttonText}
                  <ArrowRightIcon className='ml-2' />
                </Button>
                {isEdit && (
                  <IconButton
                    aria-label='Edit button settings'
                    icon={<EditIcon />}
                    ml={2}
                    onClick={() => {
                      setIsButtonHrefInputVisible(!isButtonHrefInputVisible);
                      setIsButtonTextInputVisible(!isButtonTextInputVisible);
                    }}
                  />
                )}
              </Flex>
              {isEdit && isButtonHrefInputVisible && (
                <Input
                  mt={2}
                  placeholder='設定按鈕路由'
                  value={buttonHref}
                  onChange={(e) =>
                    handleChange(
                      content.findIndex(
                        (el) => el.className === 'fashion-hero__button',
                      ),
                      'href',
                      e.target.value,
                    )
                  }
                />
              )}
              {isEdit && isButtonTextInputVisible && (
                <Input
                  mt={2}
                  placeholder='設定按鈕名稱'
                  value={buttonText}
                  onChange={(e) =>
                    handleChange(
                      content.findIndex(
                        (el) => el.className === 'fashion-hero__button',
                      ),
                      'context',
                      e.target.value,
                    )
                  }
                />
              )}
            </Box>

            <Box className='fashion-hero__product'>
              <Image
                src={
                  content.find(
                    (el) => el.className === 'fashion-hero__product-img',
                  )?.src || ''
                }
                alt='秋冬新品'
                className='fashion-hero__product-img'
                onClick={() =>
                  handleIconClick(
                    content.findIndex(
                      (el) => el.className === 'fashion-hero__product-img',
                    ),
                  )
                }
              />
            </Box>
          </Flex>
        </Box>

        <Box className='fashion-hero__decor-circle'></Box>
        <Box className='fashion-hero__decor-square'></Box>

        {isEdit && (
          <Input
            type='file'
            accept='image/*'
            onChange={(e) =>
              uploadImage(
                e,
                content.findIndex(
                  (el) => el.className === 'fashion-hero__background-img',
                ),
              )
            }
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        )}

        {isEdit && (
          <Button onClick={onOpen} mt={4}>
            編輯背景
          </Button>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>編輯背景</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <RadioGroup onChange={setBackgroundType} value={backgroundType}>
                <Stack direction='row'>
                  <Radio value='gradient'>漸層色</Radio>
                  <Radio value='color'>單色</Radio>
                  <Radio value='image'>上傳圖片</Radio>
                </Stack>
              </RadioGroup>
              {backgroundType === 'gradient' &&
                gradientColors.map((colorStop, index) => (
                  <Box key={index} mt={4}>
                    <SketchPicker
                      color={colorStop.color}
                      onChange={(color) =>
                        handleGradientColorChange(color, index)
                      }
                    />
                  </Box>
                ))}
              {backgroundType === 'color' && (
                <Box mt={4}>
                  <SketchPicker
                    color={backgroundColor}
                    onChange={(color) => setBackgroundColor(color.hex)}
                  />
                </Box>
              )}
              {backgroundType === 'image' && (
                <Box mt={4}>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={handleBackgroundImageChange}
                    placeholder='上傳背景圖片'
                  />
                  {tempBackgroundImage && (
                    <>
                      <Image
                        src={tempBackgroundImage}
                        alt='預覽背景圖片'
                        mt={4}
                        boxSize='100%'
                      />
                      <Box mt={4}>
                        <Slider
                          value={tempBackgroundOpacity}
                          min={0}
                          max={1}
                          step={0.01}
                          onChange={setTempBackgroundOpacity}
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </Box>
                    </>
                  )}
                </Box>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' onClick={onClose}>
                取消
              </Button>
              <Button colorScheme='blue' onClick={applyBackgroundChanges}>
                確定
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default FashionHeroEditor;
