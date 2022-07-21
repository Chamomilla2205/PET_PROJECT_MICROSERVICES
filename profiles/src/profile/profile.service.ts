import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserCreatedDto } from "@zhytomyr_war_elefant/common";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { ProfileRepository } from "./profile.repository";

@Injectable()
export class ProfileService {
    constructor(
        private profileRepository: ProfileRepository
    ) {}

    async createNewProfile(data: UserCreatedDto) {
        const baseProfile = {
            userId: data.id,
            email: data.email
        }
        return this.profileRepository.createProfile(baseProfile)
    }

    async updateProfileInfo(userInfo, profileInfo: CreateProfileDto) {
        return this.profileRepository.updateProfile(userInfo, profileInfo)
    }

    async getAllInfoFromDB() {
        return this.profileRepository.getAllInfo()
    }

}