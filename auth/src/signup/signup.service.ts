import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "src/shared/db/models/user";
import { CommonSignUpData } from "./dto/common-signup.dto";
import { SignupRepository } from "./signup.repository";
import * as jwt from 'jsonwebtoken';
import { Request } from "express";
import { Password } from "src/shared/helpers/password";

@Injectable()
export class SignupService {
    constructor(
        private signupRepository: SignupRepository,
        private Password: Password
        ) {}

    async regularRegistration(credentials: CommonSignUpData, req: Request): Promise<User> {
        try {
            const { email } = credentials;
            // const existingUser = await this.userModel.findOne({ email: credentials.email });
            
            const existingUser = await this.signupRepository.findOne(email)
    
            if(existingUser) throw new Error('User with this email has already exist')

            const password = await Password.toHash(credentials.password)

    
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