import { baseQuillToolbar } from '@fixtures/quill-configs';
import dynamic from 'next/dynamic';
import React from 'react';
import NestedDisplayUI, { ElementProps } from '..';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TagElement = ({ element, isEdit }: ElementProps) => {
  const handleKeyUp = (event: KeyboardEvent) => {
    element.context &&
      (element.context = (event.target as HTMLElement).innerHTML);
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
        modules={{
          toolbar: baseQuillToolbar,
        }}
        placeholder='請輸入內容'
        value={`<${element.tagName}>${element.context}</${element.tagName}>`}
        onChange={(value) => (element.context = value)}
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
