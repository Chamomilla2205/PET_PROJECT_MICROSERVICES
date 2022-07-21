import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        return this.validateRequest(request.cookies.jwt)
    }

    async validateRequest(cookies) {
        const validToken = jwt.verify(cookies, process.env.JWT_KEY!)
        
        return !!validToken;
    }
}