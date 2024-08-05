import { Component } from '@fixtures/componentLibrary';
import React from 'react';
import NavbarEditor from './src/navbar/NavbarEditor';
import NavbarEditorSecond from './src/navbar/NavbarEditorSecond';

interface EditorComponentFactoryProps {
  component: Component;
  index: number;
  isEdit: boolean;
  onBlur: () => void;
}

const EditorComponentFactory: React.FC<EditorComponentFactoryProps> = ({
  component,
  index,
  isEdit,
  onBlur,
}) => {
  switch (component.type) {
    case 'navbar':
      return (
        <NavbarEditor
          index={index}
          element={component}
          isEdit={isEdit}
          onBlur={onBlur}
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
    default: // Warn for unknown types
      console.warn('Unknown component type:', component.type);
      return null;
  }
};

export default EditorComponentFactory;
