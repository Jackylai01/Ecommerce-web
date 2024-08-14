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

export interface AddCommentResponse {
  comment: Comment;
  articleId: string;
}
