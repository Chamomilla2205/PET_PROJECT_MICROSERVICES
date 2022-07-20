import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateProfile } from "./dto/create-profile.dto";
import { v4 } from 'uuid'
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { NatsStreamingContext } from "@nestjs-plugins/nestjs-nats-streaming-transport";
import { natsWrapper, Subject, UserCreatedListener } from "@zhytomyr_war_elefant/common";
import { ProfileService } from "./profile.service";

@Controller('profiles')
export class ProfileController {
    constructor(
        private profileService: ProfileService
    ) {}

    @EventPattern(Subject.UserCreated)
    async createProfileSignUp(@Payload() data, @Ctx() ctx: NatsStreamingContext) {
        console.log(data);
        
        this.profileService.createNewProfile(data)
    }

    @Post()
    async createProfile() {
        return
    }

    @Get(':id')
    async getProfile(@Param() id: string) {
        console.log(id);
        
    }

    @Get()
    async getAllProfiles () {
    }

    @Put()
    async updateProfile(
            @Body() profile: CreateProfile
        ) {
    }

    @Delete()
    async deleteProfile() {
        
    }
}