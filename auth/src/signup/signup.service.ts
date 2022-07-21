import { Injectable } from "@nestjs/common";
import { User } from "src/shared/db/models/user";
import { CommonSignUpData } from "./dto/common-signup.dto";
import { SignupRepository } from "./signup.repository";
import * as jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { natsWrapper, Password, UserCreatedPublisher } from '@zhytomyr_war_elefant/common'
import { UserPayloadDto } from "./dto/user-payload.dto";

@Injectable()
export class SignupService {
    constructor(
        private signupRepository: SignupRepository,
        ) {}

    async regularRegistration(credentials: CommonSignUpData, res: Response): Promise<User> {
        try {
            const { email } = credentials;
            
            const existingUser = await this.signupRepository.findOne(email)
    
            if(existingUser) throw new Error('User with this email has already exist')

            const password = await Password.toHash(credentials.password)
    
            const user = await this.signupRepository.createUser({ email: credentials.email, password });

            const result = {
                id: user.id,
                email: user.email
            }

            await new UserCreatedPublisher(natsWrapper.client).publish(result)
    
            const userJwt = jwt.sign(result,
                process.env.JWT_KEY!,
                {
                    expiresIn: 60*10
                }
            )            
            
            res.cookie('jwt', userJwt, { httpOnly: true })

            return user;
        } catch (err) {
            throw new Error(err.message)
        }
    }
}