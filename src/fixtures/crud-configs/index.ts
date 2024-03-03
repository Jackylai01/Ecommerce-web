import { FieldConfig } from '@components/Form';
import adminProfileCRUDConfig from './admin-profile';
import adminUserCRUDConfig from './admin-user';

export type TableDataConfig = {
  title: string;
  key: string;
  endKey?: string; // format='dateRange'
  format?:
    | 'longText'
    | 'number'
    | 'boolean'
    | 'date'
    | 'dateRange'
    | 'enum'
    | 'image'
    | 'custom'
    | 'object';
  customFormat?: (data?: any, config?: TableDataConfig) => any;
};

type TreeConfig = {
  nodeRequired?: object;
  previewUrl: string;
};

type ExtraAction = {
  label: string;
  color?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
};

export type CRUDConfig = {
  title: string;
  apiModuleName: string;
  layout: ('table' | 'form' | 'tree' | 'custom')[];
  actions: (
    | 'create'
    | 'update'
    | 'delete'
    | 'return'
    | 'save'
    | 'import'
    | 'download'
    | 'home'
  )[];
  listExtraActions?: ExtraAction[];
  detailExtraActions?: ExtraAction[];
  tableExtraActions?: ExtraAction[];
  tableConfigs?: TableDataConfig[];
  fieldConfigs?: FieldConfig[];
  treeConfig?: TreeConfig;
};

const crudConfigMap: { [key: string]: CRUDConfig } = {
  'admin-user': adminUserCRUDConfig,
  'admin-profile': adminProfileCRUDConfig,
};

export default crudConfigMap;
