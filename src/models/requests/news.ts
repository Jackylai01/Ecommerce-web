export interface AddNewsItemRequest {
  title: string;
  content: string;
  date: string;
  category: string;
  coverImage: any;
}

export interface EditNewsItemRequest {
  title?: string;
  content?: string;
  date?: string;
  category?: string;
  coverImage?: any;
}
