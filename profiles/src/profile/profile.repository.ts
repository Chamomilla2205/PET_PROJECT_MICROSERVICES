import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Profile, ProfileDocument } from "src/share/db/models/profile";

@Injectable()
export class ProfileRepository {
    constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>) {}

    async createProfile(data) {
        const profile = new this.profileModel(data);

        return profile.save()
    }

    async getAllInfo() {
        this.profileModel.find()
    }
}