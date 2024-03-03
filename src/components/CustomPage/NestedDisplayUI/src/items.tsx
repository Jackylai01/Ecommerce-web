import { baseQuillToolbar, contentQuillToolbar } from '@fixtures/quill-configs';
import { CustomPageElement } from '@models/entities/custom-page-template';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { ElementProps } from '..';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type ElementItemProps = {
  element: String[];
  dataTemplate: CustomPageElement[];
  contentRemoveP: Function;
};
const Item = ({ element, dataTemplate, contentRemoveP }: ElementItemProps) => {
  const [active, setActive] = useState(false);

  return (
    <li className={active ? 'active' : ''}>
      {dataTemplate?.map((templateElement, index) =>
        React.createElement(templateElement.tagName, {
          className: templateElement.className,
          key: index,
          onClick: () =>
            templateElement.className === 'dropdown-items__title'
              ? setActive(!active)
              : null,
          dangerouslySetInnerHTML: {
            __html: contentRemoveP(element[index]),
          },
        }),
      )}
    </li>
  );
};

type ItemEditProps = {
  itemsData: string[][];
  setItemsData: Function;
  dataTemplate: CustomPageElement[];
  hasSearchBar: boolean;
  setHasSearchBar: Function;
} & ElementProps;

const ItemEdit = ({
  element,
  isEdit,
  itemsData,
  setItemsData,
  dataTemplate,
  hasSearchBar,
  setHasSearchBar,
}: ItemEditProps) => {
  useEffect(() => {
    if (!element.data) return;
    element.data = itemsData;
  }, [element, isEdit, itemsData]);

  const createRow = () => {
    setItemsData([...itemsData, dataTemplate.map((item) => item.context)]);
  };

  const deleteRow = (rowIndex: number) => {
    setItemsData(itemsData.filter((item, index) => index !== rowIndex));
  };

  const editHasEdit = () => {
    element.hasSearchBar = !element.hasSearchBar;
    setHasSearchBar(!hasSearchBar);
  };

  return (
    <>
      {element.className === 'dropdown-items' ? (
        <button
          className='btn btn--full btn--accent-border margin-bottom'
          type='button'
          onClick={editHasEdit}
        >
          {hasSearchBar ? '關閉' : '開啟'}表格搜尋匡
        </button>
      ) : null}
      <ul className={element.className + ' is-edit'}>
        {itemsData.map((item, index) => (
          <li key={index}>
            {dataTemplate?.map((templateElement, index) => (
              <ReactQuill
                key={index}
                className={templateElement.className}
                theme='bubble'
                modules={{
                  toolbar: templateElement.tagName.startsWith('h')
                    ? baseQuillToolbar
                    : contentQuillToolbar,
                }}
                placeholder='請輸入內容'
                value={`<${templateElement.tagName}>${item[index]}</${templateElement.tagName}>`}
                onChange={(value) => (item[index] = value)}
              />
            ))}
            <span
              className={`icomoon-bin ${element.className}__clear`}
              onClick={() => deleteRow(index)}
            ></span>
          </li>
        ))}
      </ul>
      <button type='button' className='btn margin-top' onClick={createRow}>
        <span className='icomoon-add'></span> 新增項目
      </button>
    </>
  );
};

const Items = (props: ElementProps) => {
  const [itemsData, setItemsData] = useState(props.element.data ?? [[]]);
  const dataTemplate = props.element.dataTemplate as CustomPageElement[];

  const [keyword, setKeyword] = useState<string>('');
  const [hasSearchBar, setHasSearchBar] = useState<boolean>(
    props.element.hasSearchBar ? true : false,
  );

  const searchKeywordInput = useRef<HTMLInputElement | null>(null);

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      setKeyword(
        searchKeywordInput.current ? searchKeywordInput.current.value : '',
      );
      return false;
    }
  };
  const contentRemoveP = (value: string) =>
    /^<p>(.*?)<\/p>$/.exec(value || '')?.[1] || value;

  if (props.isEdit)
    return (
      <ItemEdit
        {...props}
        itemsData={itemsData}
        setItemsData={setItemsData}
        dataTemplate={dataTemplate}
        hasSearchBar={hasSearchBar}
        setHasSearchBar={setHasSearchBar}
      />
    );

  return (
    <>
      {hasSearchBar ? (
        <form className='header__search-form table-search-form'>
          <input
            type='text'
            placeholder={`請輸入關鍵字搜尋`}
            id='searchKeywordInput'
            title='請輸入關鍵字'
            ref={searchKeywordInput}
            onKeyDown={(e) => handleEnter(e)}
          />
          <button
            type='button'
            value='搜尋按鈕'
            onClick={() =>
              setKeyword(
                searchKeywordInput.current
                  ? searchKeywordInput.current.value
                  : '',
              )
            }
          >
            <span className='icomoon-search'></span>
            <span>搜尋</span>
          </button>
        </form>
      ) : null}
      <ul className={props.element.className}>
        {itemsData.filter((item) =>
          item.toString().toLowerCase().includes(keyword.toLowerCase()),
        ).length ? (
          itemsData
            .filter((item) =>
              item.toString().toLowerCase().includes(keyword.toLowerCase()),
            )
            .map((element, index) => (
              <Item
                key={index}
                element={element}
                dataTemplate={dataTemplate}
                contentRemoveP={contentRemoveP}
              />
            ))
        ) : (
          <li className='dropdown-items__empty'>
            您所搜尋的關鍵字暫無相關內容
          </li>
        )}
      </ul>
    </>
  );
};

export default Items;
