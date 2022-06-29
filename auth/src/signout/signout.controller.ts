import { Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";

@Controller('signout')
export class SignoutController {
    constructor() {}
    
    @Post()
    async signOut(@Req() req: Request) {
        req.session = null;

        return {}
    }
}