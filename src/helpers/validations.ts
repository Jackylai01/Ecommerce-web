export const positiveIntegerValidation = (value: number) =>
  value > 0 || '輸入值需大於 0';

export const naturalIntegerValidation = (value: number) =>
  value >= 0 || '輸入值需大於 0 或等於 0';
