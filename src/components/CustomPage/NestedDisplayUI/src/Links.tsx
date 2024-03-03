import { getFileUrl } from '@helpers/archive';
import generateUUID from '@helpers/generate-uuid';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { fileSelectReset, setSelectActive } from '@reducers/file-select';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ElementProps } from '..';

type LinksEditProps = {
  itemsData: string[][];
  setItemsData: Function;
} & ElementProps;

const LinksEdit = ({
  element,
  isEdit,
  itemsData,
  setItemsData,
  uuid = '',
}: LinksEditProps) => {
  const dispatch = useAppDispatch();

  const { fileUrl, fieldName } = useAppSelector((state) => state.fileSelect);

  useEffect(() => {
    if (!element.data) return;
    element.data = itemsData;
  }, [element, isEdit, itemsData]);

  useEffect(() => {
    if (!fieldName.startsWith(uuid) || !itemsData || !fileUrl) return;
    const index = Number(fieldName.replace(uuid, ''));
    itemsData[index][1] = getFileUrl(fileUrl, true);
    itemsData[index][2] = 'ARCHIVE';
    setItemsData([...itemsData]);
    dispatch(fileSelectReset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl]);

  const handleKeyUp = (
    event: KeyboardEvent,
    rowIndex: number,
    colIndex: number,
  ) => {
    itemsData[rowIndex][colIndex] = (event.target as HTMLInputElement)?.value;
  };

  const createLink = () => {
    setItemsData([...itemsData, ['超連結文字', 'https://www.google.com.tw/']]);
  };

  const deleteLink = (linkIndex: number) => {
    setItemsData(itemsData.filter((_item, index) => index !== linkIndex));
  };

  const editLink = (index: number) => {
    dispatch(
      setSelectActive({
        active: true,
        fieldName: uuid + index.toString(),
        fileType: 'IMAGE',
      }),
    );
  };

  return (
    <>
      <ul className={element.className + ' is-edit'}>
        {itemsData.map((item, index) => (
          <li key={generateUUID()}>
            <span
              className={`icomoon-bin btn btn--danger`}
              onClick={() => deleteLink(index)}
            />
            <span
              className='icomoon-file-invoice btn'
              onClick={() => editLink(index)}
            />
            <input
              type='text'
              defaultValue={item[0]}
              onKeyUpCapture={(event) => handleKeyUp(event as any, index, 0)}
            />
            <input
              type='text'
              defaultValue={item[1]}
              onKeyUpCapture={(event) => handleKeyUp(event as any, index, 1)}
            />
          </li>
        ))}
      </ul>
      <button
        type='button'
        className='btn btn--full btn--accent-border'
        onClick={createLink}
      >
        <span className='icomoon-add'></span> 新增項目
      </button>
    </>
  );
};

const Links = (props: ElementProps) => {
  const [itemsData, setItemsData] = useState(props.element.data ?? [[]]);

  const contentRemoveP = (value: string) =>
    /^<p>(.*?)<\/p>$/.exec(value || '')?.[1] || value;

  if (props.isEdit)
    return (
      <LinksEdit {...props} itemsData={itemsData} setItemsData={setItemsData} />
    );

  return (
    <ul className={props.element.className}>
      {itemsData.map((element, index) => (
        <li key={index}>
          <Link href={element[1]} key={index}>
            <a target='_blank'>{contentRemoveP(element[0])}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Links;
