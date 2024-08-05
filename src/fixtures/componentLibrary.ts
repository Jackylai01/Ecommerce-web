export interface Component {
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

export interface IDesignPageElement {
  tagName: string;
  className?: string;
  context?: string;
  alt?: string;
  src?: string;
  elements?: IDesignPageElement[];
  data?: string[][];
  [key: string]: any;
}

export const componentLibrary: Record<string, Component> = {
  navbar_a: {
    type: 'navbar_01',
    name: 'Navbar A',
    className: 'navbar',
    style: {
      backgroundColor: '#ffffff',
      navItemColor: '#000000',
    },
    elements: [
      { tagName: 'a', context: '首頁', href: '#' },
      { tagName: 'a', context: '產品', href: '#' },
      { tagName: 'a', context: '關於我們', href: '#' },
    ],
  },
  navbar_b: {
    type: 'navbar_02',
    name: 'Navbar B',
    className: 'navbar_second',
    style: {
      backgroundColor: '#ffffff',
      navItemColor: '#000000',
    },
    elements: [
      { tagName: 'a', context: '商店', href: '#' },
      { tagName: 'a', context: '分類', href: '#' },
      { tagName: 'a', context: '購物車', href: '#' },
      { tagName: 'a', context: '聯繫我們', href: '#' },
    ],
  },
  footer_a: {
    type: 'footer',
    name: 'Footer A',
    className: 'footer',
    elements: [
      { tagName: 'a', context: '隱私政策', href: '#' },
      { tagName: 'a', context: '使用條款', href: '#' },
      { tagName: 'a', context: '聯繫我們', href: '#' },
    ],
  },
  footer_b: {
    type: 'footer',
    name: 'Footer B',
    className: 'footer',
    elements: [
      { tagName: 'a', context: '關於我們', href: '#' },
      { tagName: 'a', context: '客戶服務', href: '#' },
      { tagName: 'a', context: '社交媒體', href: '#' },
    ],
  },
  main_section: {
    type: 'main',
    name: 'Main Section',
    className: 'main-section',
    content: '這是主要內容區域。您可以在這裡添加文字、圖片和其他元素。',
  },
  card_a: {
    type: 'card',
    name: 'Card A',
    className: 'card',
    content: '這是卡片 A 的內容。它可以包含產品信息、文章摘要等。',
  },
  card_b: {
    type: 'card',
    name: 'Card B',
    className: 'card',
    content: '這是卡片 B 的內容。它可以用於顯示團隊成員、服務項目等。',
  },
};
