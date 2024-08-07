export interface Component {
  type: string;
  name: string;
  className?: string;
  elements?: IDesignPageElement[];
  content?: string;
  style?: {
    backgroundColor?: string;
    navItemColor?: string;
    backgroundImage?: string;
    backgroundGradient?: string;
    backgroundOpacity?: number;
  };
}

export interface IDesignPageElement {
  tagName: string;
  className?: string;
  context?: string;
  alt?: string;
  src?: string;
  href?: string;
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
      backgroundOpacity: 0,
    },
    elements: [
      { tagName: 'a', context: '商店', href: '#' },
      { tagName: 'a', context: '分類', href: '#' },
      { tagName: 'a', context: '購物車', href: '#' },
      { tagName: 'a', context: '聯繫我們', href: '#' },
    ],
  },
  fashion_hero: {
    type: 'fashion_hero',
    name: 'Fashion Hero',
    className: 'fashion-hero',
    style: {
      backgroundColor: '#ffffff',
      navItemColor: '#000000',
      backgroundImage: '',
      backgroundGradient:
        'linear-gradient(to bottom right, rgba(59, 29, 116, 0.7), rgba(204, 51, 153, 0.6), transparent)',
    },
    elements: [
      {
        tagName: 'img',
        className: 'fashion-hero__background-img',
        src: '',
        alt: '時尚背景',
      },
      {
        tagName: 'img',
        className: 'fashion-hero__product-img',
        src: testImage,
        alt: '秋冬新品',
      },
      {
        tagName: 'h1',
        className: 'fashion-hero__heading',
        context: '秋冬 新風尚',
      },
      {
        tagName: 'p',
        className: 'fashion-hero__subheading',
        context:
          '探索我們的2024秋冬系列，體驗前所未有的時尚魅力。每一件單品都是精心打造的藝術品。',
      },
      {
        tagName: 'button',
        className: 'fashion-hero__button',
        context: '立即選購',
        href: '/products',
      },
    ],
  },
};
