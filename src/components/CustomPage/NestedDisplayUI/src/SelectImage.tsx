import generateUUID from '@helpers/generate-uuid';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { fileSelectReset, setSelectActive } from '@reducers/file-select';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ElementProps } from '..';

const SelectImage = ({ element, isEdit }: ElementProps) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const name = useMemo(() => generateUUID(), []);
  const [localFile, setLocalFile] = useState<File | null>(null);
  const { fileUrl, fieldName } = useAppSelector((store) => store.fileSelect);

  useEffect(() => {
    if (fileUrl && fieldName === name) {
      element.src = fileUrl;
      dispatch(fileSelectReset());
    }
  }, [dispatch, element, fieldName, fileUrl, name]);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (isEdit && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setLocalFile(file);
      const newImageUrl = URL.createObjectURL(file);
      element.src = newImageUrl;
      dispatch(
        setSelectActive({
          active: true,
          fieldName: name,
          fileType: 'IMAGE',
        }),
      );
    }
  };

  useEffect(() => {
    return () => {
      if (localFile) {
        URL.revokeObjectURL(URL.createObjectURL(localFile));
      }
    };
  }, [localFile]);

  const displayImage = element.src;
  return (
    <div>
      <img
        className={isEdit ? 'select-img' : ''}
        style={isEdit ? { cursor: 'pointer' } : {}}
        src={displayImage}
        alt={element.alt ?? `圖片網址：${element.src}`}
        onDrag={(e) => e.preventDefault()}
        onClick={handleImageClick}
      />
      {isEdit && (
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      )}
    </div>
  );
};

export default SelectImage;
