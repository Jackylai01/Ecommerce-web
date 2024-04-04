import { CustomPageElement } from '@models/entities/custom-page-template';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ElementEditorProps {
  element: CustomPageElement;
  onUpdate: (element: CustomPageElement) => void;
}

export const ElementEditor: React.FC<ElementEditorProps> = ({
  element,
  onUpdate,
}) => {
  const handleTextChange = (content: string) => {
    onUpdate({ ...element, content: content });
  };

  return (
    <div>
      {element.tagName === 'img' ? (
        <>
          <input
            type='text'
            name='src'
            value={element.src}
            onChange={(e) => onUpdate({ ...element, src: e.target.value })}
            placeholder='Image URL'
          />
        </>
      ) : (
        <ReactQuill value={element.content || ''} onChange={handleTextChange} />
      )}
    </div>
  );
};
