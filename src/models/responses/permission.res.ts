export interface Permission {
  _id: string;
  name: string;
  description: string;
  requiresApproval: boolean;
  module?: string;
  __v: number;
}

export interface PermissionGroup {
  module: string;
  permissions: Permission[];
}
