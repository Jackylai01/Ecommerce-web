export interface IMembershipLevel {
  _id?: string; // 可選，因為在創建時不需要ID
  name: string; // 會員級別名稱
  description?: string; // 會員級別描述
  benefits?: string[]; // 會員級別的權益
  minPointsRequired?: number; // 升級至此級別所需的最低積分
  minTotalSpent: number; // 最低消費總額
}
