import { CustomPageElement } from '@models/entities/custom-page-template';
import { useState } from 'react';

interface AddElementProps {
  onAdd: (element: CustomPageElement) => void;
}

export const AddElement: React.FC<AddElementProps> = ({ onAdd }) => {
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [src, setSrc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString(); // 簡單生成一個唯一ID

    if (type === 'text') {
      onAdd({ id, tagName: 'div', content });
    } else if (type === 'img') {
      onAdd({ id, tagName: 'img', src });
    }

    // 重置表單
    setType('');
    setContent('');
    setSrc('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value=''>Select Type</option>
        <option value='text'>Text</option>
        <option value='img'>Image</option>
      </select>
      {type === 'text' && (
        <input
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Text content'
        />
      )}
      {type === 'img' && (
        <input
          type='text'
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          placeholder='Image URL'
        />
      )}
      <button type='submit'>Add Element</button>
    </form>
  );
};
