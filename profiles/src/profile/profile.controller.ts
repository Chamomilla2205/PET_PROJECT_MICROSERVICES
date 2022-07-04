import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateProfile } from "./dto/create-profile.dto";
import { v4 } from 'uuid'

@Controller('profiles')
export class ProfileController {
    constructor() {}
    private profiles = []

    @Post()
    async createProfile() {
        return
    }

    @Get(':id')
    async getProfile(@Param() id: string) {
        console.log(id);
        
        return this.profiles.find((profile) => profile.id === id)
    }

    @Get()
    async getAllProfiles () {
        return this.profiles;
    }

    @Put()
    async updateProfile(
            @Body() profile: CreateProfile
        ) {
        return this.profiles.push({ ...profile, id: v4() })
    }

    @Delete()
    async deleteProfile() {
        
    }
}