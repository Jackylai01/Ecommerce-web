export interface ShoppingCredit {
  _id: string;
  userId: string;
  user?: User;
  levelId?: string;
  amount: number;
  type: string;
  status: string;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  creditType: any;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  birthday?: Date;
}
