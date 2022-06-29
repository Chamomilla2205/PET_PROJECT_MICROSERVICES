import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { CommonSignUpData } from "src/signup/dto/common-signup.dto";
import { SigninService } from "./signin.service";

@Controller('signin')
export class SigninController {
    constructor(private signinService: SigninService) {}

    @Post()
    async signin(@Body() credentials: CommonSignUpData, @Req() req: Request) {
        return this.signinService.login(credentials, req)
    }
}