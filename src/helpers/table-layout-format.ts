import { TableDataConfig } from '@fixtures/crud-configs';
import { dateRange } from './date';
import { dotKeysValue } from './object';

export const tableLayoutFormat = (data: any, config: TableDataConfig) => {
  const { key, endKey, format, customFormat } = config;
  const value = dotKeysValue(data, key);

  switch (format) {
    case 'boolean':
      return value ? '是' : '否';
    case 'date':
      return value && new Date(value as Date).toLocaleDateString();
    case 'dateRange':
      const endValue = data[endKey!];
      if (!value || !endValue) return;
      return dateRange(value as Date, endValue);
    case 'enum':
      return customFormat && customFormat(value);
    case 'custom':
      return customFormat && customFormat(data, config);
    default:
      return value;
  }
};
