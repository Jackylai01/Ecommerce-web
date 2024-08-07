import { ArrowRightIcon, StarIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Component } from '@fixtures/componentLibrary';
import useEditModeNavigation from '@hooks/useEditModeNavigation';
import { updateBlock } from '@reducers/admin/admin-edit-pages';
import React, { useEffect, useRef, useState } from 'react';

interface HeroEditorProps {
  index: number;
  element: Component;
  isEdit: boolean;
  onBlur: () => void;
  onImageUpload: (index: number, file: File) => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({
  index,
  element,
  isEdit,
  onBlur,
  onImageUpload,
}) => {
  const { safeDispatch } = useEditModeNavigation();
  const [content, setContent] = useState(element.elements || []);
  const [bgColor, setBgColor] = useState<string>(
    element.style?.backgroundColor || '#ffffff',
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setContent(element.elements || []);
  }, [element]);

  const handleChange = (itemIndex: number, key: string, value: string) => {
    const updatedContent = content.map((item, idx) => {
      if (idx === itemIndex) {
        return { ...item, [key]: value };
      }
      return item;
    });
    setContent(updatedContent);
    safeDispatch(
      updateBlock({ index, block: { ...element, elements: updatedContent } }),
    );
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          const updatedContent = content.map((item) => {
            if (item.tagName === 'img') {
              return { ...item, src: result as string };
            }
            return item;
          });
          setContent(updatedContent);
          onImageUpload(index, file); // Upload image file
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      className='fashion-hero__container'
      style={{ backgroundColor: bgColor }}
    >
      <Box className='fashion-hero__background'>
        <Image
          src='/api/placeholder/1920/1080'
          alt='時尚背景'
          className='fashion-hero__background-img'
        />
        <Box className='fashion-hero__background-gradient'></Box>
      </Box>
      <Box className='fashion-hero__content'>
        <Flex className='fashion-hero__nav'>
          <Text
            className='fashion-hero__logo'
            contentEditable={isEdit}
            suppressContentEditableWarning
            onBlur={(e) =>
              handleChange(
                content.findIndex((item) => item.tagName === 'logo'),
                'context',
                e.currentTarget.textContent || 'LOGO',
              )
            }
          >
            {content.find((item) => item.tagName === 'logo')?.context || 'LOGO'}
          </Text>
          <Flex className='fashion-hero__nav-items'>
            {content
              .filter((item) => item.tagName === 'navItem')
              .map((item, idx) => (
                <Text
                  mx='3'
                  key={idx}
                  contentEditable={isEdit}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleChange(
                      content.findIndex((navItem) => navItem === item),
                      'context',
                      e.currentTarget.textContent || '',
                    )
                  }
                >
                  {item.context}
                </Text>
              ))}
          </Flex>
        </Flex>
        <Flex className='fashion-hero__main'>
          <Box className='fashion-hero__main-text'>
            <Heading
              as='h1'
              size='2xl'
              className='fashion-hero__heading'
              contentEditable={isEdit}
              suppressContentEditableWarning
              onBlur={(e) =>
                handleChange(
                  content.findIndex((item) => item.tagName === 'h1'),
                  'context',
                  e.currentTarget.textContent || '秋冬 新風尚',
                )
              }
            >
              {content.find((item) => item.tagName === 'h1')?.context ||
                '秋冬 新風尚'}
            </Heading>
            <Text
              className='fashion-hero__subheading'
              contentEditable={isEdit}
              suppressContentEditableWarning
              onBlur={(e) =>
                handleChange(
                  content.findIndex((item) => item.tagName === 'h2'),
                  'context',
                  e.currentTarget.textContent ||
                    '探索我們的2024秋冬系列，體驗前所未有的時尚魅力。每一件單品都是精心打造的藝術品。',
                )
              }
            >
              {content.find((item) => item.tagName === 'h2')?.context ||
                '探索我們的2024秋冬系列，體驗前所未有的時尚魅力。每一件單品都是精心打造的藝術品。'}
            </Text>
            <Button className='fashion-hero__button'>
              {content.find((item) => item.tagName === 'button')?.context ||
                '立即選購'}
              <ArrowRightIcon className='ml-2' />
            </Button>
          </Box>
          <Box className='fashion-hero__product'>
            <Image
              src={
                content.find((item) => item.tagName === 'img')?.src ||
                '/api/placeholder/500/700'
              }
              alt={
                content.find((item) => item.tagName === 'img')?.alt ||
                '秋冬新品'
              }
              className='fashion-hero__product-img'
            />
            <Flex align='center' className='fashion-hero__rating'>
              <StarIcon className='fashion-hero__rating-icon' />
              <Text className='fashion-hero__rating-score'>4.9</Text>
              <Text className='fashion-hero__rating-text' ml='2'>
                (3000+ 評價)
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex className='fashion-hero__footer'>
          <Box>
            <Text className='fashion-hero__footer-discount'>30% OFF</Text>
            <Text className='fashion-hero__footer-info'>全場新品限時優惠</Text>
          </Box>
          <Box textAlign='right' className='fashion-hero__footer-inspiration'>
            <Text className='fashion-hero__footer-inspiration-text'>
              靈感來源
            </Text>
            <Text className='fashion-hero__footer-inspiration-source'>
              巴黎時裝周
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box className='fashion-hero__decor-circle'></Box>
      <Box className='fashion-hero__decor-square'></Box>
      {isEdit && (
        <>
          <Tooltip label='更改背景顏色' aria-label='更改背景顏色'>
            <Input
              type='color'
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            />
          </Tooltip>
          <Tooltip label='更改圖片' aria-label='更改圖片'>
            <IconButton
              icon={<ArrowRightIcon />}
              aria-label='更改圖片'
              onClick={() => fileInputRef.current?.click()}
              style={{ position: 'absolute', top: '50px', right: '10px' }}
            />
            <Input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              onChange={uploadImage}
              style={{ display: 'none' }}
            />
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default HeroEditor;
