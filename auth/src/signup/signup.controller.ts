import { Body, Controller, Post } from "@nestjs/common";
import { CommonSignUpData } from "./dto/common-signup.dto";

@Controller('signup')
export class SignUpController {
    @Post()
    async commonSignUp(@Body() credentials: CommonSignUpData) {
        
    }
}