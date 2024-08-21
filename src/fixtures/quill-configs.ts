const colorList = [
  '#000000', // 黑色
  '#f8f8f4', // 亮白
  '#197879', // 深青绿
  '#00b050', // 绿
  '#14578e', // 蓝
  '#ff0000', // 红
  '#ffc000', // 金黄
  '#0070c0', // 中藍
  '#7030a0', // 暗紫
  '#f4b183', // 淺橘色
  '#a9d18e', // 浅綠
  '#ed7d31', // 橘色
  '#4472c4', // 藍色
  '#5b9bd5', // 天藍
  '#70ad47', // 草綠
  '#255e91', // 海軍藍
  '#9e480e', // 赤褐色
  '#997300', // 芥末黄
  '#43682b', // 森林绿
  '#75523c', // 咖啡色
  '#636363', // 石板灰
];

export const baseQuillToolbar = [
  [{ header: [1, 2, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
  [{ color: colorList }],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['link'],
  [{ align: [] }],
  ['clean'],
];

export const contentQuillToolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ color: colorList }],
  [{ size: ['small', false, 'large', 'huge'] }],
  ['link'],
  ['clean'],
];
