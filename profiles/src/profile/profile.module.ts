import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";

@Module({
    // imports: [ProfileController],
    controllers: [ProfileController]
})
export class ProfileModule {}