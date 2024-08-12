export interface MembershipLevelResponse {
  _id: string;
  name: string;
  description?: string;
  benefits?: string[];
  minPointsRequired?: number;
  discountRate?: number;
  minTotalSpent: number;
  createdAt: string;
  updatedAt: string;
}
