type CustomPageElement = {
  id?: any;
  tagName: string;
  className?: string;
  context?: string;
  alt?: string;
  src?: string;
  elements?: CustomPageElement[];
  image?: any;
  data?: string[][];
  dataTemplate?: CustomPageElement[];
  imageId?: string;
  [key: string]: any;
};

type CustomPageBlock = {
  className: string;
  elements: CustomPageElement[];
};

type CustomPageTemplate = {
  _id: string;
  cover: string;
  block: CustomPageBlock;
};

export type { CustomPageBlock, CustomPageElement, CustomPageTemplate };
