import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/shared/db/models/user";
import { SignoutController } from "./signout.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [SignoutController],
    providers: [],
    exports: []
})
export class SignoutModule {}