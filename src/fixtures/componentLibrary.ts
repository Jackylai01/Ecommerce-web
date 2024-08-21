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
      {
        id: 'copyright',
        tagName: 'span',
        className: 'ecommerce-footer__copyright',
        context: '&copy; 2024 您的電商網站名稱. 保留所有權利。',
        editable: true,
      },
    ],
  },
  modern_footer: {
    type: 'modern-footer',
    name: 'Modern Footer',
    className: 'modern-footer',
    style: {
      backgroundColor: '#ffffff',
      backgroundGradient: 'linear-gradient(to right, #333333, #666666)',
    },
    elements: [
      {
        id: 'about-us',
        tagName: 'section',
        className: 'modern-footer__section',
        context: '關於我們',
        elements: [
          {
            id: 'about-text',
            tagName: 'p',
            className: 'modern-footer__text',
            context: '我們是一家致力於提供高品質產品的電商平台。',
          },
        ],
      },
      {
        id: 'customer-service',
        tagName: 'section',
        className: 'modern-footer__section', // 新增 className
        context: '客戶服務',
        elements: [
          {
            id: 'contact-us',
            tagName: 'a',
            className: 'modern-footer__link', // 新增 className
            context: '聯繫我們',
            href: '#',
          },
          {
            id: 'return-policy',
            tagName: 'a',
            className: 'modern-footer__link', // 新增 className
            context: '退換貨政策',
            href: '#',
          },
          {
            id: 'faq',
            tagName: 'a',
            className: 'modern-footer__link', // 新增 className
            context: '常見問題',
            href: '#',
          },
        ],
      },
      {
        id: 'quick-links',
        tagName: 'section',
        className: 'modern-footer__section',
        context: '快速連結',
        elements: [
          {
            id: 'home',
            tagName: 'a',
            className: 'modern-footer__link',
            context: '首頁',
            href: '#',
          },
          {
            id: 'products',
            tagName: 'a',
            className: 'modern-footer__link',
            context: '產品',
            href: '#',
          },
          {
            id: 'promotions',
            tagName: 'a',
            className: 'modern-footer__link',
            context: '優惠活動',
            href: '#',
          },
        ],
      },
      {
        id: 'newsletter',
        tagName: 'section',
        className: 'modern-footer__section',
        context: '訂閱電子報',
        elements: [
          {
            id: 'email-input',
            tagName: 'input',
            className: 'modern-footer__input',
            context: '',
            placeholder: '輸入您的電子郵件',
          },
          {
            id: 'subscribe-button',
            tagName: 'button',
            className: 'modern-footer__button',
            context: '訂閱',
            href: '#',
          },
        ],
      },
      {
        id: 'social-media',
        tagName: 'section',
        className: 'modern-footer__social',
        elements: [
          {
            id: 'facebook-link',
            tagName: 'a',
            className: 'modern-footer__icon',
            icon: 'FaFacebookF',
            href: '#',
            alt: 'Facebook',
          },
          {
            id: 'instagram-link',
            tagName: 'a',
            className: 'modern-footer__icon',
            icon: 'FaInstagram',
            href: '#',
            alt: 'Instagram',
          },
          {
            id: 'twitter-link',
            tagName: 'a',
            className: 'modern-footer__icon',
            icon: 'FaTwitter',
            href: '#',
            alt: 'Twitter',
          },
        ],
      },
      {
        id: 'copyright',
        tagName: 'span',
        className: 'modern-footer__copyright',
        context: '&copy; 2024 您的電商網站名稱. 保留所有權利。',
        editable: true,
      },
    ],
  },
  enhanced_shopping_highlights: {
    type: 'shopping-highlights',
    name: 'Enhanced Shopping Highlights',
    className: 'shopping-highlights',
    style: {
      backgroundColor: '#ffffff',
    },
    elements: [
      {
        id: 'title',
        tagName: 'h2',
        context: '產品列表',
        className: 'shopping-highlights__title',
        style: {
          textAlign: 'center',
          margin: '20px 0',
        },
      },
      {
        id: 'product_grid',
        tagName: 'main',
        className: 'shopping-highlights__grid',
        elements: [
          {
            id: 'product_item',
            tagName: 'section',
            className: 'shopping-highlights__item',
            elements: [
              {
                id: 'product_image_container',
                tagName: 'article',
                className: 'shopping-highlights__image-container',
                elements: [
                  {
                    id: 'product_image',
                    tagName: 'img',
                    src: '',
                    alt: '封面圖片',
                    className: 'shopping-highlights__image',
                  },
                ],
              },
              {
                id: 'product_content',
                tagName: 'section',
                className: 'shopping-highlights__content',
                elements: [
                  {
                    id: 'product_title',
                    tagName: 'h3',
                    context: '',
                    className: 'shopping-highlights__product-title',
                  },
                  {
                    id: 'product_description',
                    tagName: 'p',
                    context: '',
                    className: 'shopping-highlights__description',
                  },
                  {
                    id: 'product_footer',
                    tagName: 'aside',
                    className: 'shopping-highlights__footer',
                    elements: [
                      {
                        id: 'product_price',
                        tagName: 'span',
                        context: '',
                        className: 'shopping-highlights__price',
                      },
                      {
                        id: 'add_to_cart_button',
                        tagName: 'button',
                        className: 'add-to-cart-button',
                        context: 'Add to Cart',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
