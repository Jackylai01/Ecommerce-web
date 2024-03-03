export const handleDataConversion = (data: Record<string, any>) => {
  let dataToSend = new FormData();
  let hasFile = false;

  Object.keys(data).forEach((key) => {
    if (key === 'images' && Array.isArray(data[key])) {
      data[key].forEach((item: any, index: number) => {
        if (item.imageUrl instanceof File) {
          dataToSend.append('images', item.imageUrl, item.imageUrl.name);
          hasFile = true;
        }

        if (item.title !== undefined) {
          dataToSend.append(`titles[${index}]`, item.title);
        }
        if (item.url !== undefined) {
          dataToSend.append(`urls[${index}]`, item.url);
        }
      });
    } else if (key === 'blocks') {
      dataToSend.append(key, JSON.stringify(data[key]));
    } else {
      dataToSend.append(key, data[key]);
    }
  });

  let hasTitlesOrUrls = false;
  if (data.images && Array.isArray(data.images)) {
    hasTitlesOrUrls = data.images.some(
      (item) => item.title !== undefined || item.url !== undefined,
    );
  }

  return hasFile || hasTitlesOrUrls ? dataToSend : data;
};
