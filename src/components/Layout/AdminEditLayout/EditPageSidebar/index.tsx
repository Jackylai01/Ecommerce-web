import { Box, Button, Heading } from '@chakra-ui/react';
import { componentLibrary } from '@fixtures/componentLibrary';
import React from 'react';
import { FaBars, FaChevronRight } from 'react-icons/fa';

const categorizedComponents: any = {
  layout: ['navbar_a', 'navbar_b'],
  footer: ['footer_a', 'footer_b'],
  main: ['main_section'],
  card: ['card_a', 'card_b'],
};

interface EditPageSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, key: string) => void;
  isEditing: boolean;
}

const EditPageSidebar: React.FC<EditPageSidebarProps> = ({
  isCollapsed,
  onToggle,
  onDragStart,
  isEditing,
}) => {
  return (
    <Box
      w={isCollapsed ? '60px' : '300px'}
      bg='white'
      p={4}
      shadow='md'
      overflowY='auto'
      transition='width 0.3s ease'
    >
      <Button
        onClick={onToggle}
        colorScheme='blue'
        rounded='full'
        position='fixed'
        left={isCollapsed ? '20px' : '280px'}
        top='20px'
        zIndex={1000}
        transition='left 0.3s ease'
      >
        {isCollapsed ? <FaChevronRight /> : <FaBars />}
      </Button>
      {!isCollapsed && (
        <>
          <Heading as='h2' size='md' mb={4}>
            組件庫
          </Heading>
          {Object.keys(categorizedComponents).map((category) => (
            <Box key={category} mb={6}>
              <Heading as='h3' size='sm' mb={2}>
                {category}
              </Heading>
              {categorizedComponents[category].map((key: any) => (
                <Box
                  key={key}
                  mb={2}
                  bg='gray.50'
                  p={2}
                  rounded='md'
                  shadow='sm'
                  cursor='move'
                  draggable={isEditing}
                  onDragStart={(e) => onDragStart(e, key)}
                >
                  {componentLibrary[key].name}
                </Box>
              ))}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default EditPageSidebar;
