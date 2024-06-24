export type CategoryResponse = {
  _id: string;
  name: string;
  description: string;
  coverImage: {
    imageUrl: string;
    imageId: string;
  };
};
