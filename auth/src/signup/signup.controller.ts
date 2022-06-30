import { Body, Controller, Get, HttpException, Post, Req, Res, Session } from "@nestjs/common";
import { Request } from "express";
import { CommonSignUpData } from "./dto/common-signup.dto";
import { SignupService } from "./signup.service";
import { classToPlain, plainToClass, plainToInstance } from 'class-transformer'
import { ResponseUserDto } from "./dto/response-user.dto";
import { User } from "src/shared/db/models/user";

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
    async checkIsItWorks() {
        return 'HiThere!';
    }
}