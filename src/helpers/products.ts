import { IItem, NavItem } from '@models/requests/products';

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
];

export const fakeCategories = [
  {
    id: '1',
    name: 'Electronics',
    image: '/images/categories/electrpmocs.png',
    slug: 'electronics',
  },
  {
    id: '2',
    name: 'Shoes',
    image: '/images/categories/shoes.png',
    slug: 'shoes',
  },
  {
    id: '3',
    name: 'Watches',
    image: '/images/categories/watches.png',
    slug: 'watches',
  },
  {
    id: '4',
    name: 'Jewelry',
    image: '/images/categories/jewelry.png',
    slug: 'jewelry',
  },
];

export const fakeProducts = [
  {
    id: '1',
    name: 'Product 1',
    description: 'This is a description for Product 1',
    price: 99.99,
    rating: { rate: 4.5, count: 120 },
    mainImage: '/images/categories/shoes.png',
    slug: 'product-1',
    category: {
      id: 'cat1',
      name: 'Electronics',
      image: '/images/categories/shoes.png',
      slug: 'Electronics',
    },
    gallery: ['/images/categories/shoes.png', '/images/categories/shoes.png'],
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'This is a description for Product 1',
    price: 99.99,
    rating: { rate: 4.1, count: 89 },
    mainImage: '/images/categories/shoes.png',
    slug: 'product-1',
    category: {
      id: 'cat1',
      name: 'Electronics',
      image: '/images/categories/shoes.png',
      slug: 'Electronics',
    },
    gallery: ['/images/categories/shoes.png', '/images/categories/shoes.png'],
  },
  {
    id: '3',
    name: 'Product 3',
    description: 'This is a description for Product 1',
    price: 99.99,
    rating: { rate: 4.1, count: 89 },
    mainImage: '/images/categories/shoes.png',
    slug: 'product-1',
    category: {
      id: 'cat1',
      name: 'Category 1',
      image: '/images/categories/shoes.png',
      slug: 'category-1',
    },
    gallery: ['/images/categories/shoes.png', '/images/categories/shoes.png'],
  },
  {
    id: '4',
    name: 'Product 4',
    description: 'This is a description for Product 1',
    price: 99.99,
    rating: { rate: 4.1, count: 89 },
    mainImage: '/images/categories/shoes.png',
    slug: 'product-1',
    category: {
      id: 'cat1',
      name: 'Category 1',
      image: '/images/categories/shoes.png',
      slug: 'category-1',
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
      id: 'cat1',
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
      id: 'cat1',
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
      id: 'cat1',
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
      id: 'cat1',
      name: 'Category 1',
      image: '/path/to/category1.jpg',
      slug: 'category-1',
    },
    gallery: ['/path/to/image1.jpg', '/path/to/image2.jpg'],
  },
];
