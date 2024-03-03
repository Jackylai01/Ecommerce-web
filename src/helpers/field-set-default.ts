import { FieldConfig } from '@components/Form';
import { ItemParam, ItemParamDef } from '@models/entities/shared/item-param';
import { defaultDate } from './date';

export const fieldSetDefault = (
  sourceField: FieldConfig[],
  sourceData: any,
) => {
  let editField: any = {};

  if (!Array.isArray(sourceField)) {
    console.error('sourceField is not an array:', sourceField);
    return {};
  }

  sourceField.forEach((field) => {
    let defaultData = sourceData ? sourceData[field.name] : null;

    if (field.type === 'date' && defaultData) {
      defaultData = defaultDate(defaultData);
    }

    if (field.type === 'boolean') {
      defaultData = defaultData?.toString() === 'true';
    }

    editField[field.name] = defaultData;
  });

  return editField;
};

export const fieldSetParam = (
  sourceField: FieldConfig[],
  fieldName: string,
  paramDef: ItemParamDef[],
  paramSource: ItemParam[],
) => {
  const paramArray: ItemParam[] = [];
  for (const param of paramDef) {
    const target = paramSource.find((x) => x.name === param.name);
    const paramItem: ItemParam = {
      ...param,
      value: target?.value ?? '',
    };
    paramArray.push(paramItem);
  }
  sourceField = sourceField.map((item) =>
    item.name === fieldName
      ? {
          ...item,
          paramArray,
        }
      : item,
  );
  return sourceField;
};
