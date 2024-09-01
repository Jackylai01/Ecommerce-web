import { CustomPageTemplate } from '@models/entities/custom-page-template';

const testText =
  '在一個遙遠的國度，住著一群勤勞的村民。他們日出而作，日落而息，過著簡單而充實的生活。這個村莊四周環繞著青山綠水，村民們與自然和諧共處，年復一年，四季分明，生機盎然。儘管生活樸實無華，但村民們對未來充滿了希望，並且每天都在努力創造更美好的明天。';
const testTitle = '標題文字';

export const testImage =
  'https://res.cloudinary.com/dqawkwte9/image/upload/v1705117456/gryubprhot8skehcqtxt.jpg';

export const testVideo = 'https://www.youtube.com/embed/MLNhLvA6Hto';

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
      className: 'table',
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
    _id: 'video_01',
    cover: '/block/table-1.png',
    block: {
      className: 'video-block',
      elements: [
        {
          tagName: 'video',
          src: testVideo,
        },
      ],
    },
  },
];
