export class ItemParamDef {
  /** Name */
  name: string = '';
  /** 型別 */
  type = ParamType.String;
  /** 選項 */
  options?: ParamOption[];
}

export class ItemParam extends ItemParamDef {
  /** 值 */
  value?: string | number;
}

export class ParamOption {
  /** 值 */
  value: string | number = '';
}

export enum ParamType {
  String = 'String',
  Number = 'Number',
  Options = 'Options',
}
