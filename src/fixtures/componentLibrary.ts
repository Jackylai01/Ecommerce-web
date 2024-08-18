export interface Component {
  id?: string;
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
  id?: string;
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
      { id: 'home', tagName: 'a', context: '首頁', href: '#' },
      { id: 'products', tagName: 'a', context: '產品', href: '#' },
      { id: 'about', tagName: 'a', context: '關於我們', href: '#' },
      { id: 'logo', tagName: 'img', context: '', href: '/', src: testImage },
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
      { id: 'shop', tagName: 'a', context: '商店', href: '#' },
      { id: 'category', tagName: 'a', context: '分類', href: '#' },
      { id: 'cart', tagName: 'a', context: '購物車', href: '#' },
      { id: 'contact', tagName: 'a', context: '聯繫我們', href: '#' },
    ],
  },
  fashion_hero: {
    type: 'fashion-hero',
    name: 'Fashion Hero',
    className: 'fashion-hero',
    style: {
      backgroundColor: '#ffffff',
      navItemColor: '#000000',
      backgroundGradient:
        'linear-gradient(to bottom right, rgba(59, 29, 116, 0.7), rgba(204, 51, 153, 0.6), transparent)',
    },
    elements: [
      {
        id: 'background',
        tagName: 'img',
        className: 'fashion-hero__background-img',
        src: testImage,
        alt: '時尚背景',
      },
      {
        id: 'product',
        tagName: 'img',
        className: 'fashion-hero__product-img',
        src: testImage,
        alt: '秋冬新品',
      },
      {
        id: 'heading',
        tagName: 'h1',
        className: 'fashion-hero__heading',
        context: '秋冬 新風尚',
      },
      {
        id: 'subheading',
        tagName: 'p',
        className: 'fashion-hero__subheading',
        context:
          '探索我們的2024秋冬系列，體驗前所未有的時尚魅力。每一件單品都是精心打造的藝術品。',
      },
      {
        id: 'button',
        tagName: 'button',
        className: 'fashion-hero__button',
        context: '立即選購',
        href: '/products',
      },
    ],
  },
  creative_hero: {
    type: 'creative-hero',
    name: 'Creative Hero',
    className: 'creative-hero',
    style: {
      backgroundColor: '#ffffff',
      backgroundGradient:
        'linear-gradient(to right, #6b46c1, #2c5282, #4c51bf)',
    },
    elements: [
      {
        id: 'image1',
        tagName: 'img',
        src: testImage,
        alt: 'Abstract 1',
        className:
          'creative-hero__images-image creative-hero__images-image--first',
      },
      {
        id: 'image2',
        tagName: 'img',
        src: testImage,
        alt: 'Abstract 2',
        className:
          'creative-hero__images-image creative-hero__images-image--second',
      },
      {
        id: 'image3',
        tagName: 'img',
        src: testImage,
        alt: 'Abstract 3',
        className:
          'creative-hero__images-image creative-hero__images-image--third',
      },
      {
        id: 'heading',
        tagName: 'h1',
        context: '創新視界，無限可能',
        className: 'creative-hero__content-title',
      },
      {
        id: 'subtitle',
        tagName: 'p',
        context:
          '我們融合藝術與科技，打造前所未有的數字體驗。讓我們一同探索未來！',
        className: 'creative-hero__content-subtitle',
      },
    ],
  },
  socks_subscription: {
    type: 'socks-subscription',
    name: 'Socks Subscription',
    className: 'socks-subscription',
    style: {
      backgroundColor: '#ffffff',
      backgroundGradient: 'linear-gradient(to right, #fbbf24, #f97316)',
    },
    elements: [
      {
        id: 'heading',
        tagName: 'h2',
        className: 'socks-subscription__heading',
        context: 'Fresh Socks Delivered Monthly, Right to Your Doorstep!',
      },
      {
        id: 'subtitle',
        tagName: 'p',
        className: 'socks-subscription__subtitle',
        context:
          'Receive two pairs of stylish, high-quality socks delivered to your door every month. Elevate your wardrobe effortlessly with fresh designs that keep your feet comfortable and fashionable.',
      },
      {
        id: 'button',
        tagName: 'button',
        className: 'socks-subscription__button',
        context: 'Subscribe Now',
        href: '/subscribe',
      },
      {
        id: 'image',
        tagName: 'img',
        className: 'socks-subscription__image',
        src: '/api/placeholder/300/200',
        alt: 'Socks with pine cones and flowers',
      },
    ],
  },
};
