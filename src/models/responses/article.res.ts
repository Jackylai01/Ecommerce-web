export interface Article {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
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
