import { Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WsJwtGuard implements CanActivate {
  canActivate(context: any): boolean | Promise<boolean> | Observable<boolean> {
    const socket = context.switchToWs().getClient();
    return !!socket.data.user;
  }
}