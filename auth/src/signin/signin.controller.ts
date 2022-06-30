import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { User } from "src/shared/db/models/user";
import { CommonSignUpData } from "src/signup/dto/common-signup.dto";
import { SigninService } from "./signin.service";

@Controller('signin')
export class SigninController {
    constructor(private signinService: SigninService) {}

    @Post()
    async signin(@Body() credentials: CommonSignUpData, @Req() req: Request): Promise<User> {
        return this.signinService.login(credentials, req)
    }
}