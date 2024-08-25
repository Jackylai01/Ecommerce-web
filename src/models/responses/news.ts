export interface NewsItem {
  _id: string;
  title: string;
  content: string;
  date: string;
  category: {
    _id: string;
    name: string;
  };
  coverImage: {
    imageUrl: string;
    imageId: string;
  };
  createdAt: string;
  updatedAt: string;
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
