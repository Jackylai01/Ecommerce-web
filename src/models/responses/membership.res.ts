export interface MembershipLevelResponse {
  _id: string;
  name: string;
  description?: any;
  benefits?: string[];
  minPointsRequired?: number;
  discountRate?: number;
  minTotalSpent: number;
  createdAt: string;
  updatedAt: string;
  members: Member[];
}

export interface Member {
  id: string;
  name: string;
  points: number;
}

export interface Level {
  _id: string;
  name: string;
  description?: string;
  minPointsRequired: number;
  discountRate: number;
  color?: string;
  members: Member[];
}
