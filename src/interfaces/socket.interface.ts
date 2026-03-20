import { IUserTokenInfo } from "./user.interfaces";
import { Socket } from 'socket.io';

export interface AuthenticatedSocket extends Socket {
  user?: IUserTokenInfo;
}
