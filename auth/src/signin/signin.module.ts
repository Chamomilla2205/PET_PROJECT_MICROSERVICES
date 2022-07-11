import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/shared/db/models/user";
import { SigninController } from "./signin.controller";
import { SigninService } from "./signin.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [SigninController],
    providers: [SigninService],
    exports: []
})
export class SigninModule {}