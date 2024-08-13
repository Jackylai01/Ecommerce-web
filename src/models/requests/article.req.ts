export interface AddArticleRequest {
  title: string;
  content: string;
  author: string;
}

export interface EditArticleRequest {
  title?: string;
  content?: string;
}

export interface AddCommentRequest {
  content: string;
  author: string;
}
