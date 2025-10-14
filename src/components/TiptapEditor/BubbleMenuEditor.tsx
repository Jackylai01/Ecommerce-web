import { Box, Button, ButtonGroup, Popover, PopoverTrigger, PopoverContent, VStack, Input, Select, HStack, Divider } from '@chakra-ui/react';
import { EditorContent, useEditor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/extension-bubble-menu';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import { TextStyle, Color, FontSize } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import HorizontalRule from '@tiptap/extension-horizontal-rule';

interface BubbleMenuEditorProps {
  content: string;
  onChange: (html: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
}

const BubbleMenuEditor: React.FC<BubbleMenuEditorProps> = ({
  content,
  onChange,
  onBlur,
  placeholder = '請輸入內容',
  className = '',
}) => {
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFF00');
  const [fontSize, setFontSize] = useState('16px');

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Superscript,
      Subscript,
      TextStyle, // TextStyle Mark - 必須在 Color Extension 之前
      Color.configure({
        types: ['textStyle'], // 告訴 Color 要作用於哪個 mark
      }),
      FontSize.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      HorizontalRule,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      Table,
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class: `tiptap-editor bubble-editor ${className}`,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    onBlur: () => {
      if (onBlur) onBlur();
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  // 更新當前顏色和字體大小狀態
  useEffect(() => {
    if (!editor) return;

    const updateAttributes = () => {
      try {
        const textStyleAttrs = editor.getAttributes('textStyle');
        if (textStyleAttrs?.color) {
          setTextColor(textStyleAttrs.color);
        }
        if (textStyleAttrs?.fontSize) {
          setFontSize(textStyleAttrs.fontSize);
        }

        const highlightAttrs = editor.getAttributes('highlight');
        if (highlightAttrs?.color) {
          setBgColor(highlightAttrs.color);
        }
      } catch (e) {
        // 忽略錯誤，使用預設值
      }
    };

    editor.on('selectionUpdate', updateAttributes);
    editor.on('update', updateAttributes);

    return () => {
      editor.off('selectionUpdate', updateAttributes);
      editor.off('update', updateAttributes);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <Box className='tiptap-wrapper bubble-wrapper' w='100%' position='relative' overflow='visible'>
      {editor && (
        <BubbleMenu
          editor={editor}
          pluginKey="bubbleMenuText"
        >
          <Box
            bg='white'
            shadow='xl'
            borderRadius='lg'
            border='2px solid'
            borderColor='blue.400'
            p={2}
          >
            <ButtonGroup size='sm' spacing={1} variant='solid'>
              {/* 文字格式 */}
              <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                bg={editor.isActive('bold') ? 'blue.500' : 'white'}
                color={editor.isActive('bold') ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('bold') ? 'blue.600' : 'gray.100' }}
                fontWeight='bold'
                minW='40px'
              >
                粗體
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                bg={editor.isActive('italic') ? 'blue.500' : 'white'}
                color={editor.isActive('italic') ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('italic') ? 'blue.600' : 'gray.100' }}
                fontStyle='italic'
                minW='40px'
              >
                斜體
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                bg={editor.isActive('underline') ? 'blue.500' : 'white'}
                color={editor.isActive('underline') ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('underline') ? 'blue.600' : 'gray.100' }}
                textDecoration='underline'
                minW='40px'
              >
                底線
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                bg={editor.isActive('strike') ? 'blue.500' : 'white'}
                color={editor.isActive('strike') ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('strike') ? 'blue.600' : 'gray.100' }}
                textDecoration='line-through'
                minW='40px'
              >
                刪除
              </Button>

              {/* 分隔線 */}
              <Box w='1px' h='32px' bg='gray.300' mx={1} />

              {/* 標題 H1-H6 */}
              <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                bg={editor.isActive('heading', { level: 1 }) ? 'purple.500' : 'white'}
                color={editor.isActive('heading', { level: 1 }) ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('heading', { level: 1 }) ? 'purple.600' : 'gray.100' }}
                minW='38px'
                fontSize='md'
              >
                H1
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                bg={editor.isActive('heading', { level: 2 }) ? 'purple.500' : 'white'}
                color={editor.isActive('heading', { level: 2 }) ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('heading', { level: 2 }) ? 'purple.600' : 'gray.100' }}
                minW='38px'
                fontSize='md'
              >
                H2
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                bg={editor.isActive('heading', { level: 3 }) ? 'purple.500' : 'white'}
                color={editor.isActive('heading', { level: 3 }) ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('heading', { level: 3 }) ? 'purple.600' : 'gray.100' }}
                minW='38px'
                fontSize='sm'
              >
                H3
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                bg={editor.isActive('heading', { level: 4 }) ? 'purple.500' : 'white'}
                color={editor.isActive('heading', { level: 4 }) ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('heading', { level: 4 }) ? 'purple.600' : 'gray.100' }}
                minW='38px'
                fontSize='sm'
              >
                H4
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                bg={editor.isActive('heading', { level: 5 }) ? 'purple.500' : 'white'}
                color={editor.isActive('heading', { level: 5 }) ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('heading', { level: 5 }) ? 'purple.600' : 'gray.100' }}
                minW='38px'
                fontSize='xs'
              >
                H5
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                bg={editor.isActive('heading', { level: 6 }) ? 'purple.500' : 'white'}
                color={editor.isActive('heading', { level: 6 }) ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('heading', { level: 6 }) ? 'purple.600' : 'gray.100' }}
                minW='38px'
                fontSize='xs'
              >
                H6
              </Button>

              {/* 分隔線 */}
              <Box w='1px' h='32px' bg='gray.300' mx={1} />

              {/* 列表 */}
              <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                bg={editor.isActive('bulletList') ? 'green.500' : 'white'}
                color={editor.isActive('bulletList') ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('bulletList') ? 'green.600' : 'gray.100' }}
                minW='40px'
              >
                • 列表
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                bg={editor.isActive('orderedList') ? 'green.500' : 'white'}
                color={editor.isActive('orderedList') ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('orderedList') ? 'green.600' : 'gray.100' }}
                minW='40px'
              >
                1. 列表
              </Button>

              {/* 分隔線 */}
              <Box w='1px' h='32px' bg='gray.300' mx={1} />

              {/* 其他 */}
              <Button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                bg={editor.isActive('blockquote') ? 'orange.500' : 'white'}
                color={editor.isActive('blockquote') ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('blockquote') ? 'orange.600' : 'gray.100' }}
                minW='40px'
              >
                引用
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleCode().run()}
                bg={editor.isActive('code') ? 'gray.600' : 'white'}
                color={editor.isActive('code') ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('code') ? 'gray.700' : 'gray.100' }}
                fontFamily='monospace'
                minW='40px'
              >
                {'</>'}
              </Button>

              {/* 分隔線 */}
              <Box w='1px' h='32px' bg='gray.300' mx={1} />

              {/* 字體大小 */}
              <Select
                size='sm'
                w='90px'
                value={fontSize}
                onChange={(e) => {
                  const newSize = e.target.value;
                  setFontSize(newSize);
                  editor?.chain().focus().setFontSize(newSize).run();
                }}
                bg='white'
                borderColor='gray.300'
              >
                <option value='12px'>12px</option>
                <option value='14px'>14px</option>
                <option value='16px'>16px</option>
                <option value='18px'>18px</option>
                <option value='20px'>20px</option>
                <option value='24px'>24px</option>
                <option value='28px'>28px</option>
                <option value='32px'>32px</option>
                <option value='36px'>36px</option>
                <option value='48px'>48px</option>
                <option value='64px'>64px</option>
              </Select>

              {/* 分隔線 */}
              <Box w='1px' h='32px' bg='gray.300' mx={1} />

              {/* 文字顏色 */}
              <Popover placement='top'>
                <PopoverTrigger>
                  <Button
                    minW='50px'
                    bg='white'
                    color='gray.700'
                    _hover={{ bg: 'gray.100' }}
                    borderBottom='4px solid'
                    borderBottomColor={textColor}
                    position='relative'
                  >
                    <Box
                      as='span'
                      fontSize='lg'
                      fontWeight='bold'
                      color={textColor}
                    >
                      A
                    </Box>
                  </Button>
                </PopoverTrigger>
                <PopoverContent w='220px' p={3}>
                  <VStack spacing={3} align='stretch'>
                    <Box fontSize='sm' fontWeight='bold' color='gray.700'>
                      文字顏色
                    </Box>
                    <Box
                      position='relative'
                      w='100%'
                      h='120px'
                      borderRadius='md'
                      overflow='hidden'
                      border='2px solid'
                      borderColor='gray.300'
                    >
                      <Input
                        type='color'
                        value={textColor}
                        onChange={(e) => {
                          const newColor = e.target.value;
                          setTextColor(newColor);
                          // 使用正確的 Tiptap Color 擴展 API
                          editor?.chain().focus().setColor(newColor).run();
                        }}
                        w='100%'
                        h='100%'
                        p={0}
                        border='none'
                        cursor='pointer'
                        _hover={{ transform: 'scale(1.02)' }}
                      />
                    </Box>
                    <Box
                      fontSize='xs'
                      color='gray.600'
                      textAlign='center'
                      fontFamily='monospace'
                    >
                      當前顏色: {textColor.toUpperCase()}
                    </Box>
                    <Button
                      size='sm'
                      w='100%'
                      variant='outline'
                      colorScheme='red'
                      onClick={() => {
                        editor?.chain().focus().unsetColor().run();
                        setTextColor('#000000');
                      }}
                    >
                      清除顏色
                    </Button>
                  </VStack>
                </PopoverContent>
              </Popover>

              {/* 背景顏色 */}
              <Popover placement='top'>
                <PopoverTrigger>
                  <Button
                    minW='50px'
                    bg={bgColor}
                    color='gray.700'
                    _hover={{ opacity: 0.8 }}
                    border='2px solid'
                    borderColor='gray.400'
                    fontWeight='bold'
                  >
                    背
                  </Button>
                </PopoverTrigger>
                <PopoverContent w='220px' p={3}>
                  <VStack spacing={3} align='stretch'>
                    <Box fontSize='sm' fontWeight='bold' color='gray.700'>
                      背景顏色
                    </Box>
                    <Box
                      position='relative'
                      w='100%'
                      h='120px'
                      borderRadius='md'
                      overflow='hidden'
                      border='2px solid'
                      borderColor='gray.300'
                    >
                      <Input
                        type='color'
                        value={bgColor}
                        onChange={(e) => {
                          const newColor = e.target.value;
                          setBgColor(newColor);
                          // 使用正確的 Tiptap Highlight 擴展 API
                          editor?.chain().focus().setHighlight({ color: newColor }).run();
                        }}
                        w='100%'
                        h='100%'
                        p={0}
                        border='none'
                        cursor='pointer'
                        _hover={{ transform: 'scale(1.02)' }}
                      />
                    </Box>
                    <Box
                      fontSize='xs'
                      color='gray.600'
                      textAlign='center'
                      fontFamily='monospace'
                    >
                      當前顏色: {bgColor.toUpperCase()}
                    </Box>
                    <Button
                      size='sm'
                      w='100%'
                      variant='outline'
                      colorScheme='red'
                      onClick={() => {
                        editor?.chain().focus().unsetHighlight().run();
                        setBgColor('#FFFF00');
                      }}
                    >
                      清除背景
                    </Button>
                  </VStack>
                </PopoverContent>
              </Popover>

              {/* 分隔線 */}
              <Box w='1px' h='32px' bg='gray.300' mx={1} />

              {/* 上標/下標 */}
              <Button
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                bg={editor.isActive('superscript') ? 'teal.500' : 'white'}
                color={editor.isActive('superscript') ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('superscript') ? 'teal.600' : 'gray.100' }}
                minW='40px'
                fontSize='xs'
              >
                X²
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                bg={editor.isActive('subscript') ? 'teal.500' : 'white'}
                color={editor.isActive('subscript') ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive('subscript') ? 'teal.600' : 'gray.100' }}
                minW='40px'
                fontSize='xs'
              >
                X₂
              </Button>

              {/* 分隔線 */}
              <Box w='1px' h='32px' bg='gray.300' mx={1} />

              {/* 文字對齊 */}
              <Button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                bg={editor.isActive({ textAlign: 'left' }) ? 'cyan.500' : 'white'}
                color={editor.isActive({ textAlign: 'left' }) ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive({ textAlign: 'left' }) ? 'cyan.600' : 'gray.100' }}
                minW='40px'
                title='靠左對齊'
              >
                ⇤
              </Button>
              <Button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                bg={editor.isActive({ textAlign: 'center' }) ? 'cyan.500' : 'white'}
                color={editor.isActive({ textAlign: 'center' }) ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive({ textAlign: 'center' }) ? 'cyan.600' : 'gray.100' }}
                minW='40px'
                title='置中對齊'
              >
                ↔
              </Button>
              <Button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                bg={editor.isActive({ textAlign: 'right' }) ? 'cyan.500' : 'white'}
                color={editor.isActive({ textAlign: 'right' }) ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive({ textAlign: 'right' }) ? 'cyan.600' : 'gray.100' }}
                minW='40px'
                title='靠右對齊'
              >
                ⇥
              </Button>
              <Button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                bg={editor.isActive({ textAlign: 'justify' }) ? 'cyan.500' : 'white'}
                color={editor.isActive({ textAlign: 'justify' }) ? 'white' : 'gray.700'}
                _hover={{ bg: editor.isActive({ textAlign: 'justify' }) ? 'cyan.600' : 'gray.100' }}
                minW='40px'
                title='兩端對齊'
              >
                ≡
              </Button>

              {/* 分隔線 */}
              <Box w='1px' h='32px' bg='gray.300' mx={1} />

              {/* 插入分隔線 */}
              <Button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                bg='white'
                color='gray.700'
                _hover={{ bg: 'gray.100' }}
                minW='40px'
                title='插入分隔線'
              >
                ───
              </Button>

              {/* 清除格式 */}
              <Button
                onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                bg='white'
                color='red.500'
                _hover={{ bg: 'red.50' }}
                minW='50px'
                title='清除所有格式'
              >
                清除
              </Button>
            </ButtonGroup>
          </Box>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </Box>
  );
};

export default BubbleMenuEditor;
