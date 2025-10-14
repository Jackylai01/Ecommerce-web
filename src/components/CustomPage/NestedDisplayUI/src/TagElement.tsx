import SimpleEditor from '@components/TiptapEditor/SimpleEditor';
import useAppDispatch from '@hooks/useAppDispatch';
import { updateElementContent } from '@reducers/admin/custom-page';
import React, { useEffect, useState } from 'react';
import NestedDisplayUI, { ElementProps } from '..';

const TagElement = ({ element, isEdit, onBlur }: ElementProps) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState(element.context || '');

  useEffect(() => {
    setContent(element.context || '');
  }, [element]);

  const handleChange = (value: string) => {
    setContent(value);
    element.context = value;
  };

  const updateContent = () => {
    dispatch(updateElementContent({ id: element.id, newContent: content }));
    if (onBlur) onBlur();
  };

  if (element.elements && element.elements.length > 0) {
    return React.createElement(
      element.tagName,
      { className: element.className },
      <NestedDisplayUI
        elements={element.elements}
        isEdit={isEdit}
        onBlur={onBlur}
      />,
    );
  }

  if (isEdit) {
    // 使用 SimpleEditor，由頂部固定工具列控制
    return (
      <SimpleEditor
        content={content}
        onChange={handleChange}
        onBlur={updateContent}
        placeholder='請輸入內容'
        className={element.className}
      />
    );
  }

  return React.createElement(element.tagName, {
    className: element.className,
    contentEditable: false,
    suppressContentEditableWarning: true,
    dangerouslySetInnerHTML: {
      __html: element.context,
    },
  });
};

export default TagElement;
