import { Module } from "@nestjs/common";
import { SignUpController } from "./signup.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "src/shared/db/models/user";
import { SignupService } from "./signup.service";
import { SignupRepository } from "./signup.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [SignUpController],
    providers: [SignupService, SignupRepository],
    exports: [SignupService]
})

export class SignUpModule {}