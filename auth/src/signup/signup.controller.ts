import { Body, Controller, Get, HttpException, Post, Req, Session } from "@nestjs/common";
import { Request } from "express";
import { CommonSignUpData } from "./dto/common-signup.dto";
import { SignupService } from "./signup.service";

@Controller('signup')
export class SignUpController {
    constructor(private signupService: SignupService) {}
    @Post()
    async commonSignUp(
        @Body() credentials: CommonSignUpData,
        @Req() req: Request,
    ): Promise<CommonSignUpData> {
        return this.signupService.regularRegistration(credentials, req);
    }
    
    @Get()
    async checkIsItWorks() {
        return 'HiThere!';
    }
}