import { Body, Controller, Get, HttpException, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
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
        @Res({ passthrough: true }) res: Response,
    ): Promise<User> {
        return this.signupService.regularRegistration(credentials, res);
    }
    
    @Get()
    async lookAtCurrentUser(@Req() req) {
        return jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayloadDto
    }
}