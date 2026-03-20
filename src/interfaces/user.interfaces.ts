export enum OtpStatus {
  GENERATED = 'GENERATED',
  EXPIRED = 'EXPIRED',
  VERIFIED = 'VERIFIED',
}

export enum AuthType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}


export interface IUserTokenInfo {
  id: string;
  ip: string;
  userAgent: string;
  iat: number;
  exp: number;
  role: string;
}
