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
  type: string;
  name: string;
  className?: string;
  elements?: IDesignPageElement[];
  content?: string;
  style?: {
    backgroundColor?: string;
    navItemColor?: string;
  };
}

export interface IDesignPage {
  route: string;
  blocks: IDesignPageBlock[];
}
