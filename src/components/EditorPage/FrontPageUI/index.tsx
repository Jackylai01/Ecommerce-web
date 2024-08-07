import { Component } from '@fixtures/componentLibrary';
import React from 'react';
import FashionHeroEditor from './src/Hero/FashionHero';
import NavbarEditor from './src/navbar/NavbarEditor';
import NavbarEditorSecond from './src/navbar/NavbarEditorSecond';

interface EditorComponentFactoryProps {
  component: Component;
  index: number;
  isEdit: boolean;
  onBlur: () => void;
  onImageUpload: (index: number, file: File) => void;
}

const EditorComponentFactory: React.FC<EditorComponentFactoryProps> = ({
  component,
  index,
  isEdit,
  onBlur,
  onImageUpload,
}) => {
  switch (component.type) {
    case 'navbar':
      return (
        <NavbarEditor
          index={index}
          element={component}
          isEdit={isEdit}
          onBlur={onBlur}
          onImageUpload={onImageUpload}
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
    case 'fashion_hero':
      return (
        <FashionHeroEditor
          index={index}
          element={component}
          isEdit={isEdit}
          onBlur={onBlur}
          onImageUpload={onImageUpload}
        />
      );
    default:
      return null;
  }
};

export default EditorComponentFactory;
