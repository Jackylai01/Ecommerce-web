export interface IDesignPageElement {
  tagName: string;
  className?: string;
  context?: string;
  alt?: string;
  src?: string;
  elements?: IDesignPageElement[];
  data?: string[][];
  [key: string]: any; // 支持任意字段
}

export interface IDesignPageBlock {
  className: string;
  elements: IDesignPageElement[];
}

export interface IDesignPage {
  route: string;
  blocks: IDesignPageBlock[];
}
