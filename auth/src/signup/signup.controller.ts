import { Body, Controller, Get, HttpException, Post } from "@nestjs/common";
import { CommonSignUpData } from "./dto/common-signup.dto";
import { SignupService } from "./signup.service";

@Controller('auth')
export class SignUpController {
    constructor(private signupService: SignupService) {}
    @Post('regular')
    async commonSignUp(@Body() credentials: CommonSignUpData): Promise<CommonSignUpData> {
        return this.signupService.regularRegistration(credentials);
    }
    
    @Get()
    async checkIsItWorks() {
        return 'HiThere!';
    }
}