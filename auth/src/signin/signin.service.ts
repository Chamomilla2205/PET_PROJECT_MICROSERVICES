import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/shared/db/models/user";
import { CommonSignUpData } from "src/signup/dto/common-signup.dto";
import { Request } from "express";
import * as jwt from 'jsonwebtoken';
import { Password } from "src/shared/helpers/password";

@Injectable()
export class SigninService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private Password: Password
        ) {}

    async login(credentials: CommonSignUpData, req: Request): Promise<User> {
        const { email, password } = credentials;
        const existingUser = await this.userModel.findOne({ email }).exec();

        if(!existingUser) {
            throw new Error('Wrong email or password');
        }

        try {
            const passwordMatch = Password.compare(existingUser.password, password)
            
            if(!passwordMatch) {
                throw new Error('Worng emai or password')
            }
    
            const userJwt = jwt.sign({
                id: existingUser._id,
                email: existingUser.email,
            }, 
                process.env.JWT_KEY!,
                {
                    expiresIn: 60*10
                }        
            )
    
            req.session = {
                jwt: userJwt
            }
    
            return existingUser;
        } catch (err) {
            throw new Error(err.message)
        }
    }
}