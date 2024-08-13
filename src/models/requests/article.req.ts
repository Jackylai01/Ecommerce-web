export interface AddArticleRequest {
  title: string;
  content: string;
  author: any;
  blocks?: any;
  coverImage?: any;
}

export interface EditArticleRequest {
  title?: string;
  content?: string;
}

export interface AddCommentRequest {
  content: string;
  author: string;
}
