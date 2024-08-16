import { Box } from '@chakra-ui/react';
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
}

const EditorComponentFactory: React.FC<EditorComponentFactoryProps> = ({
  component,
  index,
  isEdit,
  onBlur,
}) => {
  switch (component.className) {
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
    case 'fashion-hero':
      return (
        <FashionHeroEditor
          index={index}
          element={component}
          isEdit={isEdit}
          onBlur={onBlur}
        />
      );
    default:
      return <Box>未知的組件類型: {component.className}</Box>;
  }
};

export default EditorComponentFactory;
