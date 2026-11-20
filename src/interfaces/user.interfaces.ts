import type { Role } from '../generated/prisma/client';

export interface IUserTokenInfo {
  id: string;
  role: Role[];
  iat?: number;
  exp?: number;
}
