export const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'], // 在工具栏中添加图片按钮
      ['clean'],
    ],
    handlers: {
      // image: imageHandler, // 自定义图片处理函数
    },
  },
};
