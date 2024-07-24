export interface ShoppingCredit {
  _id: string;
  userId: string;
  amount: number;
  type: string;
  status: string;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
