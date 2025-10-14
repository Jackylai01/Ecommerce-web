import { Box } from '@chakra-ui/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
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
import { useEditorContext } from '@context/EditorContext';

interface SimpleEditorProps {
  content: string;
  onChange: (html: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
}

const SimpleEditor: React.FC<SimpleEditorProps> = ({
  content,
  onChange,
  onBlur,
  placeholder = '請輸入內容',
  className = '',
}) => {
  const { setActiveEditor } = useEditorContext();

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
      TextStyle,
      Color.configure({
        types: ['textStyle'],
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
        class: `tiptap-editor simple-editor ${className}`,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    onFocus: ({ editor }) => {
      // 當編輯器聚焦時，設置為活躍編輯器
      setActiveEditor(editor);
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

  // 清理：當組件卸載時，如果當前是活躍編輯器，則清除
  useEffect(() => {
    return () => {
      setActiveEditor(null);
    };
  }, [setActiveEditor]);

  if (!editor) {
    return null;
  }

  return (
    <Box className='simple-editor-wrapper' w='100%' position='relative'>
      <EditorContent editor={editor} />
    </Box>
  );
};

export default SimpleEditor;
