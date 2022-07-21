import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Session, UseGuards } from "@nestjs/common";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { v4 } from 'uuid'
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { NatsStreamingContext } from "@nestjs-plugins/nestjs-nats-streaming-transport";
import { Subject, UserCreatedDto } from "@zhytomyr_war_elefant/common";
import { ProfileService } from "./profile.service";
import { Request } from "express";
import { AuthGuard } from "src/share/validation/guards/auth.guard";

@Controller('profile')
export class ProfileController {
    constructor(
        private profileService: ProfileService
    ) {}

    @EventPattern(Subject.UserCreated)
    async createProfileSignUp(@Payload() data: UserCreatedDto, @Ctx() ctx: NatsStreamingContext) {
        console.log(data);
        
        await this.profileService.createNewProfile(data);

        ctx.message.ack()
    }

    @UseGuards(AuthGuard)
    @Patch()
    async createProfile(@Body() profileInfo: CreateProfileDto, @Req() req: Request) {
        const { userInfo } = req.cookies;
        
        return this.profileService.updateProfileInfo(userInfo, profileInfo)
    }

    @Get()
    async getAllProfiles() {
        return this.profileService.getAllInfoFromDB()      
    }

    @Delete()
    async deleteProfile() {
        
    }
}