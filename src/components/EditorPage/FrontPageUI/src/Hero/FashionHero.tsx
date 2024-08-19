import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { Component } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import useEditModeNavigation from '@hooks/useEditModeNavigation';
import { updateBlock } from '@reducers/admin/design-pages';
import { uploadImageAsync } from '@reducers/admin/design-pages/actions';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

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
}

const FashionHeroEditor: React.FC<FashionHeroEditorProps> = ({
  index,
  element,
  isEdit,
  onBlur,
}) => {
  const { safeNavigation } = useEditModeNavigation();
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [content, setContent] = useState(element.elements || []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [buttonHref, setButtonHref] = useState(
    content.find((el) => el.tagName === 'button')?.href || '/',
  );
  const [buttonText, setButtonText] = useState(
    content.find((el) => el.tagName === 'button')?.context || '立即選購',
  );

  const handleChange = (elIndex: number, key: string, value: string) => {
    const updatedContent = content.map((item, idx) => {
      if (idx === elIndex) {
        return { ...item, [key]: value };
      }
      return item;
    });

    if (JSON.stringify(updatedContent) !== JSON.stringify(content)) {
      setContent(updatedContent); // 更新本地狀態
      dispatch(
        updateBlock({ index, block: { ...element, elements: updatedContent } }), // 更新Redux狀態
      );
    }
  };

  const uploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    elIndex: number,
    elementId: string,
  ) => {
    const elementUuid = content[elIndex].elementUuid;
    if (!isUploading && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      dispatch(uploadImageAsync({ file, index, elementUuid, elementId }));
    }
  };

  const handleIconClick = (elIndex: number, elementId: string) => {
    const elementUuid = content[elIndex].elementUuid; // 獲取當前元素的 elementUuid
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.dataset.elementUuid = elementUuid; // 保存 elementUuid
      fileInputRef.current.dataset.elementId = elementId; // 保存 elementId
      fileInputRef.current.dataset.elIndex = `${elIndex}`; // 保存 elIndex
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setContent(element.elements || []);
  }, [element.elements]);

  useEffect(() => {
    const buttonElement = content.find((el) => el.tagName === 'button');
    if (buttonElement) {
      setButtonText(buttonElement.context || '立即選購');
      setButtonHref(buttonElement.href || '/');
    }
  }, [content]);

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
    <Box className={`fashion-hero ${element.className}`}>
      <Box className='fashion-hero__container'>
        <Box className='fashion-hero__background'>
          <Image
            src={content.find((el) => el.id === 'background')?.src || ''}
            alt='時尚背景'
            className='fashion-hero__background-img'
            onClick={() =>
              handleIconClick(
                content.findIndex((el) => el.id === 'background'),
                'background',
              )
            }
          />
        </Box>

        <Box className='fashion-hero__content'>
          <Flex className='fashion-hero__main'>
            <Box className='fashion-hero__main-text'>
              <Heading as='h1' size='2xl' className='fashion-hero__heading'>
                {isEdit ? (
                  renderQuillEditor(
                    content.findIndex((el) => el.id === 'heading'),
                    '標題',
                    'fashion-hero__heading-input',
                  )
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        content.find((el) => el.id === 'heading')?.context ||
                        '秋冬 新風尚',
                    }}
                  />
                )}
              </Heading>
              <Box className='fashion-hero__subheading'>
                {isEdit ? (
                  renderQuillEditor(
                    content.findIndex((el) => el.id === 'subheading'),
                    '子標題',
                    'fashion-hero__subheading-input',
                  )
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        content.find((el) => el.id === 'subheading')?.context ||
                        '探索我們的2024秋冬系列，體驗前所未有的時尚魅力。每一件單品都是精心打造的藝術品。',
                    }}
                  />
                )}
              </Box>
              <Flex align='center'>
                {isEdit ? (
                  <Box>
                    <Flex direction='column' alignItems='flex-start'>
                      <Text mb={1}>按鈕文字</Text>
                      <Input
                        size='sm'
                        maxWidth='200px'
                        placeholder='按鈕文字'
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        onBlur={() =>
                          handleChange(
                            content.findIndex((el) => el.id === 'button'),
                            'context',
                            buttonText,
                          )
                        }
                        mb={2}
                      />
                      <Text mb={1}>按鈕路由</Text>
                      <Input
                        size='sm'
                        maxWidth='200px'
                        placeholder='按鈕路由'
                        value={buttonHref}
                        onChange={(e) => setButtonHref(e.target.value)}
                        onBlur={() =>
                          handleChange(
                            content.findIndex((el) => el.id === 'button'),
                            'href',
                            buttonHref,
                          )
                        }
                      />
                    </Flex>
                  </Box>
                ) : (
                  <Button
                    className='fashion-hero__button'
                    onClick={() => {
                      safeNavigation(buttonHref);
                    }}
                  >
                    {buttonText}
                  </Button>
                )}
              </Flex>
            </Box>

            <Box className='fashion-hero__product'>
              <Image
                src={content.find((el) => el.id === 'product')?.src || ''}
                alt='秋冬新品'
                className='fashion-hero__product-img'
                onClick={() =>
                  handleIconClick(
                    content.findIndex((el) => el.id === 'product'),
                    'product',
                  )
                }
              />
              {isEdit && (
                <Input
                  type='file'
                  accept='image/*'
                  onChange={(e) =>
                    uploadImage(
                      e,
                      parseInt(
                        fileInputRef.current?.dataset.elIndex || '0',
                        10,
                      ), // 確保這裡使用正確的 elIndex
                      fileInputRef.current?.dataset.elementId || 'product',
                    )
                  }
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
              )}
            </Box>
          </Flex>
        </Box>

        <Box className='fashion-hero__decor-circle'></Box>
        <Box className='fashion-hero__decor-square'></Box>
        {isEdit && (
          <>
            <Button
              onClick={() =>
                handleIconClick(
                  content.findIndex((el) => el.id === 'background'),
                  'background',
                )
              }
              mt={4}
            >
              編輯背景
            </Button>

            <Input
              type='file'
              accept='image/*'
              onChange={(e) =>
                uploadImage(
                  e,
                  parseInt(fileInputRef.current?.dataset.elIndex || '0', 10),
                  fileInputRef.current?.dataset.elementId || 'background',
                )
              }
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default FashionHeroEditor;
