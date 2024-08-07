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

export const testImage =
  'https://res.cloudinary.com/dqawkwte9/image/upload/v1705117456/gryubprhot8skehcqtxt.jpg';

export const componentLibrary: Record<string, Component> = {
  navbar_a: {
    type: 'navbar',
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
      { tagName: 'img', context: '', href: '/', src: testImage },
    ],
  },
  navbar_b: {
    type: 'navbar_second',
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
};
