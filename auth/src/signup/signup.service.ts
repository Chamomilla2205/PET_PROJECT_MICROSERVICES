import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "src/shared/db/models/user";
import { CommonSignUpData } from "./dto/common-signup.dto";
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from "mongoose";
import { SignupRepository } from "./signup.repository";
import * as jwt from 'jsonwebtoken';
import { Request } from "express";

@Injectable()
export class SignupService {
    constructor(
        private signupRepository: SignupRepository
        ) {}

    async regularRegistration(credentials: CommonSignUpData, req: Request): Promise<User> {
        try {
            const { email } = credentials;
            // const existingUser = await this.userModel.findOne({ email: credentials.email });
            
            const existingUser = await this.signupRepository.findOne(email)
    
            if(existingUser) throw new Error('User with this email has already exist')
            
            const toHash = async (password) => {
                const salt = await bcrypt.genSalt(5)
                return bcrypt.hash(password, salt)
            }
    
            const password = await toHash(credentials.password)
    
            const user = await this.signupRepository.createUser({ email: credentials.email, password })
    
        
        
            const userJwt = jwt.sign({
                id: user._id,
                email: user.email,
            }, 
                'asdf'        
            )
    
            req.session = {
                jwt: userJwt
            }
            
            return user
        } catch (err) {
            throw new Error(err.message)
        }
    }
}