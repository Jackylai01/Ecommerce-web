import { baseQuillToolbar } from '@fixtures/quill-configs';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { ElementProps } from '..';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type TableEditProps = {
  tableData: string[][];
  setTableData: Function;
  tableDataHeader: string[];
  tableDataContext: string[][];
  hasSearchBar: boolean;
  setHasSearchBar: Function;
} & ElementProps;

const TableEdit = ({
  element,
  isEdit,
  tableData,
  setTableData,
  tableDataHeader,
  tableDataContext,
  hasSearchBar,
  setHasSearchBar,
}: TableEditProps) => {
  const handleKeyUp = (
    event: KeyboardEvent,
    rowIndex: number,
    colIndex: number,
  ) => {
    tableData[rowIndex][colIndex] = (event.target as HTMLElement).innerHTML;
  };

  useEffect(() => {
    if (!element.data) return;
    element.data = tableData;
  }, [element, isEdit, tableData]);

  const createRow = () => {
    setTableData([...tableData, tableDataHeader.map(() => '內容')]);
  };

  const createCol = () => {
    setTableData(tableData.map((item) => [...item, '新內容']));
  };

  const deleteRow = (rowIndex: number) => {
    setTableData(tableData.filter((item, index) => index !== rowIndex));
  };

  const deleteCol = (colIndex: number) => {
    setTableData(
      tableData.map((row) => row.filter((item, index) => index !== colIndex)),
    );
  };

  const editHasEdit = () => {
    element.hasSearchBar = !element.hasSearchBar;
    setHasSearchBar(!hasSearchBar);
  };

  return (
    <article className='custom-page__table-setting'>
      <button
        className='custom-page__table-create-row'
        onClick={createRow}
        type='button'
      >
        <span className='icomoon-add'></span>
      </button>
      <button
        className='custom-page__table-create-col'
        onClick={createCol}
        type='button'
      >
        <span className='icomoon-add'></span>
      </button>
      <button
        className='btn btn--full btn--accent-border margin-bottom'
        type='button'
        onClick={editHasEdit}
      >
        {hasSearchBar ? '關閉' : '開啟'}表格搜尋匡
      </button>
      {hasSearchBar ? (
        <form className='header__search-form table-search-form'>
          <input
            type='text'
            placeholder={`請輸入關鍵字搜尋`}
            id='searchKeywordInput'
            title='請輸入關鍵字'
          />
          <button type='button' value='搜尋按鈕'>
            <span className='icomoon-search'></span>
            <span>搜尋</span>
          </button>
        </form>
      ) : null}
      <article className='table-container--edit'>
        <table
          className={`table-container__table table-container__table--display table-container__table--auto-info ${
            element.className?.includes('small')
              ? 'table-container__table--small'
              : ''
          }`}
        >
          <thead>
            <tr>
              {tableDataHeader.map((item, index) => (
                <th scope='col' key={index}>
                  <ReactQuill
                    className={element.className}
                    theme='bubble'
                    modules={{ toolbar: baseQuillToolbar }}
                    placeholder='請輸入標題'
                    value={item}
                    onChange={(value) => (tableDataHeader[index] = value)}
                  />
                  <span
                    className='icomoon-bin custom-page__table-delete custom-page__table-delete--col'
                    onClick={() => deleteCol(index)}
                  ></span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableDataContext.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                {rowData.map((item, colIndex) =>
                  colIndex === 0 ? (
                    <th key={colIndex} scope='row'>
                      <ReactQuill
                        className={element.className}
                        theme='bubble'
                        modules={{ toolbar: baseQuillToolbar }}
                        placeholder='請輸入內容'
                        value={item}
                        onChange={(value) =>
                          (tableDataContext[rowIndex][colIndex] = value)
                        }
                      />
                      <span
                        className={`icomoon-bin custom-page__table-delete custom-page__table-delete--row`}
                        onClick={() => deleteRow(rowIndex + 1)}
                      ></span>
                    </th>
                  ) : (
                    <td key={colIndex}>
                      <ReactQuill
                        className={element.className}
                        theme='bubble'
                        modules={{ toolbar: baseQuillToolbar }}
                        placeholder='請輸入內容'
                        value={item}
                        onChange={(value) =>
                          (tableDataContext[rowIndex][colIndex] = value)
                        }
                      />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </article>
  );
};

const Table = (props: ElementProps) => {
  const [tableData, setTableData] = useState(props.element.data ?? [[]]);
  const [tableDataHeader, ...tableDataContext] = tableData;
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

  if (props.isEdit)
    return (
      <TableEdit
        {...props}
        tableData={tableData}
        setTableData={setTableData}
        tableDataHeader={tableDataHeader}
        tableDataContext={tableDataContext}
        hasSearchBar={hasSearchBar}
        setHasSearchBar={setHasSearchBar}
      />
    );

  const contentRemoveP = (value: string) =>
    /^<p>(.*?)<\/p>$/.exec(value || '')?.[1] || value;

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
      <article className='table-container'>
        <table
          className={`table-container__table table-container__table--display table-container__table--auto-info ${
            props.element.className?.includes('small')
              ? 'table-container__table--small'
              : ''
          }`}
        >
          <thead>
            <tr>
              {tableDataHeader.map((item, index) => (
                <th
                  key={index}
                  scope='col'
                  dangerouslySetInnerHTML={{ __html: contentRemoveP(item) }}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {tableDataContext.filter((item) =>
              item.toString().toLowerCase().includes(keyword.toLowerCase()),
            ).length ? (
              tableDataContext
                .filter((item) =>
                  item.toString().toLowerCase().includes(keyword.toLowerCase()),
                )
                .map((rowData, rowIndex) => (
                  <tr key={rowIndex}>
                    {rowData.map((item, colIndex) =>
                      colIndex === 0 ? (
                        <th
                          key={colIndex}
                          scope='row'
                          dangerouslySetInnerHTML={{
                            __html: contentRemoveP(item),
                          }}
                        />
                      ) : (
                        <td
                          key={colIndex}
                          scope='row'
                          dangerouslySetInnerHTML={{
                            __html: contentRemoveP(item),
                          }}
                        />
                      ),
                    )}
                  </tr>
                ))
            ) : (
              <tr>
                <th colSpan={tableDataHeader.length}>
                  您所搜尋的關鍵字暫無相關內容
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </>
  );
};

export default Table;
