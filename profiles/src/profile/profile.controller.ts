import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateProfile } from "./dto/create-profile.dto";
import { v4 } from 'uuid'

@Controller('/profiles')
export class ProfileController {
    constructor() {}
    private profiles = []

    @Get(':id')
    async getProfile(@Param() id: string) {
        console.log(id);
        
        return this.profiles.find((profile) => profile.id === id)
    }

    @Get()
    async getAllProfiles () {
        return this.profiles;
    }

    @Post()
    async createProfile(
            @Body() profile: CreateProfile
        ) {
        return this.profiles.push({ ...profile, id: v4() })
    }
}