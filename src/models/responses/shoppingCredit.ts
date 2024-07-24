export interface ShoppingCredit {
  _id: string;
  userId: string;
  user?: User;
  amount: number;
  type: string;
  status: string;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  birthday?: Date;
}
