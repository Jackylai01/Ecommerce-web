import { CustomPageTemplate } from '@models/entities/custom-page-template';

const testText =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam magni, aliquid veritatis at unde dolorem quod dolor, sapiente, non architecto nam maiores ullam repellat earum praesentium ut. Amet, repudiandae provident.';
const testTitle = '標題文字';

export const testImage =
  'https://res.cloudinary.com/dqawkwte9/image/upload/v1705117456/gryubprhot8skehcqtxt.jpg';

export const customPageTemplates: CustomPageTemplate[] = [
  {
    _id: 'img_01',
    cover: '/block/image-size-selectable.png',
    block: {
      className: 'image-selectable',
      elements: [
        {
          tagName: 'img',
          src: testImage,
          size: 'medium',
        },
      ],
    },
  },
  {
    _id: 'img_02',
    cover: '/block/two-images.png',
    block: {
      className: 'two__images',
      elements: [
        {
          tagName: 'img',
          src: testImage,
          size: 'medium',
        },
        {
          tagName: 'img',
          src: testImage,
          size: 'medium',
        },
      ],
    },
  },
  {
    _id: 'post_01',
    cover: '/block/two-images.png',
    block: {
      className: 'post',
      elements: [
        {
          tagName: 'img',
          src: testImage,
          size: 'medium',
        },
        { tagName: 'p', context: testText },
      ],
    },
  },
  {
    _id: 'post_02',
    cover: '/block/two-images.png',
    block: {
      className: 'post-right',
      elements: [
        {
          tagName: 'img',
          src: testImage,
          size: 'medium',
        },
        { tagName: 'p', context: testText },
      ],
    },
  },
  {
    _id: 'post_03',
    cover: '/block/two-images.png',
    block: {
      className: 'post-right',
      elements: [
        { tagName: 'p', context: testText },
        {
          tagName: 'img',
          src: testImage,
          size: 'medium',
        },
      ],
    },
  },
  {
    _id: 'title_01',
    cover: '/block/title-1.png',
    block: {
      className: 'title',
      elements: [{ tagName: 'h2', context: testTitle }],
    },
  },
  {
    _id: 'title_02',
    cover: '/block/title-2.png',
    block: {
      className: 'title center',
      elements: [{ tagName: 'h2', context: testTitle }],
    },
  },
  {
    _id: 'title_03',
    cover: '/block/title-3.png',
    block: {
      className: 'title right',
      elements: [{ tagName: 'h2', context: testTitle }],
    },
  },
  {
    _id: 'text_01',
    cover: '/block/paragraph-1.png',
    block: {
      className: 'paragraph',
      elements: [{ tagName: 'span', context: testText }],
    },
  },
  {
    _id: 'text_02',
    cover: '/block/paragraph-2.png',
    block: {
      className: 'paragraph row',
      elements: [
        { tagName: 'span', className: 'row__col', context: testText },
        { tagName: 'span', className: 'row__col', context: testText },
      ],
    },
  },
  {
    _id: 'text_03',
    cover: '/block/paragraph-3.png',
    block: {
      className: 'paragraph row',
      elements: [
        { tagName: 'span', className: 'row__col', context: testText },
        { tagName: 'span', className: 'row__col', context: testText },
        { tagName: 'span', className: 'row__col', context: testText },
      ],
    },
  },
  {
    _id: 'table_01',
    cover: '/block/table-1.png',
    block: {
      className: '',
      elements: [
        {
          tagName: 'table',
          className: 'table-container__table table-container__table--info',
          hasSearchBar: false,
          data: [
            ['標題名稱', '標題名稱', '標題名稱'],
            ['標題內容', '標題內容', '標題內容'],
            ['標題內容', '標題內容', '標題內容'],
          ],
        },
      ],
    },
  },
  {
    _id: 'table_02',
    cover: '/block/table-2.png',
    block: {
      className: '',
      elements: [
        {
          tagName: 'table',
          className:
            'table-container__table table-container__table--info small',
          hasSearchBar: false,
          data: [
            ['標題名稱', '標題名稱', '標題名稱'],
            ['標題內容', '標題內容', '標題內容'],
            ['標題內容', '標題內容', '標題內容'],
          ],
        },
      ],
    },
  },
  {
    _id: 'link_01',
    cover: '/block/custom-links-2.png',
    block: {
      className: 'custom-links',
      elements: [
        {
          tagName: 'links',
          className: 'links links--card',
          data: [
            ['超連結文字', 'https://www.google.com.tw/', 'URL'],
            ['超連結文字', 'https://www.google.com.tw/', 'URL'],
          ],
        },
      ],
    },
  },
];
