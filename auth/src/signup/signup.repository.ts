import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/shared/db/models/user";
import { CommonSignUpData } from "./dto/common-signup.dto";

@Injectable()
export class SignupRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(email: string): Promise<User> {
            return this.userModel.findOne({ email }).exec() // if array we always need exec for iterrate
    }

    async createUser(credentials: CommonSignUpData) {
        const user = new this.userModel(credentials)
        return (await user.save());
    }
}