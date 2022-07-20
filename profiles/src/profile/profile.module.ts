import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { MongooseModule } from '@nestjs/mongoose'
import { Profile, ProfileSchema } from "src/share/db/models/profile";
import { ProfileService } from "./profile.service";
import { ProfileRepository } from "./profile.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Profile.name,
                schema: ProfileSchema,
            }
        ])
    ],
    controllers: [ProfileController],
    providers: [ProfileService, ProfileRepository],
    exports: []
})
export class ProfileModule {}