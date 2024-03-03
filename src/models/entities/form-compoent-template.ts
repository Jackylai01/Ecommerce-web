interface Option {
  _id: string;
  label: string;
  value: string;
}

interface Field {
  /**ID */
  _id: string;
  /**組件類型 */
  fieldType: 'text' | 'select' | 'photo' | 'checkbox';
  /**標題 */
  label: string;
  /**欄位值 */
  options: Option[];
  /**是否必填 */
  isRequired?: boolean;
  /**單選 */
  fieldMode?: 'single' | 'multiple';
}

interface FormTemplate {
  _id: string;
  title: string;
  fields: Field[];
}
interface DynamicFormProps {
  onFormSubmit?: (templateId: string, formData: any) => void;
  template: FormTemplate;
  onSubmit?: (formData: FormResponseData) => void;
  onChange?: (data: any) => void;
}

interface FormResponseData {
  [key: string]: any;
}

export type { DynamicFormProps, Field, FormResponseData, FormTemplate, Option };
