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
    _id: 'title_01',
    cover: '/block/title-1.png',
    block: {
      className: 'title',
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
];
