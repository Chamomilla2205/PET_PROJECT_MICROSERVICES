import { Body, Controller, Get, HttpException, Post, Req, Res, Session } from "@nestjs/common";
import { Request } from "express";
import { CommonSignUpData } from "./dto/common-signup.dto";
import { SignupService } from "./signup.service";
import { User } from "src/shared/db/models/user";
import * as jwt from 'jsonwebtoken';
import { UserPayloadDto } from "./dto/user-payload.dto";

@Controller('signup')
export class SignUpController {
    constructor(private signupService: SignupService) {}
    @Post()
    async commonSignUp(
        @Body() credentials: CommonSignUpData,
        @Req() req: Request,
    ): Promise<User> {
        return this.signupService.regularRegistration(credentials, req);
    }
    
    @Get()
    async lookAtCurrentUser(@Req() req) {
        return jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayloadDto
    }
}