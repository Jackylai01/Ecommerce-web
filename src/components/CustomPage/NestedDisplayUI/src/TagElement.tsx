import { baseQuillToolbar } from '@fixtures/quill-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import { updateElementContent } from '@reducers/admin/custom-page';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import NestedDisplayUI, { ElementProps } from '..';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TagElement = ({ element, isEdit }: ElementProps) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState(element.context || '');

  const handleKeyUp = (event: KeyboardEvent) => {
    element.context &&
      (element.context = (event.target as HTMLElement).innerHTML);
  };

  const updateContent = () => {
    dispatch(updateElementContent({ id: element.id, newContent: content }));
  };

  if (element.elements)
    return React.createElement(
      element.tagName,
      {
        className: element.className,
      },
      element.elements && (
        <NestedDisplayUI elements={element.elements} isEdit={isEdit} />
      ),
    );

  if (isEdit) {
    return (
      <ReactQuill
        className={element.className}
        theme='bubble'
        modules={{ toolbar: baseQuillToolbar }}
        placeholder='请输入内容'
        value={content}
        onChange={setContent}
        onBlur={updateContent}
      />
    );
  }

  const contentRegex = new RegExp(
    `^<${element.tagName}>(.*?)<\/${element.tagName}>$`,
  );
  const matches = contentRegex.exec(element.context || '');

  return React.createElement(element.tagName, {
    className: element.className,
    contentEditable: isEdit && !!element.context,
    suppressContentEditableWarning: true,
    onKeyUpCapture: (event: KeyboardEvent) => handleKeyUp(event),
    dangerouslySetInnerHTML: {
      __html: matches?.[1] || element.context,
    },
  });
};

export default TagElement;
