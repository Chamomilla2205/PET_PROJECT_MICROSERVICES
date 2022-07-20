import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProfileRepository } from "./profile.repository";

@Injectable()
export class ProfileService {
    constructor(
        private profileRepository: ProfileRepository
    ) {}

    async createNewProfile(data) {
        return this.profileRepository.createProfile(data)
    }

}