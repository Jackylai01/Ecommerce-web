import { IItem, NavItem } from '@models/requests/products';

export const formatPrice = (value: number): string => {
  return value.toFixed(2);
};

export const getSubstring = (text: string, substringEnd: number): string => {
  return text?.length > substringEnd
    ? `${text?.substring(0, substringEnd)}...`
    : text;
};

export const calculateItemsTotal = (items: IItem[]): number => {
  return items
    .map((item) => ({ price: item.price, count: item.count }))
    .reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.price * currentValue.count,
      0,
    );
};

export const navItems: NavItem[] = [
  {
    label: 'All Products',
    href: '/products',
  },
  {
    label: 'Categories',
    href: '/categories',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'News',
    href: '/news',
  },
  {
    label: 'Faq',
    href: '/faq',
  },
];

export const fakeCategories = [
  {
    _id: '1',
    name: 'Electronics',
    coverImage: {
      imageUrl: '/images/categories/shoes.png',
    },
    slug: 'electronics',
  },
  {
    _id: '2',
    name: 'Shoes',
    coverImage: {
      imageUrl: '/images/categories/shoes.png',
    },
    slug: 'shoes',
  },
  {
    _id: '3',
    name: 'Watches',
    coverImage: {
      imageUrl: '/images/categories/watches.png',
    },
    slug: 'watches',
  },
  {
    _id: '4',
    name: 'Jewelry',
    coverImage: {
      imageUrl: '/images/categories/jewelry.png',
    },
    slug: 'jewelry',
  },
];

export const fakeProducts = [
  {
    _id: '1',
    name: 'Product 1',
    description: 'This is a description for Product 1',
    price: 99.99,
    rating: { rate: 4.5, count: 120 },
    mainImage: '/images/categories/shoes.png',
    slug: 'product-1',
    category: {
      _id: '1',
      name: 'Electronics',
      coverImage: {
        imageUrl: '/images/categories/shoes.png',
      },
      slug: 'electronics',
    },
    gallery: ['/images/categories/shoes.png', '/images/categories/shoes.png'],
  },
  {
    _id: '2',
    name: 'Product 2',
    description: 'This is a description for Product 2',
    price: 99.99,
    rating: { rate: 4.1, count: 89 },
    mainImage: '/images/categories/shoes.png',
    slug: 'product-2',
    category: {
      _id: '2',
      name: 'Shoes',
      coverImage: {
        imageUrl: '/images/categories/shoes.png',
      },
      slug: 'shoes',
    },
    gallery: ['/images/categories/shoes.png', '/images/categories/shoes.png'],
  },
  {
    _id: '3',
    name: 'Product 3',
    description: 'This is a description for Product 3',
    price: 99.99,
    rating: { rate: 4.1, count: 89 },
    mainImage: '/images/categories/shoes.png',
    slug: 'product-3',
    category: {
      _id: '3',
      name: 'Watches',
      coverImage: {
        imageUrl: '/images/categories/watches.png',
      },
      slug: 'watches',
    },
    gallery: ['/images/categories/shoes.png', '/images/categories/shoes.png'],
  },
  {
    _id: '4',
    name: 'Product 4',
    description: 'This is a description for Product 4',
    price: 99.99,
    rating: { rate: 4.1, count: 89 },
    mainImage: '/images/categories/shoes.png',
    slug: 'product-4',
    category: {
      _id: '4',
      name: 'Jewelry',
      coverImage: {
        imageUrl: '/images/categories/jewelry.png',
      },
      slug: 'jewelry',
    },
    gallery: ['/images/categories/shoes.png', '/images/categories/shoes.png'],
  },
];

export const fakeProducts1 = [
  {
    id: '1',
    name: 'Product 1',
    description: 'This is a description for Product 1',
    price: 99.99,
    rating: { rate: 4.5, count: 120 },
    mainImage: '/path/to/image1.jpg',
    slug: 'product-1',
    category: {
      id: '1',
      name: 'Category 1',
      image: '/path/to/category1.jpg',
      slug: 'category-1',
    },
    gallery: ['/path/to/image1.jpg', '/path/to/image2.jpg'],
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'This is a description for Product 1',
    price: 99.99,
    rating: { rate: 4.1, count: 89 },
    mainImage: '/path/to/image1.jpg',
    slug: 'product-1',
    category: {
      id: '2',
      name: 'Category 1',
      image: '/path/to/category1.jpg',
      slug: 'category-1',
    },
    gallery: ['/path/to/image1.jpg', '/path/to/image2.jpg'],
  },
  {
    id: '3',
    name: 'Product 3',
    description: 'This is a description for Product 1',
    price: 99.99,
    rating: { rate: 4.1, count: 89 },
    mainImage: '/path/to/image1.jpg',
    slug: 'product-1',
    category: {
      id: '3',
      name: 'Category 1',
      image: '/path/to/category1.jpg',
      slug: 'category-1',
    },
    gallery: ['/path/to/image1.jpg', '/path/to/image2.jpg'],
  },
  {
    id: '4',
    name: 'Product 4',
    description: 'This is a description for Product 1',
    price: 99.99,
    rating: { rate: 4.1, count: 89 },
    mainImage: '/path/to/image1.jpg',
    slug: 'product-1',
    category: {
      id: '4',
      name: 'Category 1',
      image: '/path/to/category1.jpg',
      slug: 'category-1',
    },
    gallery: ['/path/to/image1.jpg', '/path/to/image2.jpg'],
  },
];
