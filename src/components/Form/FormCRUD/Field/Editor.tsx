import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
interface BlocksEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const BlocksEditor = ({ value, onChange }: BlocksEditorProps) => {
  const [editorValue, setEditorValue] = useState(value);

  // 配置Quill的模块来使用自定义的图片上传处理函数
  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['image', 'link'],
      ],
    },
  };

  const handleEditorChange = (content: any) => {
    setEditorValue(content);
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <Box w='100%'>
      <ReactQuill
        theme='snow'
        value={editorValue}
        onChange={handleEditorChange}
        modules={modules}
      />
    </Box>
  );
};

export default BlocksEditor;
