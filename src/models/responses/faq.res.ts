export interface FaqCategory {
  _id: string;
  name: string;
  description: string;
}

export interface Faq {
  _id: string;
  // 問題
  question: string;
  // 解答
  answer: string;
  // 分類，例如：“訂單”，“付款”等
  category: string;
}
