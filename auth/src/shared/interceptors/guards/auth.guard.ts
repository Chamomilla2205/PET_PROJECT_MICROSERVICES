import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { verify } from "crypto";
import * as jwt from 'jsonwebtoken';
import { UserPayloadDto } from "src/signup/dto/user-payload.dto";

@Injectable()
export class AuthGuard {
    constructor() {}
    async canActivate(context: ExecutionContext) {
        const { session: { jwt }} = context.switchToHttp().getRequest();

        const isValidToken = jwt.verify(jwt, process.env.JWT_KEY);

        if(!isValidToken) {
            throw new Error('Token is not valid');
        }
    }

    // async validate(payload: string) {
    //     const isValidToken = jwt.verify(payload, process.env.JWT_KEY)
        
    // }
}