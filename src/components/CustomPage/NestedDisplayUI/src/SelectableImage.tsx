import generateUUID from '@helpers/generate-uuid';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { adminUploadAsync } from '@reducers/admin/upload/actions';
import React, { useEffect, useRef, useState } from 'react';
import { ElementProps } from '..';

const SelectableImage = ({
  element,
  isEdit,
  tempProductId,
}: ElementProps & { tempProductId?: string }) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageId, setImageId] = useState<string>(() => generateUUID());
  const [src, setSrc] = useState<any>(element.src);

  const uploadedImages = useAppSelector(
    (state) => state.adminUpload.uploadedImages,
  );

  useEffect(() => {
    const matchingImage = uploadedImages.find(
      (image) => image.imageId === imageId,
    );
    if (matchingImage) {
      setSrc(matchingImage.imageUrl);
    }
  }, [uploadedImages, imageId]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      // 上传图片时，连同唯一标识符一起传递
      const action = await dispatch(
        adminUploadAsync({ file, tempProductId, imageId }),
      ).unwrap();
      setSrc(action.imageUrl);

      setImageId(action.imageId);
    }
  };

  return (
    <div onClick={() => isEdit && fileInputRef.current?.click()}>
      <img src={src} alt='Selectable' />
      {isEdit && (
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      )}
    </div>
  );
};

export default SelectableImage;
