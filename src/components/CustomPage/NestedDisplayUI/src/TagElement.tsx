import { baseQuillToolbar } from '@fixtures/quill-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import { updateElementContent } from '@reducers/admin/custom-page';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import NestedDisplayUI, { ElementProps } from '..';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TagElement = ({ element, isEdit, onBlur }: ElementProps) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState(element.context || '');

  useEffect(() => {
    setContent(element.context || '');
  }, [element]);

  const handleChange = (value: string) => {
    setContent(value);
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
    return (
      <ReactQuill
        className={element.className}
        theme='bubble'
        modules={{ toolbar: baseQuillToolbar }}
        placeholder='请输入内容'
        value={content}
        onChange={handleChange}
        onBlur={updateContent}
      />
    );
  }

  return React.createElement(element.tagName, {
    className: element.className,
    contentEditable: isEdit,
    suppressContentEditableWarning: true,
    dangerouslySetInnerHTML: {
      __html: element.context,
    },
    onBlur: updateContent,
  });
};

export default TagElement;
