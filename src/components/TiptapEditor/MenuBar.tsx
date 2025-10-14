import { Box, Button, ButtonGroup, Divider, HStack } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
} from 'lucide-react';
import React from 'react';

interface MenuBarProps {
  editor: Editor;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const iconSize = 18;
  const buttonSize = 'sm';

  return (
    <Box
      borderBottom='1px'
      borderColor='gray.200'
      bg='gray.50'
      p={2}
      mb={2}
      borderRadius='md'
      overflowX='auto'
      className='tiptap-menubar'
    >
      <HStack spacing={2} flexWrap='wrap'>
        {/* Undo/Redo */}
        <ButtonGroup size={buttonSize} isAttached variant='outline'>
          <Button
            onClick={() => editor.chain().focus().undo().run()}
            isDisabled={!editor.can().undo()}
            aria-label='Undo'
          >
            <Undo size={iconSize} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().redo().run()}
            isDisabled={!editor.can().redo()}
            aria-label='Redo'
          >
            <Redo size={iconSize} />
          </Button>
        </ButtonGroup>

        <Divider orientation='vertical' h='24px' />

        {/* Text Style */}
        <ButtonGroup size={buttonSize} isAttached variant='outline'>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            bg={editor.isActive('bold') ? 'blue.100' : 'white'}
            aria-label='Bold'
          >
            <Bold size={iconSize} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            bg={editor.isActive('italic') ? 'blue.100' : 'white'}
            aria-label='Italic'
          >
            <Italic size={iconSize} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            bg={editor.isActive('underline') ? 'blue.100' : 'white'}
            aria-label='Underline'
          >
            <UnderlineIcon size={iconSize} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            bg={editor.isActive('strike') ? 'blue.100' : 'white'}
            aria-label='Strikethrough'
          >
            <Strikethrough size={iconSize} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            bg={editor.isActive('code') ? 'blue.100' : 'white'}
            aria-label='Code'
          >
            <Code size={iconSize} />
          </Button>
        </ButtonGroup>

        <Divider orientation='vertical' h='24px' />

        {/* Headings */}
        <ButtonGroup size={buttonSize} isAttached variant='outline'>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive('heading', { level: 1 })}
            bg={editor.isActive('heading', { level: 1 }) ? 'blue.100' : 'white'}
            aria-label='Heading 1'
          >
            <Heading1 size={iconSize} />
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive('heading', { level: 2 })}
            bg={editor.isActive('heading', { level: 2 }) ? 'blue.100' : 'white'}
            aria-label='Heading 2'
          >
            <Heading2 size={iconSize} />
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive('heading', { level: 3 })}
            bg={editor.isActive('heading', { level: 3 }) ? 'blue.100' : 'white'}
            aria-label='Heading 3'
          >
            <Heading3 size={iconSize} />
          </Button>
        </ButtonGroup>

        <Divider orientation='vertical' h='24px' />

        {/* Lists */}
        <ButtonGroup size={buttonSize} isAttached variant='outline'>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            bg={editor.isActive('bulletList') ? 'blue.100' : 'white'}
            aria-label='Bullet List'
          >
            <List size={iconSize} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            bg={editor.isActive('orderedList') ? 'blue.100' : 'white'}
            aria-label='Ordered List'
          >
            <ListOrdered size={iconSize} />
          </Button>
        </ButtonGroup>

        <Divider orientation='vertical' h='24px' />

        {/* Alignment */}
        <ButtonGroup size={buttonSize} isAttached variant='outline'>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            bg={editor.isActive({ textAlign: 'left' }) ? 'blue.100' : 'white'}
            aria-label='Align Left'
          >
            <AlignLeft size={iconSize} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            bg={
              editor.isActive({ textAlign: 'center' }) ? 'blue.100' : 'white'
            }
            aria-label='Align Center'
          >
            <AlignCenter size={iconSize} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            bg={editor.isActive({ textAlign: 'right' }) ? 'blue.100' : 'white'}
            aria-label='Align Right'
          >
            <AlignRight size={iconSize} />
          </Button>
        </ButtonGroup>

        <Divider orientation='vertical' h='24px' />

        {/* Block Elements */}
        <ButtonGroup size={buttonSize} isAttached variant='outline'>
          <Button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            bg={editor.isActive('blockquote') ? 'blue.100' : 'white'}
            aria-label='Blockquote'
          >
            <Quote size={iconSize} />
          </Button>
          <Button
            onClick={() => {
              const url = window.prompt('輸入連結網址:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            isActive={editor.isActive('link')}
            bg={editor.isActive('link') ? 'blue.100' : 'white'}
            aria-label='Link'
          >
            <Link2 size={iconSize} />
          </Button>
        </ButtonGroup>
      </HStack>
    </Box>
  );
};

export default MenuBar;
