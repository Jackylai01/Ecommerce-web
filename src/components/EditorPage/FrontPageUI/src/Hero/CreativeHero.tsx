import { Box, Button, Image, Input, Text } from '@chakra-ui/react';
import { Component } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import { updateBlock } from '@reducers/admin/design-pages';
import { uploadImageAsync } from '@reducers/admin/design-pages/actions';
import { Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

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
  const [content, setContent] = useState(element.elements || []);
  const [buttonText, setButtonText] = useState(
    content.find((el) => el.tagName === 'button')?.context || '開始探索',
  );
  const [buttonHref, setButtonHref] = useState(
    content.find((el) => el.tagName === 'button')?.href || '#',
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // 僅在 element.elements 發生變化時更新狀態，避免不必要的更新
    if (JSON.stringify(element.elements) !== JSON.stringify(content)) {
      setContent(element.elements || []);
    }
  }, [element.elements, content]);

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
    // 僅在更新內容與當前內容不一致時才觸發狀態更新，避免無限循環
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
    <Box className={`creative-hero ${element.className}`}>
      <Box className='creative-hero__container'>
        {/* 圖片區域 */}
        <Box className='creative-hero__images'>
          {content
            .filter((el) => el.tagName === 'img')
            .map((imgEl, elIndex) => (
              <Image
                key={elIndex}
                src={imgEl.src || ''}
                alt={imgEl.alt || ''}
                className={`${imgEl.className} creative-hero__images-image--${imgEl.id}`}
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                    fileInputRef.current.dataset.elIndex = `${elIndex}`;
                    fileInputRef.current.click();
                  }
                }}
              />
            ))}
          <Box className='creative-hero__images__overlay' />
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

        {isEdit && (
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={(e) =>
              uploadImage(
                e,
                parseInt(fileInputRef.current?.dataset.elIndex || '0', 10),
              )
            }
            style={{ display: 'none' }}
          />
        )}
      </Box>
    </Box>
  );
};

export default CreativeHeroEditor;
