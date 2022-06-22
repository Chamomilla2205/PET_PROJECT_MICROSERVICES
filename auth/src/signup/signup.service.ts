import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "src/shared/db/models/user";
import { CommonSignUpData } from "./dto/common-signup.dto";
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from "mongoose";
import { SignupRepository } from "./signup.repository";

@Injectable()
export class SignupService {
    constructor(
        private signupRepository: SignupRepository
        ) {}

    async regularRegistration(credentials: CommonSignUpData): Promise<User> {
        const { email } = credentials;
        // const existingUser = await this.userModel.findOne({ email: credentials.email });
        const existingUser = await this.signupRepository.findOne(email)


        if(existingUser) throw new Error('User with this email has already exist')
        
        const toHash = async (password) => {
            const salt = await bcrypt.genSalt(5)
            return bcrypt.hash(password, salt)
        }

        const password = await toHash(credentials.password)

        const user2 = await this.signupRepository.createUser({ email: credentials.email, password })
        
        // const user = new this.userModel({ email, password })

        return user2

        // return user.save()
    }
}