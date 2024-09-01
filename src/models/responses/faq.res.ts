export interface FaqCategory {
  _id: string;
  name: string;
  description: string;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  category?: any;
}
