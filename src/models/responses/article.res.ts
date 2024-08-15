export interface Article {
  _id: string;
  title: string;
  content: string;
  author: any;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  tags: string[];
  excerpt: any;
  status: string;
  isFeatured: boolean;
  category: any;
  blocks: any;
  coverImage: any;
}

export interface Comment {
  _id: string;
  content: string;
  author: string;
  createdAt: Date;
  articleId: string;
}

export interface ArticlePublicResponse {
  _id: string;
  slug: string;
  title: string;
  date: string;
  author: any;
  tags: string[];
  readTime: number;
  excerpt: string;
  content: string;
  category: string;
  isTrending: boolean;
  blocks?: any;
  coverImage: {
    imageUrl: string;
  };
  createdAt?: any;
}

export interface ArticleCategoryPublicResponse {
  _id: string;
  name: string;
  slug: string;
}

export interface AddCommentResponse {
  comment: Comment;
  articleId: string;
}
