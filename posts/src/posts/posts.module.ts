import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema, Post } from "src/shared/db/models/post";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repository";
import { PostsService } from "./posts.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Post.name,
                schema: PostSchema
            }
        ])
    ],
    providers: [PostsService, PostsRepository],
    controllers: [PostsController],
    exports: [],
})

export class PostsModule {}