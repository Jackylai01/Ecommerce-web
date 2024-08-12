export interface MembershipLevelResponse {
  _id: string;
  name: string;
  description?: any;
  benefits?: string[];
  discountRate?: number;
  minTotalSpent: number;
  createdAt: string;
  updatedAt: string;
  members: Member[];
}

export interface Member {
  _id: string;
  username: string;
  totalSpent: number;
  email: string;
}

export interface Level {
  _id: string;
  name: string;
  description?: string;
  color?: string;
  members: Member[];
  minTotalSpent: number;
}
