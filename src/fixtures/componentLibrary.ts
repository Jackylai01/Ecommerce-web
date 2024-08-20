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
    width?: number;
    height?: number;
    imageAlignment?: string;
  };
}

export interface IDesignPageElement {
  id?: string;
  tagName: string;
  className?: string;
  context?: string;
  icon?: string;
  alt?: string;
  src?: string;
  href?: string;
  style?: any;
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
          'Receive two pairs of stylish, high-quality socks delivered to your door every month.',
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
        src: testImage,
        alt: 'Socks with pine cones and flowers',
      },
      {
        id: 'icon-text-blocks',
        tagName: 'aside',
        className: 'socks-subscription__icon-text-blocks',
        elements: [
          {
            id: 'block-1',
            tagName: 'span',
            icon: 'Truck',
            context: 'Free Shipping',
          },
          {
            id: 'block-2',
            tagName: 'span',
            icon: 'PhoneCall',
            context: 'Support 24/7',
          },
          {
            id: 'block-3',
            tagName: 'span',
            icon: 'RefreshCcw',
            context: 'Money return',
          },
          {
            id: 'block-4',
            tagName: 'span',
            icon: 'Package',
            context: 'Order Discounts',
          },
        ],
      },
    ],
  },
  product_grid: {
    type: 'product-grid',
    name: 'Product Grid',
    className: 'product-grid medium',
    style: {
      backgroundColor: '#ffffff',
    },
    elements: [
      {
        id: 'product-1',
        tagName: 'img',
        src: testImage,
        href: '#',
        context: '產品 1',
        className: 'medium',
      },
      {
        id: 'product-2',
        tagName: 'img',
        src: testImage,
        href: '#',
        context: '產品 2',
        className: 'medium',
      },
      {
        id: 'product-3',
        tagName: 'img',
        src: testImage,
        href: '#',
        context: '產品 3',
        className: 'medium',
      },
    ],
  },
  background_image: {
    type: 'background-image',
    name: 'Background Image',
    className: 'background-image',
    elements: [
      {
        id: 'background-img',
        tagName: 'img',
        src: testImage,
        alt: '背景圖片',
        href: '#',
        className: 'background-img',
        style: {
          width: '300px',
          height: '200px',
        },
      },
    ],
  },
  footer_a: {
    type: 'footer',
    name: 'Footer',
    className: 'ecommerce-footer',
    style: {
      backgroundColor: '#1a202c',
      backgroundGradient: 'linear-gradient(to right, #2c3e50, #fd746c)',
    },
    elements: [
      {
        id: 'about-us',
        tagName: 'section',
        className: 'ecommerce-footer__section',
        elements: [
          {
            id: 'about-us-title',
            tagName: 'h3',
            context: '關於我們',
            className: 'ecommerce-footer__title',
          },
          {
            id: 'company-profile',
            tagName: 'a',
            context: '公司簡介',
            href: '#',
            className: 'ecommerce-footer__link',
          },
          {
            id: 'our-mission',
            tagName: 'a',
            context: '我們的使命',
            href: '#',
            className: 'ecommerce-footer__link',
          },
        ],
      },
      {
        id: 'customer-service',
        tagName: 'section',
        className: 'ecommerce-footer__section',
        elements: [
          {
            id: 'customer-service-title',
            tagName: 'h3',
            context: '客戶服務',
            className: 'ecommerce-footer__title',
          },
          {
            id: 'contact-us',
            tagName: 'a',
            context: '聯繫我們',
            href: '#',
            className: 'ecommerce-footer__link',
          },
          {
            id: 'return-policy',
            tagName: 'a',
            context: '退換貨政策',
            href: '#',
            className: 'ecommerce-footer__link',
          },
        ],
      },
      {
        id: 'social-media',
        tagName: 'section',
        className: 'ecommerce-footer__social',
        elements: [
          {
            id: 'facebook-link',
            tagName: 'a',
            icon: 'FaFacebookF',
            href: '#',
            alt: 'Facebook',
            className: 'ecommerce-footer__icon',
          },
          {
            id: 'instagram-link',
            tagName: 'a',
            icon: 'FaInstagram',
            href: '#',
            alt: 'Instagram',
            className: 'ecommerce-footer__icon',
          },
          {
            id: 'twitter-link',
            tagName: 'a',
            icon: 'FaTwitter',
            href: '#',
            alt: 'Twitter',
            className: 'ecommerce-footer__icon',
          },
        ],
      },
    ],
  },
};
