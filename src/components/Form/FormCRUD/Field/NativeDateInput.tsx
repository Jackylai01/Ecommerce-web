import React from 'react';

interface NativeDateInputProps {
  name: string;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  defaultValue?: string; // 确保有 defaultValue 属性
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // 添加 onChange 方法类型
}

const NativeDateInput: React.FC<NativeDateInputProps> = ({
  name,
  label,
  placeholder,
  isRequired = false,
  defaultValue,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type='date'
        placeholder={placeholder}
        required={isRequired}
        defaultValue={defaultValue}
        onChange={onChange} // 使用传递的 onChange 函数
        style={{
          display: 'block',
          margin: '8px 0',
          padding: '8px',
          borderColor: 'gray',
          borderWidth: '1px',
        }}
      />
    </div>
  );
};

export default NativeDateInput;
