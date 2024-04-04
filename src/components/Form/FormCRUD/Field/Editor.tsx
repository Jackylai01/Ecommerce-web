import React, { useCallback, useState } from 'react';
import { AddElement } from './NestedUI/AddElement';
import { ElementEditor } from './NestedUI/ElementEditor';

interface CustomPageElement {
  id: string;
  tagName: string;
  className?: string;
  content?: string;
  alt?: string;
  src?: string;
  elements?: CustomPageElement[];
}

interface CustomPageBlock {
  className: string;
  elements: CustomPageElement[];
}

interface EditableBlockProps {
  block: CustomPageBlock;
}

const EditableBlock: React.FC<EditableBlockProps> = ({ block }) => {
  const [elements, setElements] = useState<CustomPageElement[]>(block.elements);
  const [selectedElement, setSelectedElement] =
    useState<CustomPageElement | null>(null);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, index: number) => {
      event.preventDefault();
      const draggedId = event.dataTransfer.getData('text/plain');
      const draggedElementIndex = elements.findIndex(
        (el) => el.id === draggedId,
      );
      const newElements = [...elements];
      const [reorderedElement] = newElements.splice(draggedElementIndex, 1);
      newElements.splice(index, 0, reorderedElement);
      setElements(newElements);
    },
    [elements],
  );

  const handleAddElement = (newElement: any) => {
    setElements((prevElements) => [...prevElements, newElement]);
  };

  const updateElement = (updatedElement: any) => {
    const updatedElements = elements.map((element) =>
      element.id === updatedElement.id ? updatedElement : element,
    );
    setElements(updatedElements);
    setSelectedElement(null);
  };

  const renderElement = (element: CustomPageElement, index: number) => {
    const props = {
      draggable: true,
      onDragStart: (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text/plain', element.id);
      },
      onDragOver: handleDragOver,
      onDrop: (event: React.DragEvent<HTMLDivElement>) =>
        handleDrop(event, index),
      onClick: () => setSelectedElement(element),
      key: element.id,
      style: {
        cursor: 'pointer',
        padding: '10px',
        border: '1px solid black',
        marginBottom: '5px',
      },
    };
    return (
      <div
        key={element.id}
        style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
      >
        {element.tagName === 'img' ? (
          <img
            {...props}
            src={element.src}
            alt={element.alt || ''}
            style={{ marginRight: '10px' }}
          />
        ) : (
          <div {...props} style={{ marginRight: '10px' }}>
            {element.content}
          </div>
        )}
        <button
          onClick={() => handleDeleteElement(element.id)}
          style={{ cursor: 'pointer' }}
        >
          Delete
        </button>
      </div>
    );
  };

  const handleDeleteElement = (elementId: string) => {
    setElements(elements.filter((element) => element.id !== elementId));
  };

  return (
    <div>
      <AddElement onAdd={handleAddElement} />
      <div>{elements.map(renderElement)}</div>
      {selectedElement && (
        <ElementEditor element={selectedElement} onUpdate={updateElement} />
      )}
    </div>
  );
};

export default EditableBlock;
