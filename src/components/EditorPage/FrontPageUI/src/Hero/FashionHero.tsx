import { Box, Button, Flex, Heading, Image, Input } from '@chakra-ui/react';
import { Component } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import useEditModeNavigation from '@hooks/useEditModeNavigation';
import { updateBlock } from '@reducers/admin/admin-edit-pages';
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
  onImageUpload: (index: number, file: File, elementId: string) => void;
}

const FashionHeroEditor: React.FC<FashionHeroEditorProps> = ({
  index,
  element,
  isEdit,
  onBlur,
  onImageUpload,
}) => {
  const { safeNavigation } = useEditModeNavigation();
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [content, setContent] = useState(element.elements || []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [buttonHref, setButtonHref] = useState(
    content.find((el) => el.tagName === 'button')?.href || '/',
  );

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
    elementId: string,
  ) => {
    if (!isUploading && e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      onImageUpload(elIndex, file, elementId);
      setIsUploading(false);
    }
  };

  const handleIconClick = (elIndex: number, elementId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 重置 input 值以允許同一個檔案再次上傳
      fileInputRef.current.dataset.elementId = elementId; // 將 elementId 儲存在 dataset 中
      fileInputRef.current.dataset.elIndex = elIndex.toString(); // 將 elIndex 儲存在 dataset 中
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setContent(element.elements || []);
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
          {isEdit && (
            <Input
              type='file'
              accept='image/*'
              onChange={(e) =>
                uploadImage(
                  e,
                  parseInt(fileInputRef.current?.dataset.elIndex || '0', 10), // 確保這裡使用正確的 elIndex
                  fileInputRef.current?.dataset.elementId || 'background', // 確保這裡使用正確的 elementId
                )
              }
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          )}
        </Box>

        <Box className='fashion-hero__content'>
          <Flex className='fashion-hero__main'>
            <Box className='fashion-hero__main-text'>
              <Heading as='h1' size='2xl' className='fashion-hero__heading'>
                {isEdit
                  ? renderQuillEditor(
                      content.findIndex((el) => el.id === 'heading'),
                      '標題',
                      'fashion-hero__heading-input',
                    )
                  : stripTags(
                      content.find((el) => el.id === 'heading')?.context ||
                        '秋冬 新風尚',
                    )}
              </Heading>
              <Box className='fashion-hero__subheading'>
                {isEdit
                  ? renderQuillEditor(
                      content.findIndex((el) => el.id === 'subheading'),
                      '子標題',
                      'fashion-hero__subheading-input',
                    )
                  : stripTags(
                      content.find((el) => el.id === 'subheading')?.context ||
                        '探索我們的2024秋冬系列，體驗前所未有的時尚魅力。每一件單品都是精心打造的藝術品。',
                    )}
              </Box>
              <Flex align='center'>
                <Button
                  className='fashion-hero__button'
                  onClick={() => {
                    safeNavigation(buttonHref);
                  }}
                >
                  {content.find((el) => el.id === 'button')?.context ||
                    '立即選購'}
                </Button>
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
            </Box>
          </Flex>
        </Box>

        <Box className='fashion-hero__decor-circle'></Box>
        <Box className='fashion-hero__decor-square'></Box>

        {isEdit && (
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
        )}
      </Box>
    </Box>
  );
};

export default FashionHeroEditor;
