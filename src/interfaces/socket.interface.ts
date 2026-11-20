import { Socket } from 'socket.io';
import { IUserTokenInfo } from './user.interfaces';

export interface AuthenticatedSocket extends Socket {
  user?: IUserTokenInfo;
}
