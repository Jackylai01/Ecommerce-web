const colorList = ['#f8f8f4', '#197879', '#00b050', '#14578e', '#ff0000'];

export const baseQuillToolbar = [
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ color: colorList }],
  ['link'],
  ['clean'],
];

export const contentQuillToolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ color: colorList }],
  [
    { align: [] },
    { list: 'ordered' },
    { list: 'bullet' },
    { indent: '-1' },
    { indent: '+1' },
  ],
  ['link'],
  ['clean'],
];
