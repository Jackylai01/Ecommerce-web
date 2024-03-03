import { useFormContext, UseFormReturn } from 'react-hook-form';
import { FieldConfig } from '..';
import ArrayFields from './src/ArrayFields';
import BooleanField from './src/BooleanField';
import EqualFields from './src/EqualFields';
import FileSelect from './src/FileSelect';
import HiddenInput from './src/HiddenInput';
import Input from './src/Input';
import MultiSelect from './src/MultiSelect';
import RadioOrCheckbox from './src/RadioOrCheckbox';
import Select from './src/Select';

import CustomBlocks from './src/CustomBlocks';
import ImageUpload from './src/ImageUpload';
import Tags from './src/Tags';
import Textarea from './src/Textarea';

type Props = {
  fieldConfig: FieldConfig;
};
export type InnerProps = UseFormReturn & {
  fieldConfig: FieldConfig;
};

const Field = ({ fieldConfig }: Props) => {
  // 從 useFormContext 中獲得 react-hook-form 提供的各種方法
  const methods = useFormContext();
  // 從 methods 中獲取 watch 方法
  const { watch } = methods;

  // 建立一個新的 FieldConfig，如果 placeholder 或 col 未被指定，則賦予它們預設值
  const updatedFieldConfig = {
    ...fieldConfig,
    placeholder: fieldConfig.placeholder ?? `請輸入${fieldConfig.label}`, // 如果沒有設定 placeholder，則設定為 `請輸入${fieldConfig.label}`
    col: fieldConfig.col ?? 12, // 如果沒有設定 col，則設定為 12
  };

  // 檢查是否有設定 conditionObserver
  if (fieldConfig.conditionObserver) {
    // 根據條件生成觀察欄位名
    const arrayFieldName =
      fieldConfig.name.includes('.') &&
      !fieldConfig.conditionObserver.fromRootData
        ? fieldConfig.name.split('.').slice(0, -1).join('.') + '.'
        : '';
    const observer = `${arrayFieldName}${fieldConfig.conditionObserver.observer}`;

    // 觀察 observer 欄位的值
    const observerValue = watch(observer);

    const condition = fieldConfig.conditionObserver.condition;
    // 如果 condition 函數存在且返回 false，則不渲染此欄位
    if (condition && !condition(observerValue)) {
      return <></>;
    }

    const conditions = fieldConfig.conditionObserver.conditions;
    // 如果 conditions 存在且所有條件都不等於 observerValue，則不渲染此欄位
    if (
      conditions &&
      !conditions.map((item) => item !== observerValue).includes(false)
    ) {
      return <></>;
    }
  }

  // 檢查是否有設定 compareObserver
  if (fieldConfig.compareObserver) {
    // 根據條件生成觀察欄位名
    const arrayFieldName = fieldConfig.name.includes('.')
      ? fieldConfig.name.split('.').slice(0, -1).join('.') + '.'
      : '';
    const observer = `${arrayFieldName}${fieldConfig.compareObserver.observer}`;

    // 觀察 observer 欄位的值
    const observerValue = watch(observer);
    const condition = fieldConfig.compareObserver.condition(observerValue);
    // 如果 condition 返回 true，則使用新的驗證方法，否則使用原來的驗證方法
    fieldConfig.validate = condition
      ? fieldConfig.compareObserver.newValidate
      : fieldConfig.compareObserver.validate;
  }
  switch (fieldConfig.type) {
    case 'customBlocks':
      return <CustomBlocks {...methods} fieldConfig={fieldConfig} />;
    case 'textarea':
      return <Textarea {...methods} fieldConfig={updatedFieldConfig} />;
    case 'radio':
    case 'checkbox':
      return <RadioOrCheckbox {...methods} fieldConfig={updatedFieldConfig} />;
    case 'select':
      return <Select {...methods} fieldConfig={updatedFieldConfig} />;
    case 'multiSelect':
      return <MultiSelect {...methods} fieldConfig={updatedFieldConfig} />;
    case 'boolean':
      return <BooleanField {...methods} fieldConfig={updatedFieldConfig} />;
    case 'tags':
      return <Tags {...methods} fieldConfig={updatedFieldConfig} />;
    case 'imageSelect':
    case 'videoSelect':
      return <FileSelect {...methods} fieldConfig={updatedFieldConfig} />;
    case 'hidden':
      return <HiddenInput {...methods} fieldConfig={updatedFieldConfig} />;
    case 'array':
      return <ArrayFields {...methods} fieldConfig={updatedFieldConfig} />;
    case 'equalFields':
      return <EqualFields {...methods} fieldConfig={updatedFieldConfig} />;
    case 'imageUpload':
      return <ImageUpload {...methods} fieldConfig={updatedFieldConfig} />;
    default:
      return <Input {...methods} fieldConfig={updatedFieldConfig} />;
  }
};

export default Field;
