export interface NewsItem {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  category?: any;
  coverImage: {
    imageUrl: string;
    imageId: string;
  };
  blocks: any;
}

export interface ApiPaginationResult<T> {
  data: T[];
  metadata: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ApiResult<T> {
  result: T;
}
