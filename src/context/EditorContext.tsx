import { Editor } from '@tiptap/react';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditorContextType {
  activeEditor: Editor | null;
  setActiveEditor: (editor: Editor | null) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeEditor, setActiveEditor] = useState<Editor | null>(null);

  return (
    <EditorContext.Provider value={{ activeEditor, setActiveEditor }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within EditorProvider');
  }
  return context;
};
