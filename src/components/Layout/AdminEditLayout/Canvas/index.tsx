import { Box, IconButton } from '@chakra-ui/react';
import { Component, componentLibrary } from '@fixtures/componentLibrary';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';

interface CanvasProps {
  components: Component[];
  onDropComponent: (component: Component) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onRemoveComponent: (index: number) => void;
  isEditing: boolean;
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  onDropComponent,
  onDragStart,
  onDragEnd,
  onDragOver,
  onRemoveComponent,
  isEditing,
}) => {
  const handleDrop = (e: React.DragEvent) => {
    if (!isEditing) return;
    e.preventDefault();
    const componentId = e.dataTransfer.getData('component');
    const component = componentLibrary[componentId];
    if (component) {
      onDropComponent(component);
    }
  };

  return (
    <Box
      minH='600px'
      border='2px dashed'
      borderColor='blue.500'
      rounded='md'
      p={8}
      bg='white'
      shadow='md'
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {components.map((component, index) => (
        <Box
          key={index}
          position='relative'
          bg='white'
          border='1px'
          borderColor='gray.200'
          rounded='md'
          p={4}
          mb={4}
          shadow='sm'
          draggable={isEditing}
          onDragStart={(e) => onDragStart(e, index)}
          onDragEnd={onDragEnd}
          onDragOver={(e) => onDragOver(e, index)}
        >
          {isEditing && (
            <IconButton
              icon={<FaTrash />}
              aria-label='Delete component'
              size='sm'
              position='absolute'
              top={2}
              right={2}
              onClick={() => onRemoveComponent(index)}
            />
          )}
          {component.type === 'navbar' || component.type === 'footer' ? (
            component.elements?.map((item, idx) => (
              <Link key={idx} href={item.href}>
                {item.context}
              </Link>
            ))
          ) : (
            <Box>{component.content}</Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Canvas;
