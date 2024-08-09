import { Box, IconButton } from '@chakra-ui/react';
import EditorComponentFactory from '@components/EditorPage/FrontPageUI';
import { Component, componentLibrary } from '@fixtures/componentLibrary';
import { FaGripVertical, FaTrash } from 'react-icons/fa';

interface CanvasProps {
  components: Component[];
  onDropComponent: (component: Component) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onRemoveComponent: (index: number) => void;
  isEditing: boolean;
  onImageUpload: (index: number, file: File, elementId?: string) => void; // Add onImageUpload prop
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  onDropComponent,
  onDragStart,
  onDragEnd,
  onDragOver,
  onRemoveComponent,
  isEditing,
  onImageUpload, // Destructure the prop
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
      bg='white'
      shadow='md'
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      display='flex'
      flexDirection='column'
    >
      {components.map((component, index) => (
        <Box
          key={index}
          position='relative'
          bg='white'
          border='1px'
          borderColor='gray.200'
          rounded='md'
          shadow='sm'
          onDragOver={(e) => onDragOver(e, index)}
        >
          {isEditing && (
            <Box
              position='absolute'
              top={-5}
              right={5}
              display='flex'
              zIndex={10}
            >
              <IconButton
                icon={<FaGripVertical />}
                aria-label='Drag component'
                size='sm'
                cursor='move'
                draggable={true}
                onDragStart={(e) =>
                  onDragStart(
                    e as unknown as React.DragEvent<HTMLDivElement>,
                    index,
                  )
                }
                onDragEnd={(e) =>
                  onDragEnd(e as unknown as React.DragEvent<HTMLDivElement>)
                }
              />
              <IconButton
                icon={<FaTrash />}
                aria-label='Delete component'
                size='sm'
                ml={2}
                onClick={() => onRemoveComponent(index)}
              />
            </Box>
          )}
          <EditorComponentFactory
            component={component}
            index={index}
            isEdit={isEditing}
            onBlur={() => {}}
            onImageUpload={onImageUpload}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Canvas;
