import { fieldSetDefault } from '@helpers/field-set-default';
import { ModuleFolderName } from '@models/requests/archive.req';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import {
  FieldValues,
  FormProvider,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import Field from './Field';

export type FieldConfig = Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>,
  'pattern'
> &
  RegisterOptions & {
    name: string; // override InputHTMLAttributes
    type: string; // override InputHTMLAttributes
    label: string;
    hint?: string; // type='textarea'
    col?: number;
    options?: any[]; // type='select'
    displayOptions?: any[]; // type='select'
    disabledOptions?: any[]; // type='select'
    withEmptyOption?: boolean; // type='select'
    isMulti?: boolean; // type='select'
    fieldConfigs?: FieldConfig[]; // type='array'
    allowArrayActions?: boolean; // type='array'
    moduleName?: ModuleFolderName;
    folderName?: string; // type=ImageUpload
    copyField?: string; // type='Address'
    conditionObserver?: {
      observer: string;
      condition?: (value: any) => boolean;
      conditions?: string[];
      fromRootData?: boolean;
    };
    compareObserver?: {
      observer: string;
      condition: (value: any) => boolean;
      validate?: (value: any) => boolean | string | Promise<boolean | string>;
      newValidate: (value: any) => boolean | string | Promise<boolean | string>;
    };
    customDataSelect?: {
      sourceList: any[];
      displayFields: string[];
      targetKeys: string[];
      isMulti: boolean;
    };
  };

type Props = {
  fieldConfigs: FieldConfig[];
  resetData?: any;
  onSubmit: (data: any) => void;
  children?: React.ReactNode;
};

const Form = ({ fieldConfigs, onSubmit, resetData, children }: Props) => {
  const methods = useForm();
  const [isReset, setIsReset] = useState<boolean>(false);

  useEffect(() => {
    if (isReset) return;
    methods.reset(fieldSetDefault(fieldConfigs, resetData));
    setIsReset(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetData]);

  return (
    <FormProvider {...methods}>
      <form className='form' onSubmit={methods.handleSubmit(onSubmit)}>
        <article className='row'>
          {fieldConfigs.map((fieldConfig) => (
            <Field key={fieldConfig.name} fieldConfig={fieldConfig} />
          ))}
          {children}
        </article>
      </form>
    </FormProvider>
  );
};

export default Form;
