import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserSelfGuard implements CanActivate {

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log("keldi3: ");
        const req = context.switchToHttp().getRequest();
        console.log("req: ", req);

        if(req.params.id != req.user.id){
            throw new ForbiddenException()
        }

        return true
    }
}
