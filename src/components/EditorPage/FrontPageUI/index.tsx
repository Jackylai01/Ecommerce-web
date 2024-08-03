import { Component } from '@fixtures/componentLibrary';
import React from 'react';
import NavbarEditor from './src/NavbarEditor';

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

    default:
      return null;
  }
};

export default EditorComponentFactory;
