import { Input } from '@chakra-ui/react';
import { useState } from 'react';
import { ElementProps } from '..';

const VideoElement = ({ element, isEdit, onBlur }: ElementProps) => {
  const [url, setUrl] = useState(element.src || '');

  const handleUrlChange = (e: any) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    element.src = newUrl; // 更新 element 的 src
    if (onBlur) onBlur(); // 呼叫 onBlur 保存內容
  };

  return (
    <div className={element.className}>
      {isEdit ? (
        <Input
          placeholder='輸入影片網址'
          value={url}
          onChange={handleUrlChange}
          onBlur={onBlur}
        />
      ) : (
        url && (
          <iframe
            src={url}
            width='560'
            height='315'
            frameBorder='0'
            allowFullScreen
          ></iframe>
        )
      )}
    </div>
  );
};

export default VideoElement;
