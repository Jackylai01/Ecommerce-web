export class LoginRequest {
  email!: string;
  password!: string;
}

export class RegisterRequest {
  password!: string;
  name!: string;
  email!: string;
  phoneNumber?: string;
  gender?: string;
  address?: string;
}

export class SendForgotCodeRequest {
  email!: string;
}

export class ResetPasswordRequest {
  userId!: string;
  code!: string;
  password!: string;
  confirmPassword!: string;
}

export class ThirdPartyRegisterRequest {
  userId!: string;
  username!: string;
  name!: string;
  email!: string;
  phoneNumber?: string;
  invitationCode?: string;
}

export class UpdateClientProfileRequest {
  name!: string;
  email!: string;
  phoneNumber?: string;
}

export class UpdateAdminProfileRequest {
  _id!: string;
  name!: string;
  email!: string;
  phoneNumber?: string;
}
export class QueryDateRequest {
  startDate?: Date;
  endDate?: Date;
}
