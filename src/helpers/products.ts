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
