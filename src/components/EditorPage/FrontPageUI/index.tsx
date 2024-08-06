import { Component } from '@fixtures/componentLibrary';
import React from 'react';
import NavbarEditor from './src/navbar/NavbarEditor';
import NavbarEditorSecond from './src/navbar/NavbarEditorSecond';

interface EditorComponentFactoryProps {
  component: Component;
  index: number;
  isEdit: boolean;
  onBlur: () => void;
  onImageUpload: (index: number, file: File) => void; // Add onImageUpload prop
}

const EditorComponentFactory: React.FC<EditorComponentFactoryProps> = ({
  component,
  index,
  isEdit,
  onBlur,
  onImageUpload, // Destructure the prop
}) => {
  switch (component.type) {
    case 'navbar':
      return (
        <NavbarEditor
          index={index}
          element={component}
          isEdit={isEdit}
          onBlur={onBlur}
          onImageUpload={onImageUpload} // Pass the onImageUpload prop
        />
      );
    case 'navbar_second':
      return (
        <NavbarEditorSecond
          index={index}
          element={component}
          isEdit={isEdit}
          onBlur={onBlur}
        />
      );
    default:
      return null;
  }
};

export default EditorComponentFactory;
